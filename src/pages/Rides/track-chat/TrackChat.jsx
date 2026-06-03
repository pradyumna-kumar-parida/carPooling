import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MapPanel from "./components/MapPanel";
import ChatPanel from "./components/ChatPanel";
import "../../../styles/TrackChat.css";

const TrackChat = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ── Data from navigation state (passed from booking confirmation)
  const { ride, noOfSIt, booking, paymentId } = location.state || {};

  // ── Fallback dummy data for dev/preview
  const rideData = ride || {
    id: 14,
    source_address: "Vani Vihar, Bhubaneswar, Odisha, India",
    destination_address: "Jaydev Vihar, Bhubaneswar, Odisha, India",
    source_lat: "20.3039745",
    source_lng: "85.8396655",
    destination_lat: "20.2997267",
    destination_lng: "85.8172637",
    ride_date: "2026-06-03",
    departure_time: "03:30:00",
    estimated_reach_time: "11:12:00",
    price_per_seat: "132.00",
    driver_name: "Suraj Kumar",
    driver_phone: "1242179918",
    driver_profile_picture:
      "https://dev.maastrixdemo.com/carpooling_be/public/uploads/user/profile_1780074114_tiger.webp",
    brand: "Maruti",
    model: "Swift Dzire",
    registration_number: "MH12AB1234",
    vehicle_type: "Car",
    fuel_type: "Petrol",
  };

  const seatsBooked = noOfSIt || 3;
  const bookingId = booking?.id || "BK988364";
  const amountPaid = booking
    ? (parseFloat(rideData.price_per_seat) * seatsBooked).toFixed(2)
    : (132 * 3).toFixed(2);

  // ── Ride status logic
  const getRideStatus = () => {
    const now = new Date();
    const rideDateTime = new Date(
      `${rideData.ride_date}T${rideData.departure_time}`,
    );
    const diffMs = rideDateTime - now;
    const diffMins = diffMs / 60000;

    if (diffMins > 30) return "upcoming";
    if (diffMins > 0) return "driver_on_way";
    if (diffMins > -10) return "arrived";
    if (diffMins > -120) return "in_progress";
    return "completed";
  };

  const [rideStatus, setRideStatus] = useState(getRideStatus());
  const [mapFullscreen, setMapFullscreen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRideStatus(getRideStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const isTrackingEnabled = () => {
    const now = new Date();
    const rideDateTime = new Date(
      `${rideData.ride_date}T${rideData.departure_time}`,
    );
    const diffMins = (rideDateTime - now) / 60000;
    return diffMins <= 30;
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const formatTime = (t) => {
    if (!t) return "-";
    const [h, m] = t.split(":");
    const dt = new Date();
    dt.setHours(h, m);
    return dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="tc-page">
      <div className={`tc-wrapper ${mapFullscreen ? "tc-map-fullscreen" : ""}`}>
        {/* ══ LEFT — MAP PANEL ══ */}
        <div className={`tc-map-col ${mapFullscreen ? "tc-map-expanded" : ""}`}>
          <MapPanel
            ride={rideData}
            rideStatus={rideStatus}
            trackingEnabled={isTrackingEnabled()}
            mapFullscreen={mapFullscreen}
            setMapFullscreen={setMapFullscreen}
            formatDate={formatDate}
            formatTime={formatTime}
          />
        </div>

        {/* ══ RIGHT — CHAT PANEL ══ */}
        {!mapFullscreen && (
          <div className="tc-chat-col">
            {/* Ride Info Card */}
            <div className="tc-info-card">
              <div className="tc-info-header">
                <span className="tc-booking-id">#{bookingId}</span>
                <span className="tc-amount-paid">₹{amountPaid} Paid</span>
              </div>
              <div className="tc-info-route">
                <div className="tc-info-route-point">
                  <span className="tc-dot tc-dot-green" />
                  <span className="tc-info-addr">
                    {rideData.source_address}
                  </span>
                </div>
                <div className="tc-info-route-line" />
                <div className="tc-info-route-point">
                  <span className="tc-dot tc-dot-red" />
                  <span className="tc-info-addr">
                    {rideData.destination_address}
                  </span>
                </div>
              </div>
              <div className="tc-info-meta">
                <div className="tc-meta-item">
                  <span className="tc-meta-label">Date</span>
                  <span className="tc-meta-value">
                    {formatDate(rideData.ride_date)}
                  </span>
                </div>
                <div className="tc-meta-item">
                  <span className="tc-meta-label">Departure</span>
                  <span className="tc-meta-value">
                    {formatTime(rideData.departure_time)}
                  </span>
                </div>
                <div className="tc-meta-item">
                  <span className="tc-meta-label">Seats</span>
                  <span className="tc-meta-value">{seatsBooked}</span>
                </div>
              </div>
            </div>

            {/* Chat */}
            <ChatPanel driver={rideData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackChat;
