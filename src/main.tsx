import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import './index.scss'
import store from "./Services/store";
import App from './App/App.tsx'
import firebaseConfig from "../firebaseConfig.ts";

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
