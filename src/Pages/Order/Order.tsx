import "./Order.scss";
import { useParams } from "react-router-dom";

import type { restsType } from "../../Components/RestsType";

import Error from "../Error/Error";
import dbOrders from "../../Components/rests.json";
import { useState } from "react";

export default function Order() {
  const [db, setDb] = useState<restsType>();

  const { id } = useParams();
  console.log(id, dbOrders);

  if (db == undefined) {
    dbOrders.forEach((elem) => {
      if (elem.id == Number(id)) {
        setDb(elem);
      }
    });
    return(<Error></Error>);
  }

  return (
    <div className="order">
      <img src={db.img} alt="" />
      <p>{db.name}</p>
      <p>{db.description}</p>
    </div>
  );
}
