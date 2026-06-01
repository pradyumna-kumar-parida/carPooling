// src/pages/Vehicle/vehicle-details/components/EmptyState.jsx

import { useNavigate } from "react-router-dom";
import { FaCar } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
export default function EmptyState() {
  const navigate = useNavigate();
  return (
    <div className="vehicle-detl-empty">
      <div className="vehicle-detl-empty-icon">
        <FaCar size={40} />
      </div>
      <h3 className="vehicle-detl-empty-title">No Vehicles Registered</h3>
      <p className="vehicle-detl-empty-desc">
        Register your vehicle to start offering rides and earning with us.
      </p>
      <button
        className="vehicle-detl-add-btn"
        onClick={() => navigate("/vehicle-registration")}
      >
       <FiPlus/> Register Your Vehicle
      </button>
    </div>
  );
}
