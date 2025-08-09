import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import getCookie from "../Utils/getCookie";

import "./App.scss";

import { Loading, Error, Main } from "./links";

function App() {
  useEffect(() => {
    if (getCookie("language")) {
      document.cookie = `language=${getCookie("language")}; max-age=604800`;
    } else {
      document.cookie = "language=en; max-age=604800";
    }
  }, []);

  return (
    <div className="all">
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
