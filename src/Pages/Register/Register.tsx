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
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [number, setNumber] = useState<string>("");
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
          navigate("/");
          document.cookie = `isLogin=true; max-age=604800`;
          addUserDB({ email, pasword, name, surname, city, country, number });
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
        <div>
          <h3>e-mail *</h3>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="input"
            placeholder="e-mail"
            type="email"
            required
          />
          <p className={errorEmail}>{T("Email is already in use")}</p>
          <p className={error}>{T("Incorrect email")}</p>
        </div>
        <div>
          <h3>{T("Password")} *</h3>
          <input
            onChange={(e) => setPasword(e.target.value)}
            value={pasword}
            className="input"
            placeholder={T("Password")}
            type={type ? "password" : "text"}
            required
          />
          <p className={errorPassword}>
            {T("Password less than 6 characters")}
          </p>
        </div>
        <div>
          <h3>{T("Name")} *</h3>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="input"
            placeholder={T("Name")}
            type="text"
            required
          />
        </div>
        <div>
          <h3>{T("Surname")}</h3>
          <input
            onChange={(e) => setSurname(e.target.value)}
            value={surname}
            className="input"
            placeholder={T("Surname")}
            type="text"
          />
        </div>
        <div>
          <h3>{T("City")}</h3>
          <input
            onChange={(e) => setCity(e.target.value)}
            value={city}
            className="input"
            placeholder={T("City")}
            type="text"
          />
        </div>
        <div>
          <h3>{T("Country")} *</h3>
          <input
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            className="input"
            placeholder={T("Country")}
            type="text"
            required
          />
        </div>
        <div>
          <h3>{T("Number")} *</h3>
          <input
            onChange={(e) => setNumber(e.target.value)}
            value={number}
            className="input"
            placeholder={T("Number")}
            type="number"
            required
          />
        </div>
        <img
          className="eye"
          onClick={() => setType(!type)}
          src={type ? "/eye.svg" : "/eye_open.svg"}
          alt=""
        />
        {(canClick && (
          <input
            className="register_button main_blue_color"
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
