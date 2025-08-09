
import { Route, Routes } from "react-router-dom";

import "./App.scss";

import { Loading } from "./links";

function App() {

  return (
    <div className="all">
      <Routes>
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </div>
  );
}

export default App;
