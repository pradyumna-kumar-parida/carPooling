import React from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
const DriverDetailsCard = ({ driver }) => (
  <div className="chatpanel-card">
    <h3 className="card-title" style={{ marginBottom: 14 }}>
      Driver Details
    </h3>
    <div className="driver-row">
      <img
        src={driver.driver_profile_picture}
        alt={driver.driver_name}
        className="driver-avatar"
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(driver.driver_name)}&background=1a56db&color=fff`;
        }}
      />
      <div className="driver-meta">
        <p className="driver-name">{driver.driver_name}</p>
        <p className="driver-rating">⭐ 4.8</p>
        <p className="driver-vehicle-info">
          {driver.brand} {driver.model}
          <br />
          <span style={{ color: "#64748b" }}>{driver.registration_number}</span>
        </p>
      </div>
      <div className="driver-actions">
        <a
          href={`tel:${driver.driver_phone}`}
          className="action-btn action-btn-blue"
          title="Call driver"
        >
          <BiSolidPhoneCall size={18}/>
          <span>Call</span>
        </a>
      </div>
    </div>
  </div>
);

export default DriverDetailsCard;
