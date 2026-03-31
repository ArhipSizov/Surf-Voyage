import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { useDispatch } from "react-redux";
import { addUser } from "../Services/store/SliceUser";
import { addRests } from "../Services/store/SliceRests";

import getCookie from "../Utils/getCookie";

import "./App.scss";

import { Loading, Error, Main, Login, Register, Support, Order } from "./links";

import type { dataUser, dataRests } from "../Services/fbData";

function App() {
  const [email, setIEmail] = useState<string>("");
  const [isOne, setIsOne] = useState<boolean>(false);

  const auth = getAuth();

  let data = null;
  const database = getDatabase();
  const starCountRef = ref(database);
  onValue(starCountRef, (snapshot) => {
    data = snapshot.val();
  });

  const dispatch = useDispatch();
  onAuthStateChanged(auth, (currentUser) => {
    if (!currentUser) {
      return;
    }
    onValue(starCountRef, (snapshot) => {
      data = snapshot.val();
      const dataArrUser: dataUser[] = Object.values(data.users);
      dataArrUser.forEach(function (item: dataUser) {
        const dataEmail = item.email;
        if (currentUser.email == dataEmail && email == "") {
          setIEmail(item.email);
          dispatch(
            addUser({
              email: item.email,
              pasvord: item.password,
              name: item.name,
              number: item.number,
              surname: item.surname,
              city: item.city,
              country: item.country,
              key: item.key,
            }),
          );
        }
      });
    });
  });

  if ((isOne == false)) {
    setIsOne(true);
    onValue(starCountRef, (snapshot) => {
      data = snapshot.val();
      const dataArrRests: dataRests[] = Object.values(data.rests);

      dataArrRests.forEach(function (item: dataRests) {
        dispatch(
          addRests({
            id: item.id,
            name: item.name,
            description: item.description,
            img: item.img,
            where: item.where,
            long: item.long,
            cost: item.cost,
          }),
        );
      });
    });
  }

  useEffect(() => {
    if (getCookie("language")) {
      document.cookie = `language=${getCookie("language")}; max-age=604800`;
    } else {
      document.cookie = "language=en; max-age=604800";
    }
    if (getCookie("theme")) {
      document.cookie = `theme=${getCookie("theme")}; max-age=604800`;
    } else {
      document.cookie = "theme=all lite; max-age=604800";
    }
    if (getCookie("isLogin")) {
      document.cookie = `isLogin=${getCookie("isLogin")}; max-age=604800`;
    }
  }, []);

  if (!email && getCookie("isLogin")) {
    return (
      <div className={getCookie("theme")}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={getCookie("theme")}>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/support" element={<Support />} />
        <Route path="/" element={<Main />} />
        <Route path="/order/:id" element={<Order />} />
      </Routes>
    </div>
  );
}

export default App;
