import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  FaCreditCard,
  FaMoneyBillWave,
  FaCheckCircle,
  FaLock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ImArrowRight } from "react-icons/im";
const RidePayment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Card Details State
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  // Ride Details (would come from props/context in real app)
  const rideDetails = {
    from: "Mumbai",
    to: "Pune",
    date: "April 25, 2026",
    time: "11:00 AM",
    passengers: 2,
    driverName: "Suraj Kumar",
    carModel: "Maruti Swift Dzire - White",
    price: 600,
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setPaymentSuccess(false);
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;

    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      if (formatted.replace(/\s/g, "").length <= 16) {
        setCardDetails({ ...cardDetails, [name]: formatted });
      }
      return;
    }

    // Format expiry date
    if (name === "expiryDate") {
      const formatted = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{0,2})/, "$1/$2")
        .substr(0, 5);
      setCardDetails({ ...cardDetails, [name]: formatted });
      return;
    }

    // CVV - only numbers, max 3 digits
    if (name === "cvv") {
      if (value.length <= 3 && /^\d*$/.test(value)) {
        setCardDetails({ ...cardDetails, [name]: value });
      }
      return;
    }

    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handlePayNow = (e) => {
    e.preventDefault();

    if (paymentMethod === "card") {
      // Validate card details
      if (
        !cardDetails.cardNumber ||
        !cardDetails.cardHolder ||
        !cardDetails.expiryDate ||
        !cardDetails.cvv
      ) {
        alert("Please fill all card details");
        return;
      }
    }

    // Simulate payment processing
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  const handleConfirmBooking = () => {
    // Navigate to booking confirmation page
    navigate("/booking-confirmation", {
      state: { rideDetails, paymentMethod },
    });
  };

  return (
    <>
      <div className="ridepay-page">
        <div className="ridepay-container">
          <div className="ridepay-content">
            {/* Left Section - Ride Summary */}
            <div className="ridepay-summary">
              <h2 className="ridepay-summary-title">Ride Summary</h2>

              <div className="ridepay-summary-card">
                <div className="ridepay-route">
                  <div className="ridepay-route-item">
                    <span className="ridepay-route-label">From</span>
                    <span className="ridepay-route-value">
                      {rideDetails.from}
                    </span>
                  </div>
                  <div className="ridepay-route-arrow">
                    <ImArrowRight />
                  </div>
                  <div className="ridepay-route-item">
                    <span className="ridepay-route-label">To</span>
                    <span className="ridepay-route-value">
                      {rideDetails.to}
                    </span>
                  </div>
                </div>

                <div className="ridepay-info-grid">
                  <div className="ridepay-info-item">
                    <span className="ridepay-info-label">Date</span>
                    <span className="ridepay-info-value">
                      {rideDetails.date}
                    </span>
                  </div>
                  <div className="ridepay-info-item">
                    <span className="ridepay-info-label">Time</span>
                    <span className="ridepay-info-value">
                      {rideDetails.time}
                    </span>
                  </div>
                  <div className="ridepay-info-item">
                    <span className="ridepay-info-label">Passengers</span>
                    <span className="ridepay-info-value">
                      {rideDetails.passengers} seats
                    </span>
                  </div>
                </div>

                <div className="ridepay-driver">
                  <h4 className="ridepay-driver-title">Driver Details</h4>
                  <p className="ridepay-driver-name">
                    {rideDetails.driverName}
                  </p>
                  <p className="ridepay-driver-car">{rideDetails.carModel}</p>
                </div>

                <div className="ridepay-price-section">
                  <span className="ridepay-price-label">Total Amount</span>
                  <span className="ridepay-price-value">
                    ₹{rideDetails.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Section - Payment */}
            <div className="ridepay-payment">
              {!paymentSuccess ? (
                <>
                  <h2 className="ridepay-payment-title">Payment Method</h2>

                  <FormControl component="fieldset" fullWidth>
                    <RadioGroup
                      value={paymentMethod}
                      onChange={handlePaymentMethodChange}
                      className="ridepay-radio-group"
                    >
                      <div
                        className={`ridepay-method-card ${paymentMethod === "cash" ? "active" : ""}`}
                        onClick={() => setPaymentMethod("cash")}
                      >
                        <FormControlLabel
                          value="cash"
                          control={<Radio />}
                          label={
                            <div className="ridepay-method-content">
                              <FaMoneyBillWave className="ridepay-method-icon" />
                              <div className="ridepay-method-text">
                                <span className="ridepay-method-name">
                                  Cash Payment
                                </span>
                                <span className="ridepay-method-desc">
                                  Pay directly to driver
                                </span>
                              </div>
                            </div>
                          }
                        />
                      </div>

                      <div
                        className={`ridepay-method-card ${paymentMethod === "card" ? "active" : ""}`}
                        onClick={() => setPaymentMethod("card")}
                      >
                        <FormControlLabel
                          value="card"
                          control={<Radio />}
                          label={
                            <div className="ridepay-method-content">
                              <FaCreditCard className="ridepay-method-icon" />
                              <div className="ridepay-method-text">
                                <span className="ridepay-method-name">
                                  Card Payment
                                </span>
                                <span className="ridepay-method-desc">
                                  Pay securely with card
                                </span>
                              </div>
                            </div>
                          }
                        />
                      </div>
                    </RadioGroup>
                  </FormControl>

                  {/* Card Payment Form */}
                  {paymentMethod === "card" && (
                    <div className="ridepay-card-form">
                      <div className="ridepay-secure-badge">
                        <FaLock className="ridepay-lock-icon" />
                        <span>Secure Payment</span>
                      </div>

                      <form onSubmit={handlePayNow}>
                        <TextField
                          fullWidth
                          label="Card Number"
                          name="cardNumber"
                          value={cardDetails.cardNumber}
                          onChange={handleCardInputChange}
                          placeholder="1234 5678 9012 3456"
                          className="ridepay-input"
                          required
                          sx={{ mb: 2 }}
                        />

                        <TextField
                          fullWidth
                          label="Cardholder Name"
                          name="cardHolder"
                          value={cardDetails.cardHolder}
                          onChange={handleCardInputChange}
                          placeholder="John Doe"
                          className="ridepay-input"
                          required
                          sx={{ mb: 2 }}
                        />

                        <div className="ridepay-input-row">
                          <TextField
                            label="Expiry Date"
                            name="expiryDate"
                            value={cardDetails.expiryDate}
                            onChange={handleCardInputChange}
                            placeholder="MM/YY"
                            className="ridepay-input"
                            required
                            sx={{ flex: 1 }}
                          />

                          <TextField
                            label="CVV"
                            name="cvv"
                            value={cardDetails.cvv}
                            onChange={handleCardInputChange}
                            placeholder="123"
                            type="password"
                            className="ridepay-input"
                            required
                            sx={{ flex: 1 }}
                          />
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Pay Now Button */}
                  <button
                    className="ridepay-btn-primary"
                    onClick={handlePayNow}
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <CircularProgress size={20} color="inherit" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        {paymentMethod === "cash"
                          ? "Confirm Cash Payment"
                          : "Pay Now"}
                      </>
                    )}
                  </button>
                </>
              ) : (
                /* Success State */
                <div className="ridepay-success">
                  <div className="ridepay-success-icon">
                    <FaCheckCircle />
                  </div>
                  <h2 className="ridepay-success-title">Payment Successful!</h2>
                  <p className="ridepay-success-text">
                    {paymentMethod === "cash"
                      ? "Your booking is confirmed. Please pay cash to the driver."
                      : "Your payment has been processed successfully."}
                  </p>

                  <Alert severity="success" className="ridepay-success-alert">
                    Amount Paid: ₹{rideDetails.price}
                  </Alert>

                  <button
                    className="ridepay-btn-primary"
                    onClick={handleConfirmBooking}
                  >
                    Confirm Booking
                  </button>
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
