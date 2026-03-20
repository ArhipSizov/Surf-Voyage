import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import type data from "../../../Services/fbData";
import type allData from "../../../Services/fbAllData";

interface state {
  user: allData;
}

import ChangeProfile from "./ChangeProfile/ChangeProfile";
import ConfirmSignOut from "./ConfirmSignOut/ConfirmSignOut";
import T from "../../../Language/Text";

import "./Profile.scss";

export default function Profile() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [showChangeProfile, setShowChangeProfile] = useState<boolean>(false);
  const [confirmSignOutUser, setConfirmSignOutUser] = useState<boolean>(false);

  const navigate = useNavigate();

  const userArr = useSelector((state: state) => state.user.user);
  if (email == "") {
    userArr.forEach((element: data) => {
      setEmail(element.email);
      setName(element.name);
    });
  }

  return (
    <div className="profile gray" onClick={(event) => event.stopPropagation()}>
      {confirmSignOutUser && (
        <ConfirmSignOut setConfirmSignOutUser={setConfirmSignOutUser} />
      )}
      <div>
        <div className="top_profile">
          <p className="name">
            {T("Hello, ")}
            {name}
          </p>
          <p className="email gray_p">{email}</p>
        </div>
        <div className="profile_all_block">
          <div
            onClick={() => setShowChangeProfile(true)}
            className="profile_block"
          >
            <img src="/Profile/change.svg" alt="" />
            <p>{T("Change profile")}</p>
          </div>
          <div className="profile_block">
            <img src="/Profile/heart.svg" alt="" />
            <p>{T("Favorites")}</p>
          </div>
          <div className="profile_block">
            <img src="/Profile/trips.svg" alt="" />
            <p>{T("My trips")}</p>
          </div>
          <div className="profile_block">
            <img src="/Profile/help.svg" alt="" />
            <p>{T("Help center")}</p>
          </div>
          <div onClick={() => navigate("/login")} className="profile_block">
            <img src="/profile.svg" alt="" />
            <p>{T("Change account")}</p>
          </div>
          <div onClick={() => setConfirmSignOutUser(true)} className="profile_block">
            <img src="/Profile/exit.svg" alt="" />
            <p>{T("Log out")}</p>
          </div>
        </div>
      </div>
      {showChangeProfile && (
        <ChangeProfile setShowChangeProfile={setShowChangeProfile} />
      )}
    </div>
  );
}
