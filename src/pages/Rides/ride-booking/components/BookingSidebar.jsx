// src/pages/Rides/find-ride/ride-booking/components/BookingSidebar.jsx

import { FaAngleRight } from "react-icons/fa6";
import { BsInfoCircle } from "react-icons/bs";
import Avatar from "./Avatar";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function BookingSidebar({
  ride,
  pricePerSeat,
  isRidePassed,
  bookingLoading,
  token,
  onPriceClick,
  onBookClick,
  onLoginClick,
  noOfSIt,
}) {
  const total = (pricePerSeat * noOfSIt).toFixed(2);

  return (
    <div className="ride-confirm-sidebar">
      {isRidePassed && (
        <div className="ride-status-badge">
          <BsInfoCircle />
          <span>This ride has already departed</span>
        </div>
      )}

      <div className="ride-confirm-card ride-summary-card">
        <div className="summary-timeline">
          <div className="summary-feature">
            <IoMdCheckmarkCircleOutline size={14} />

            <span>Verified Driver</span>
          </div>

          <div className="summary-feature">
            <IoMdCheckmarkCircleOutline size={14} />
            <span>Instant Booking</span>
          </div>

          <div className="summary-feature">
            <IoMdCheckmarkCircleOutline size={14} />
            <span>Live Tracking</span>
          </div>
        </div>

        {/* Driver Info */}
        <div className="driver-infos">
          <div className="summary-driver">
            <Avatar
              src={ride?.driver_profile_picture}
              name={ride?.driver_name}
              className="summary-driver-avatar"
              style={{ objectFit: "cover" }}
            />

            <span
              className="summary-driver-name"
              style={{ textTransform: "capitalize" }}
            >
              {ride?.driver_name} <b style={{ fontSize: "14px" }}>(Driver)</b>
            </span>
          </div>

          <p className="driver-detl">
            Experienced driver with a strong focus on passenger safety.
          </p>
        </div>

        {/* ── Pricing + CTA ── */}
        <div className="book-rides-now">
          <div className="summary-pricing">
            <span className="summary-passengers">
              {/* {noOfSIt} seats *{pricePerSeat} */}
              Trip Fare
            </span>
            <div className="summary-price">
              <span className="price-currency">₹</span>
              <span className="price-amount">{total}</span>
            </div>
            <button className="summary-arrow" onClick={onPriceClick}>
              <FaAngleRight />
            </button>
          </div>

          {!isRidePassed && (
            token ? (
              <button
                className="btn register-btn"
                onClick={onBookClick}
                disabled={bookingLoading}
                style={{ opacity: bookingLoading ? 0.7 : 1, cursor: bookingLoading ? "not-allowed" : "pointer" }}
              >
                {bookingLoading ? "Requesting..." : "Request to Book"}
              </button>
            ) : (
              <button className="btn register-btn" onClick={onLoginClick}>
                Log in to Book
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}