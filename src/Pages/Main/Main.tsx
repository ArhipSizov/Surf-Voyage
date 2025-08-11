import { useState } from "react";
import { useSelector } from "react-redux";

import type data from "../../Services/fbData";
import type allData from "../../Services/fbAllData";

interface state {
  user: allData;
}

import T from "../../Language/Text";

import "./Main.scss";

export default function Main() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const userArr = useSelector((state: state) => state.user.user);
  if (email == "") {
    userArr.forEach((element: data) => {
      setEmail(element.email);
      setName(element.name);
      setNumber(element.number);
    });
  }

  console.log(email, name, number);

  return (
    <div className="Main">
      <p
        onClick={() => (
          (document.cookie = "language=ru; max-age=604800"), location.reload()
        )}
      >
        Русский
      </p>
      <p
        onClick={() => (
          (document.cookie = "language=en; max-age=604800"), location.reload()
        )}
      >
        English
      </p>
      <p>{T("Oops...")}</p>
      <p>e-mail {email},   number {number},   name {name}</p>
    </div>
  );
}
