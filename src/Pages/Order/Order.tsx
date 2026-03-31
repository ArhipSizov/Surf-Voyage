import "./Order.scss";
import { useParams } from "react-router-dom";
import type { dataRests } from "../../Services/fbData";
import type { allDataRests } from "../../Services/fbAllData";
import { useSelector } from "react-redux";

import T from "../../Language/Text";
import Error from "../Error/Error";
import { useState } from "react";

interface state {
  rests: allDataRests;
}

export default function Order() {  
  const restsArr = useSelector((state: state) => state.rests.rests);

  const [dbRests] = useState<dataRests[]>(restsArr);
  const [db, setDb] = useState<dataRests>();

  const { id } = useParams();

  if (db == undefined) {
    dbRests.forEach((elem) => {
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
