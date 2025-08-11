import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import T from "../../Language/Text";

import "./Login.scss";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("none");
  const [pasword, setPasword] = useState<string>("");
  const [type, setType] = useState<boolean>(true);

  const navigate = useNavigate();
  
  function getLoginData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pasword)
      .then(() => {
        navigate("/profile");
      })
      .catch(() => {
        setError("error_text");
        setTimeout(() => {
          setError("none");
        }, 3000);
      });
  }

  return (
    <div className="login">
      <div className="logo">
        <img src="/logo.png" alt="" />
        <h1>surfvoyage</h1>
      </div>
      <h1>{T("Login or create your profile")}</h1>
      <p>{T("To continue, you must log in or register in the application")}</p>
      <form onSubmit={getLoginData} className="login_form">
        <h3>e-mail</h3>
        <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)} className="input" placeholder="e-mail" type="email" required />
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
        <p className={error}>Неверный e-mail или пароль</p>
        <input
          className="login_button"
          value={T("Login")}
          type="submit"
        />
      </form>
      <NavLink to="/register">{T("Register")}</NavLink>
    </div>
  );
}
