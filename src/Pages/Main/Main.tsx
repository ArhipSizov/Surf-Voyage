import { useState } from "react";
import { NavLink } from "react-router-dom";

import Profile from "./Profile/Profile";
import BlockRest from "./BlockRest/BlockRest";

import T from "../../Language/Text";
import getCookie from "../../Utils/getCookie";
import dbRests from "../../Components/rests.json";

import "./Main.scss";

export default function Main() {
  const [profileShow, setProfileShow] = useState<boolean>(false);
  function closeProfile() {
    if (profileShow) {
      setProfileShow(false);
    }
  }

  return (
    <div className="main" onClick={() => closeProfile()}>
      {profileShow && <Profile />}
      <p
        onClick={() => (
          (document.cookie = "language=ru; max-age=604800"),
          location.reload()
        )}
      >
        Русский
      </p>
      <p
        onClick={() => (
          (document.cookie = "language=en; max-age=604800"),
          location.reload()
        )}
      >
        English
      </p>
      <p
        onClick={() => (
          (document.cookie = "theme=all lite; max-age=604800"),
          location.reload()
        )}
      >
        {T("Light theme")}
      </p>
      <p
        onClick={() => (
          (document.cookie = "theme=all black; max-age=604800"),
          location.reload()
        )}
      >
        {T("Black theme")}
      </p>

      {(getCookie("isLogin") && (
        <img
          onClick={() => setProfileShow(!profileShow)}
          src="/profile.svg"
          alt=""
        />
      )) || <NavLink to="/login">{T("Login")}</NavLink>}

      <div className="all_rests gray">
        {dbRests.map((item) => (
          <BlockRest {...item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
