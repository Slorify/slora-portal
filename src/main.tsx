import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthProivder from "./auth/AuthProivder.tsx";
import TopLoader from "./components/TopLoader.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProivder>
        <TopLoader />
        <App />
      </AuthProivder>
      <Toaster position="top-center" />
    </BrowserRouter>
  </StrictMode>,
);
