import { NavLink } from "react-router-dom";
import "./BlockRest.scss";


import type { restsType } from "../../../Components/RestsType";

export default function BlockRest({
  id,
  name,
  where,
  long,
  cost,
  img,
}: restsType) {
  return (
    <NavLink className="block_rest main_color" to={`/order/${id}`}>
      <img className="main_img" src={img} alt="" />
      <h2>{name}</h2>
      <div>
        <img src="/Rests/place.svg" alt="" />
        <p>{where}</p>
        <p>{long} ночей</p>
        <p>{cost}$</p>
      </div>
    </NavLink>
  );
}
