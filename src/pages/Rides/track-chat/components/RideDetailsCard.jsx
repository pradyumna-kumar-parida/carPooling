import React from "react";

const RideDetailsCard = ({
  ride,
  bookingId,
  amountPaid,
  seatsBooked,
  formatDate,
  formatTime,
}) => {
  const handleCopy = () => navigator.clipboard?.writeText(bookingId);

  return (
    <div className="chatpanel-card">
      <div className="card-header">
        <h3 className="card-title">Ride Details</h3>
        <span className="badge badge-blue">Upcoming</span>
      </div>

      {/* Booking ID + Amount */}
      <div className="ride-id-row">
        <div>
          <p className="meta-label">Booking ID</p>
          <p className="booking-id">
            #{bookingId}
            <button className="copy-btn" onClick={handleCopy} title="Copy ID">
              <svg viewBox="0 0 24 24" fill="none" width="13" height="13">
                <rect
                  x="9"
                  y="9"
                  width="13"
                  height="13"
                  rx="2"
                  stroke="#1a56db"
                  strokeWidth="2"
                />
                <path
                  d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
                  stroke="#1a56db"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p className="meta-label">Amount Paid</p>
          <p className="amount-paid">₹{amountPaid}</p>
        </div>
      </div>

      {/* Route */}
      <div className="route-section">
        <div className="route-point">
          <span className="route-dot route-dot-green" />
          <div>
            <p className="route-label">Pickup</p>
            <p className="route-address">{ride.source_address}</p>
            <p className="route-time">
              {formatDate(ride.ride_date)} · {formatTime(ride.departure_time)}
            </p>
          </div>
        </div>
        <div className="route-line-v" />
        <div className="route-point">
          <span className="route-dot route-dot-red" />
          <div>
            <p className="route-label">Drop</p>
            <p className="route-address">{ride.destination_address}</p>
            <p className="route-time">
              {formatDate(ride.ride_date)} ·{" "}
              {formatTime(ride.estimated_reach_time)}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-item">
          <p className="stat-label">Seats</p>
          <p className="stat-val">{seatsBooked}</p>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <p className="stat-label">Travel Time</p>
          <p className="stat-val">3h 10m</p>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <p className="stat-label">Distance</p>
          <p className="stat-val">145 km</p>
        </div>
      </div>
    </div>
  );
};

export default RideDetailsCard;
