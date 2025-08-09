import { NavLink } from "react-router-dom";

import "./Error.scss";

export default function Error() {
  return (
    <div className="error">
      <h1>Упс...</h1>
      <p>похоже, этой страницы не существует, вы можете вернутся на</p>
      <NavLink to="/" className="footerBlock">
        главную
      </NavLink>
    </div>
  );
}
