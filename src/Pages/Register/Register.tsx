import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../Services/store/Slice";
import { addUserDB } from "../../Services/fbUsers";
import { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

import T from "../../Language/Text";

import "./Register.scss";

import type data from "../../Services/fbData";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [pasword, setPasword] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("error_text");
  const [error, setError] = useState<string>("none");
  const [errorEmail, setErrorEmail] = useState<string>("none");
  const [canClick, setCanClick] = useState<boolean>(false);
  const [type, setType] = useState<boolean>(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addTask = () => dispatch(addUser({ email, pasword }));

  function getRegisterData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pasword)
      .then(() => {
        if (auth.currentUser) {
          navigate("/profile");
          document.cookie = `isLogin=true; max-age=604800`;
          addUserDB({ email, pasword });
          addTask();
        }
      })
      .catch(() => {
        setError("error_text");
        setTimeout(() => {
          setError("none");
        }, 3000);
        return;
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
    if (pasword.length >= 6) {
      setErrorPassword("none");
      if (errorEmail == "none") {
        setCanClick(true);
      }
    } else {
      setErrorPassword("error_text");
      setCanClick(false);
    }
  }, [pasword]);

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      onValue(starCountRef, (snapshot) => {
        data = snapshot.val();
        const dataArr: data[] = Object.values(data.users);
        let find: boolean = false;
        dataArr.forEach(function (item: data) {
          if (item.email == email) {
            setErrorEmail("error_text");
            find = true;
            setCanClick(false);
          } else {
            if (find == false) {
              setErrorEmail("none");
              if (errorPassword == "none") {
                setCanClick(true);
              }
            }
          }
        });
      });
    });
  }, [email]);
  return (
    <div className="register">
      <div className="logo">
        <img src="/logo.png" alt="" />
        <h1>surfvoyage</h1>
      </div>
      <h1>{T("Register")}</h1>
      <p className="gray_p">
        {T("To continue, you must log in or register in the application")}
      </p>
      <form onSubmit={getRegisterData} className="register_form">
        <h3>e-mail</h3>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="input"
          placeholder="e-mail"
          type="email"
          required
        />
        <h3>{T("Password")}</h3>
        <input
          onChange={(e) => setPasword(e.target.value)}
          value={pasword}
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
        <p className={error}>{T("Incorrect email")}</p>
        <p className={errorEmail}>{T("Email is already in use")}</p>
        <p className={errorPassword}>{T("Password less than 6 characters")}</p>
        {(canClick && (
          <input
            className="register_button main_color"
            value={T("Register")}
            type="submit"
          />
        )) || (
          <p className="register_button register_button_no_click">
            {T("Register")}
          </p>
        )}
      </form>
      <NavLink to="/login">{T("Login")}</NavLink>
      <p className="gray_p">
        {T(
          "By registering in the application you agree to the user agreement and privacy policy"
        )}
      </p>
    </div>
  );
}
