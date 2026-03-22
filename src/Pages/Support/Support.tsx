import "./Support.scss";

import Question from "./Question/Question";

import T from "../../Language/Text";
import dbQuestion from "../../Components/questions.json"

export default function Support() {
  return (
    <div className="support">
      <h1>{T("Support center")}</h1>
      <div>
        <h2>{T("Frequently asked questions:")}</h2>
        <div className="all_questions">
          {dbQuestion.map((item) => (
            <Question {...item} key={item.id} />
          ))}
        </div>
        <h2>
          {T(
            "Don't help? You can write your problem here: @arhipsizov47@gmail.com",
          )}
        </h2>
      </div>
    </div>
  );
}
