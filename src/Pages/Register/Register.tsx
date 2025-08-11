import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../Services/store/Slice";
import { addUserDB } from "../../Services/fbUsers";
import { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import T from "../../Language/Text";

import "./Register.scss";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [pasword, setPasword] = useState<string>("");
  const [error, setError] = useState<string>("error_text");
  const [type, setType] = useState<boolean>(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addTask = () => dispatch(addUser({ email, pasword }));

  function getRegisterData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pasword).then(() => {
      if (auth.currentUser) {
        navigate("/profile");
      }
    });
    addUserDB({ email, pasword });
    addTask();
  }

  useEffect(() => {
    if (pasword.length >= 6) {
      setError("none");
    } else {
      setError("error_text");
    }
  }, [pasword]);

  return (
    <div className="register">
      <div className="logo">
        <img src="/logo.png" alt="" />
        <h1>surfvoyage</h1>
      </div>
      <h1>{T("Register")}</h1>
      <p>{T("To continue, you must log in or register in the application")}</p>
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
        <p className={error}>Пароль меньше 6 символов</p>
        <input
          className="register_button"
          value={T("Register")}
          type="submit"
        />
      </form>
      <NavLink to="/login">{T("Login")}</NavLink>
      <p>
        {T(
          "By registering in the application you agree to the user agreement and privacy policy"
        )}
      </p>
    </div>
  );
}
