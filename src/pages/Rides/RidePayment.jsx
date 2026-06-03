import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaCar,
  FaUser,
  FaPhone,
  FaCalendarAlt,
  FaClock,
  FaRoad,
  FaLeaf,
  FaSmoking,
  FaChair,
} from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { ImArrowRight } from "react-icons/im";
import ArcLoader from "../../components/Loader";
import RazorpayImg from "../../assets/Images/razorpay.svg";
const RAZORPAY_KEY = "YOUR_RAZORPAY_KEY_ID";
const RidePayment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { ride, noOfSIt, booking } = location.state || {};

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const totalAmount = ride?.price_per_seat
    ? (parseFloat(ride.price_per_seat) * (noOfSIt || 1)).toFixed(2)
    : 0;

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const formatTime = (time) => {
    if (!time) return "-";
    const [h, m] = time.split(":");
    const date = new Date();
    date.setHours(h, m);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDistance = (meters) => {
    if (!meters) return "-";
    return meters >= 1000 ? `${(meters / 1000).toFixed(1)} km` : `${meters} m`;
  };

  const handlePayNow = () => {
    if (!razorpayLoaded) {
      alert("Razorpay SDK not loaded. Please refresh.");
      return;
    }

    setProcessing(true);

    const options = {
      key: RAZORPAY_KEY,
      amount: Math.round(parseFloat(totalAmount) * 100),
      currency: "INR",
      name: "CarpoolApp",
      description: `${ride?.source_address || "Source"} → ${ride?.destination_address || "Destination"}`,
      image: ride?.driver_profile_picture || "",
      prefill: {
        name: booking?.passenger_name || "",
        email: booking?.passenger_email || "",
        contact: booking?.passenger_phone || "",
      },
      notes: {
        booking_id: booking?.id || "",
        ride_id: ride?.id || "",
      },
      theme: { color: "#1a56db" },
      handler: function (response) {
        setProcessing(false);
        setPaymentSuccess(true);
        setTimeout(() => {
          navigate("/booking-confirmation", {
            state: {
              ride,
              noOfSIt,
              booking,
              paymentId: response.razorpay_payment_id,
            },
          });
        }, 2000);
      },
      modal: {
        ondismiss: function () {
          setProcessing(false);
        },
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      setProcessing(false);
      alert(`Payment failed: ${response.error.description}`);
    });

    setTimeout(() => rzp.open(), 100);
  };

  return (
    <>
      {processing && (
        <div className="ridepay-loader-overlay">
          <ArcLoader />
        </div>
      )}

      <div className="ridepay-page">
        <div className="ridepay-container">
          <h2 className="ride-confirm-title">Ride Summary</h2>
          <div className="ridepay-content">
            <div className="ridepay-summary">
              <div className="ridepay-summary-card">
                <div className="ridepay-route">
                  <div className="ridepay-route-item">
                    <span className="ridepay-route-label">From</span>
                    <span className="ridepay-route-value">
                      {ride?.source_address || "-"}
                    </span>
                  </div>
                  <div className="ridepay-route-arrow">
                    <ImArrowRight />
                  </div>
                  <div className="ridepay-route-item">
                    <span className="ridepay-route-label">To</span>
                    <span className="ridepay-route-value">
                      {ride?.destination_address || "-"}
                    </span>
                  </div>
                </div>

                {/* Trip Details */}
                <div className="ridepay-info-grid">
                  <div className="ridepay-info-item">
                    <span className="ridepay-info-label">
                      <FaCalendarAlt /> Date
                    </span>
                    <span className="ridepay-info-value">
                      {formatDate(ride?.ride_date)}
                    </span>
                  </div>
                  <div className="ridepay-info-item">
                    <span className="ridepay-info-label">
                      <FaClock /> Departure
                    </span>
                    <span className="ridepay-info-value">
                      {formatTime(ride?.departure_time)}
                    </span>
                  </div>
                  <div className="ridepay-info-item">
                    <span className="ridepay-info-label">
                      <FaClock /> Estimated Arrival
                    </span>
                    <span className="ridepay-info-value">
                      {formatTime(ride?.estimated_reach_time)}
                    </span>
                  </div>

                  <div className="ridepay-info-item">
                    <span className="ridepay-info-label">
                      <FaRoad /> Distance
                    </span>
                    <span className="ridepay-info-value">
                      {formatDistance(ride?.distance_meters)}
                    </span>
                  </div>
                  <div className="ridepay-info-item">
                    <span className="ridepay-info-label">
                      <FaChair /> Seats Booked
                    </span>
                    <span className="ridepay-info-value">
                      {noOfSIt || 1} seat{noOfSIt > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                {/* Driver Details */}
                <div className="ridepay-driver">
                  <h4 className="ridepay-driver-title">Driver Details</h4>
                  <div className="ridepay-driver-info">
                    {ride?.driver_profile_picture && (
                      <img
                        src={ride.driver_profile_picture}
                        alt={ride.driver_name}
                        className="ridepay-driver-avatar"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    )}
                    <div>
                      <p className="ridepay-driver-name">
                        {ride?.driver_name || "-"}
                      </p>

                      <p className="ridepay-driver-car">
                        {ride?.brand} {ride?.model} ({ride?.manufacture_year}) ·{" "}
                        {ride?.fuel_type}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ridepay-payment">
              {!paymentSuccess ? (
                <>
                  <h2 className="ridepay-payment-title">Complete Payment</h2>

                  <div className="ridepay-razorpay-info">
                    <div className="ridepay-razorpay-logo">
                      <img
                        src={RazorpayImg}
                        alt="Razorpay"
                        width="30%"
                        height="100%"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                    <p className="ridepay-razorpay-desc">
                      Pay securely using UPI, Cards, Net Banking, or Wallets.
                    </p>
                  </div>

                  <div className="ridepay-amount-display">
                    <span className="ridepay-amount-label">You Pay</span>
                    <span className="ridepay-amount-value">₹{totalAmount}</span>
                  </div>

                  <button
                    className="ridepay-btn-primary"
                    onClick={handlePayNow}
                    disabled={processing || !razorpayLoaded}
                  >
                    {processing ? "Opening Payment..." : `Pay ₹${totalAmount}`}
                  </button>

                  <p className="ridepay-secure-note">
                    <FaLock /> 256-bit SSL encrypted | Secured by Razorpay
                  </p>
                </>
              ) : (
                <div className="ridepay-success">
                  <div className="ridepay-success-icon">
                    <FaCheckCircle />
                  </div>
                  <h2 className="ridepay-success-title">Payment Successful!</h2>
                  <p className="ridepay-success-text">
                    Your booking is confirmed. Redirecting…
                  </p>
                  <div className="ridepay-success-amount">
                    ₹{totalAmount} Paid
                  </div>
                  <ArcLoader />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RidePayment;
