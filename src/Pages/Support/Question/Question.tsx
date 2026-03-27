import "./Question.scss";

import { useState } from "react";

import T from "../../../Language/Text";

interface type {
  name: string;
  description: string;
}
export default function Question({ name, description }: type) {
  const [descriptionShow, setDescriptionShow] = useState<boolean>(false);
  console.log(name, description);

  return (
    <div
      onClick={() => setDescriptionShow(!descriptionShow)}
      className="question"
    >
      <p className="name">{T(name)}</p>
      {(descriptionShow && <img className="img_1" src="/backAlt.svg" alt="" />) || (
        <img className="img_2"  src="/backAlt.svg" alt="" />
      )}
      {descriptionShow && <p className="description">{T(description)}</p>}
    </div>
  );
}
