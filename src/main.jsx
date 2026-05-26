import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./styles/FindRide.css";
import App from "./routes/App";
createRoot(document.getElementById("root")).render(<App />);
