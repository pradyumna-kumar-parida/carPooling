import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaUser,
  FaCar,
  FaDownload,
  FaShare,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { Chip } from "@mui/material";
import Header from "../../components/Nav";
import Footer from "../../components/Footer";
import { FaStar } from "react-icons/fa";
const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get data from previous page (or use default)
  const { rideDetails, paymentMethod } = location.state || {
    rideDetails: {
      from: "Mumbai",
      to: "Pune",
      date: "April 25, 2026",
      time: "11:00 AM",
      passengers: 2,
      driverName: "Suraj Kumar",
      carModel: "Maruti Swift Dzire - White",
      price: 600,
      duration: "3h 10m",
      fromAddress:
        "Terminal 2, International APT, Metro Stn, Navpada, Marol, Andheri(E)",
      toAddress:
        "FR6C+9WF, Navale Brg, Kudale Baug, Vadgaon Budruk, Maharashtra",
      driverPhone: "+91 9876543210",
      driverRating: 4.8,
    },
    paymentMethod: "card",
  };

  const bookingId = "BK" + Math.floor(100000 + Math.random() * 900000);
  const bookingDate = new Date().toLocaleString();

  const handleDownloadTicket = () => {
    alert("Downloading ticket...");
    // Implement download functionality
  };

  const handleShareBooking = () => {
    alert("Sharing booking details...");
    // Implement share functionality
  };

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="bookconf-page">
        <div className="bookconf-container">
          {/* Success Header */}
          <div className="bookconf-success-header">
            <div className="bookconf-success-icon">
              <FaCheckCircle />
            </div>
            <h1 className="bookconf-success-title">Booking Confirmed!</h1>
            <p className="bookconf-success-text">
              Your ride has been successfully booked. Check your email for
              confirmation details.
            </p>
            <Chip
              label={`Booking ID: ${bookingId}`}
              className="bookconf-booking-id"
              color="primary"
            />
          </div>

          {/* Main Content */}
          <div className="bookconf-content">
            {/* Left - Booking Details */}
            <div className="bookconf-details-section">
              {/* Journey Details */}
              <div className="bookconf-card">
                <h3 className="bookconf-card-title">Journey Details</h3>

                <div className="bookconf-journey">
                  <div className="bookconf-journey-step">
                    <div className="bookconf-step-marker">
                      <IoLocationOutline className="bookconf-step-icon start" />
                      <div className="bookconf-step-line"></div>
                    </div>
                    <div className="bookconf-step-content">
                      <h4 className="bookconf-step-city">{rideDetails.from}</h4>
                      <p className="bookconf-step-address">
                        {rideDetails.fromAddress}
                      </p>
                      <span className="bookconf-step-time">
                        {rideDetails.time}
                      </span>
                    </div>
                  </div>

                  <div className="bookconf-journey-step">
                    <div className="bookconf-step-marker">
                      <FaLocationDot className="bookconf-step-icon end" />
                    </div>
                    <div className="bookconf-step-content">
                      <h4 className="bookconf-step-city">{rideDetails.to}</h4>
                      <p className="bookconf-step-address">
                        {rideDetails.toAddress}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ride Information */}
              <div className="bookconf-card">
                <h3 className="bookconf-card-title">Ride Information</h3>

                <div className="bookconf-info-grid">
                  <div className="bookconf-info-item">
                    <FaCalendarAlt className="bookconf-info-icon" />
                    <div>
                      <span className="bookconf-info-label">Date</span>
                      <span className="bookconf-info-value">
                        {rideDetails.date}
                      </span>
                    </div>
                  </div>

                  <div className="bookconf-info-item">
                    <FaClock className="bookconf-info-icon" />
                    <div>
                      <span className="bookconf-info-label">
                        Departure Time
                      </span>
                      <span className="bookconf-info-value">
                        {rideDetails.time}
                      </span>
                    </div>
                  </div>

                  <div className="bookconf-info-item">
                    <FaClock className="bookconf-info-icon" />
                    <div>
                      <span className="bookconf-info-label">Duration</span>
                      <span className="bookconf-info-value">
                        {rideDetails.duration}
                      </span>
                    </div>
                  </div>

                  <div className="bookconf-info-item">
                    <FaUser className="bookconf-info-icon" />
                    <div>
                      <span className="bookconf-info-label">Passengers</span>
                      <span className="bookconf-info-value">
                        {rideDetails.passengers} seats
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Driver Details */}
              <div className="bookconf-card">
                <h3 className="bookconf-card-title">Driver Details</h3>

                <div className="bookconf-driver">
                  <img
                    src="https://i.pravatar.cc/150?img=33"
                    alt={rideDetails.driverName}
                    className="bookconf-driver-avatar"
                    loading="eager"
                  />
                  <div className="bookconf-driver-info">
                    <h4 className="bookconf-driver-name">
                      {rideDetails.driverName}
                    </h4>
                    <div className="bookconf-driver-meta">
                      <span className="bookconf-driver-rating">
                        <FaStar /> <FaStar /> <FaStar /> <FaStar />{" "}
                        {rideDetails.driverRating}
                      </span>
                      <span className="bookconf-driver-phone">
                        {rideDetails.driverPhone}
                      </span>
                    </div>
                    <div className="bookconf-driver-car">
                      <FaCar className="bookconf-car-icon" />
                      <span>{rideDetails.carModel}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Payment Summary */}
            <div className="bookconf-summary-section">
              {/* Payment Status */}
              <div className="bookconf-card bookconf-payment-card">
                <h3 className="bookconf-card-title">Payment Summary</h3>

                <div className="bookconf-payment-status">
                  <Chip
                    label={
                      paymentMethod === "cash" ? "Cash Payment" : "Paid Online"
                    }
                    color={paymentMethod === "cash" ? "warning" : "success"}
                    className="bookconf-payment-chip"
                  />
                </div>

                <div className="bookconf-price-breakdown">
                  <div className="bookconf-price-row">
                    <span className="bookconf-price-label">
                      Ride Fare ({rideDetails.passengers} seats)
                    </span>
                    <span className="bookconf-price-value">
                      ₹{rideDetails.price}
                    </span>
                  </div>
                  <div className="bookconf-price-row">
                    <span className="bookconf-price-label">Service Fee</span>
                    <span className="bookconf-price-value">₹0</span>
                  </div>
                  <div className="bookconf-price-divider"></div>
                  <div className="bookconf-price-row total">
                    <span className="bookconf-price-label">Total Amount</span>
                    <span className="bookconf-price-value">
                      ₹{rideDetails.price}
                    </span>
                  </div>
                </div>

                {paymentMethod === "cash" && (
                  <div className="bookconf-cash-note">
                    <p>Please pay ₹{rideDetails.price} in cash to the driver</p>
                  </div>
                )}
              </div>

              {/* Booking Info */}
              <div className="bookconf-card">
                <h3 className="bookconf-card-title">Booking Information</h3>

                <div className="bookconf-booking-info">
                  <div className="bookconf-booking-row">
                    <span className="bookconf-booking-label">Booking ID</span>
                    <span className="bookconf-booking-value">{bookingId}</span>
                  </div>
                  <div className="bookconf-booking-row">
                    <span className="bookconf-booking-label">Booked On</span>
                    <span className="bookconf-booking-value">
                      {bookingDate}
                    </span>
                  </div>
                  <div className="bookconf-booking-row">
                    <span className="bookconf-booking-label">Status</span>
                    <Chip label="Confirmed" color="success" size="small" />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bookconf-actions">
                <button
                  className="bookconf-btn-secondary"
                  onClick={handleDownloadTicket}
                >
                  <FaDownload />
                  Download Ticket
                </button>
                <button
                  className="bookconf-btn-secondary"
                  onClick={handleShareBooking}
                >
                  <FaShare />
                  Share Booking
                </button>
                <button
                  className="bookconf-btn-primary"
                  onClick={handleBackHome}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingConfirmation;
