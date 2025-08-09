import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { BrowserRouter } from "react-router-dom";

import './index.scss'
import App from './App/App.tsx'
import firebaseConfig from "../firebaseConfig.ts";

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </StrictMode>,
)
