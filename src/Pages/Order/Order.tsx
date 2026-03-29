import "./Order.scss";
import { useParams } from "react-router-dom";

import type { restsType } from "../../Components/RestsType";

import T from "../../Language/Text";
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
    return <Error></Error>;
  }

  return (
    <div className="order max_width">
      <div className="top_block">
        <div className="actions">
          <img className="main_color" src="/Order/share.svg" alt="" />
          <img className="main_color" src="/Order/unliked.svg" alt="" />
          <img className="main_color" src="/Order/report.svg" alt="" />
        </div>
        <img className="main_img" src={db.img} alt="" />
        <div className="right_block">
          <h1>{db.name}</h1>
          <h2>{db.where}</h2>
          <div className="grade">
            <p>0.0</p>
            <img src="/Order/star.svg" alt="" />
            <img src="/Order/star.svg" alt="" />
            <img src="/Order/star.svg" alt="" />
            <img src="/Order/star.svg" alt="" />
            <img src="/Order/star.svg" alt="" />
          </div>
          <p>
            {db.long} {T("days")}
          </p>
          <p>{db.cost} $</p>
          <p className="order_button">{T("Order")}</p>
        </div>
      </div>
      <p className="description">{db.description}</p>
    </div>
  );
}
