import { NavLink } from "react-router-dom";
import T from "../../Language/Text";

import "./Error.scss";

export default function Error() {
  return (
    <div className="error">
      <h1>{T("Oops...")}</h1>
      <p>{T("This page doesn't seem to exist, you can go back to")}</p>
      <NavLink to="/" className="footerBlock">
        {T("home")}
      </NavLink>
    </div>
  );
}
