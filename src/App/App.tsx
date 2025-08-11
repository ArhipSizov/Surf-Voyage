import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import { useDispatch } from "react-redux";
import { addUser } from "../Services/store/Slice";

import getCookie from "../Utils/getCookie";

import "./App.scss";

import { Loading, Error, Main, Login, Register } from "./links";

import type data from "../Services/fbData";

function App() {
  const [email, setIEmail] = useState<string>("");

  const auth = getAuth();
  const navigate = useNavigate();

  let data = null;
  const database = getDatabase();
  const starCountRef = ref(database);
  onValue(starCountRef, (snapshot) => {
    data = snapshot.val();
  });
  
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (currentUser) => {
    if (!currentUser) {
      navigate("/loading");
      return;
    }
    onValue(starCountRef, (snapshot) => {
      data = snapshot.val();
      const dataArr: data[] = Object.values(data.users);
      dataArr.forEach(function (item: data) {
        const dataEmail = item.email;
        if (currentUser.email == dataEmail && email == "") {
          setIEmail(item.email)
          dispatch(
            addUser({
              email: item.email,
              pasvord: item.password,
              name: item.name,
              number: item.number,
              key: item.key,
            })
          );
        }
      });
    });
  });

  useEffect(() => {
    if (getCookie("language")) {
      document.cookie = `language=${getCookie("language")}; max-age=604800`;
    } else {
      document.cookie = "language=en; max-age=604800";
    }
  }, []);

  if (!email) {
    return <Loading />;
  }

  return (
    <div className="all">
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
