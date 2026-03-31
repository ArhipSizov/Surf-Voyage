import { useState } from "react";
import { NavLink } from "react-router-dom";
import type { dataRests } from "../../Services/fbData";
import type { allDataRests } from "../../Services/fbAllData";
import { useSelector } from "react-redux";

import Profile from "./Profile/Profile";
import BlockRest from "./BlockRest/BlockRest";

import T from "../../Language/Text";
import getCookie from "../../Utils/getCookie";

interface state {
  rests: allDataRests;
}

import "./Main.scss";

export default function Main() {
  const restsArr = useSelector((state: state) => state.rests.rests);

  const [profileShow, setProfileShow] = useState<boolean>(false);
  const [dbRests] = useState<dataRests[]>(restsArr);
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

      <div className="gray">
        <div className="all_rests max_width">
          {dbRests.map((item) => (
            <BlockRest {...item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
