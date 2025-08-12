import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

import T from "../../Language/Text";

import "./Login.scss";

import type data from "../../Services/fbData";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("none");
  const [errorEmail, setErrorEmail] = useState<string>("none");
  const [canClick, setCanClick] = useState<boolean>(false);
  const [pasword, setPasword] = useState<string>("");
  const [type, setType] = useState<boolean>(true);

  const navigate = useNavigate();

  function getLoginData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pasword)
      .then(() => {
        navigate("/profile");
        document.cookie = `isLogin=true; max-age=604800`;
      })
      .catch(() => {
        setError("error_text");
        setTimeout(() => {
          setError("none");
        }, 3000);
      });
  }

  const auth = getAuth();

  let data = null;
  const database = getDatabase();
  const starCountRef = ref(database);
  onValue(starCountRef, (snapshot) => {
    data = snapshot.val();
  });

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      onValue(starCountRef, (snapshot) => {
        data = snapshot.val();
        const dataArr: data[] = Object.values(data.users);
        let find: boolean = false;
        dataArr.forEach(function (item: data) {
          if (item.email == email) {
            setErrorEmail("none");
            setCanClick(true);
            find = true;
          } else {
            if (find == false) {
              setErrorEmail("error_text");
              setCanClick(false);
            }
          }
        });
      });
    });
  }, [email]);

  return (
    <div className="login">
      <div className="logo">
        <img src="/logo.png" alt="" />
        <h1>surfvoyage</h1>
      </div>
      <h1>{T("Login or create your profile")}</h1>
      <p className="gray_p">
        {T("To continue, you must log in or register in the application")}
      </p>
      <form onSubmit={getLoginData} className="login_form">
        <h3>e-mail</h3>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          placeholder="e-mail"
          type="email"
          required
        />
        <h3>{T("Password")}</h3>
        <input
          value={pasword}
          onChange={(e) => setPasword(e.target.value)}
          className="input"
          placeholder={T("Password")}
          type={type ? "password" : "text"}
          required
        />
        <img
          className="eye"
          onClick={() => setType(!type)}
          src={type ? "/eye.svg" : "/eye_open.svg"}
          alt=""
        />
        <p className={error}>{T("Invalid password")}</p>
        <p className={errorEmail}>{T("Invalid email")}</p>
        {(canClick && (
          <input
            className="login_button main_color"
            value={T("Login")}
            type="submit"
          />
        )) || (
          <p className="login_button login_button_no_click">{T("Login")}</p>
        )}
      </form>
      <NavLink to="/register">{T("Register")}</NavLink>
    </div>
  );
}
