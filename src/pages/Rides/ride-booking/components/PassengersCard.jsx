// src/pages/Rides/find-ride/ride-booking/components/PassengersCard.jsx

import { FaAngleRight } from "react-icons/fa6";
import Avatar from "./Avatar";

export default function PassengersCard({ ride }) {
  return (
    <div className="ride-confirm-card ride-passengers-card">
      <h2 className="passengers-title">Passengers</h2>

      <div className="passenger-item">
        <div className="passenger-info">
          <Avatar
            src={null}
            name="You"
            className="passenger-avatar"
            style={{ objectFit: "cover" }}
          />
          <div className="passenger-details">
            <span className="passenger-name">You</span>
            <span className="passenger-route">
              {ride?.source_address?.split(",")[0]} →{" "}
              {ride?.destination_address?.split(",")[0]}
            </span>
          </div>
        </div>
       
      </div>
    </div>
  );
}