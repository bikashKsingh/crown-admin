import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/admin">
    <App />
    <ToastContainer />
  </BrowserRouter>
);
