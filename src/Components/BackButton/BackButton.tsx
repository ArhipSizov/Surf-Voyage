import "./BackButton.scss";

import T from "../../Language/Text";
import { NavLink } from "react-router-dom";

export default function BackButton() {
  return (
    <NavLink to="/" className="back_button">
      <img src="back.svg" alt="" />
      <p>{T("Home")}</p>
    </NavLink>
  );
}
