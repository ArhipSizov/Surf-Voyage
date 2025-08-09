import { Route, Routes } from "react-router-dom";

import "./App.scss";

import { Loading, Error } from "./links";

function App() {
  return (
    <div className="all">
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </div>
  );
}

export default App;
