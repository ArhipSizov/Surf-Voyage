import T from "../../Language/Text";

import "./Main.scss";

export default function Main() {
  return (
    <div className="Main">
      <p
        onClick={() => (
          (document.cookie = "language=ru; max-age=604800"), location.reload()
        )}
      >
        Русский
      </p>
      <p
        onClick={() => (
          (document.cookie = "language=en; max-age=604800"), location.reload()
        )}
      >
        English
      </p>
      <p>{T("Oops...")}</p>
    </div>
  );
}
