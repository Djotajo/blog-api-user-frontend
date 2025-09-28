import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ScrollToTop from "./components/ScrollToTop";

import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ApiUrlProvider } from "./context/ApiUrlContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <ApiUrlProvider>
          <App />
        </ApiUrlProvider>
      </AuthProvider>
    </BrowserRouter>{" "}
  </StrictMode>
);
