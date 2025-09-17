import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ScrollToTop from "./components/ScrollToTop";

import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>{" "}
  </StrictMode>
);
