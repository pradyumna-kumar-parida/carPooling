import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./styles/FindRide.css";
import App from "./routes/App";
import AuthProvider from "./context/AuthContext"; // ✅ no extra O
import VechicleProvider from "./context/VehicleContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <VechicleProvider>
        <App />
      </VechicleProvider>
    </AuthProvider>
  </StrictMode>,
);
