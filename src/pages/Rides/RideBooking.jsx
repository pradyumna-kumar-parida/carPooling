import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { MdFreeCancellation } from "react-icons/md";
import { GiCometSpark } from "react-icons/gi";
import { FaCar } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
// import CloseIcon from "@mui/icons-material/Close";
import Header from "../../components/Nav";
import Footer from "../../components/Footer";

const RideConfirmation = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openVerificationModal, setOpenVerificationModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  // Phone Verification States
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const token = localStorage.getItem("token");
  const handleClose = () => {
    setOpenModal(false);
  };

  const handleVerificationClose = () => {
    setOpenVerificationModal(false);
    setPhoneNumber("");
    setOtp("");
    setShowOtpInput(false);
    setIsVerified(false);
    setError("");
    setGeneratedOtp("");
  };

  const handleGetOtp = () => {
    if (!phoneNumber) {
      setAlertMessage("Please enter phone number");
      setAlertType("error");
      setOpenAlert(true);
      return;
    }

    if (phoneNumber.length !== 10) {
      setAlertMessage("Enter valid 10-digit phone number");
      setAlertType("error");
      setOpenAlert(true);
      return;
    }

    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    setShowOtpInput(true);

    console.log("Generated OTP:", randomOtp);
    alert(`Your OTP is: ${randomOtp}`);
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      setAlertMessage("Please enter the OTP");
      setAlertType("error");
      setOpenAlert(true);
      return;
    }

    if (otp === generatedOtp) {
      setAlertMessage("Number verification has been completed successfully.");
      setAlertType("success");
      setOpenAlert(true);

      handleVerificationClose(); // ✅ close immediately
    } else {
      setAlertMessage("Invalid OTP. Please try again.");
      setAlertType("error");
      setOpenAlert(true);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Only numbers
    if (value.length <= 10) {
      setPhoneNumber(value);
      setError("");
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Only numbers
    if (value.length <= 6) {
      setOtp(value);
      setError("");
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 450 },
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Snackbar
        open={openAlert}
        autoHideDuration={5000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ zIndex: 9999 }} // ✅ IMPORTANT
      >
        <Alert
          severity={alertType}
          variant="filled"
          onClose={() => setOpenAlert(false)}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      {/* Price Details Modal */}
      <Dialog
        open={openModal}
        onClose={handleClose}
        PaperProps={{
          className: "ride-price-modal",
        }}
      >
        <DialogContent className="ride-price-content">
          <h2 className="ride-price-title">Price details</h2>

          <div className="ride-price-list">
            <div className="ride-price-row">
              <span>Co-traveller</span>
              <span>₹300.00</span>
            </div>

            <div className="ride-price-row">
              <span>Co-traveller</span>
              <span>₹300.00</span>
            </div>
          </div>

          <div className="ride-price-divider"></div>

          <div className="ride-price-total">
            <span>Total price</span>
            <span className="ride-price-amount">₹600.00</span>
          </div>
        </DialogContent>
      </Dialog>
    

      <Header />
      <div className="ride-confirm-page">
        <div className="ride-confirm-container">
          {/* Main Content */}
          <div className="ride-confirm-main">
            {/* Header */}
            <h1 className="ride-confirm-title">Ride details</h1>

            {/* Trip Timeline Card */}
            <div className="ride-confirm-card ride-timeline-card">
              <h3 className="summary-date">Wednesday, 15 April</h3>
              <div className="timeline-route">
                <div className="timeline-stop">
                  <div className="timeline-marker">
                    <IoLocationOutline />
                    <div className="timeline-line"></div>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-time">11:00</div>
                    <div className="timeline-duration">3h10</div>
                    <div className="timeline-location">
                      <h3 className="location-city">Mumbai</h3>
                      <p className="location-address">
                        Terminal 2, International APT, Metro Stn, Navpada,
                        Marol, Andheri(E), Maharashtra
                      </p>
                    </div>
                  </div>
                </div>

                <div className="timeline-stop">
                  <div className="timeline-marker">
                    <FaLocationDot />
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-time">14:10</div>
                    <div className="timeline-location">
                      <h3 className="location-city">Pune</h3>
                      <p className="location-address">
                        FR6C+9WF, Navale Brg, Kudale Baug, Vadgaon Budruk,
                        Maharashtra
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Driver Card */}
            <div className="ride-confirm-card ride-driver-card">
              <div className="driver-all-details">
                <div className="driver-info">
                  <img
                    src="https://i.pravatar.cc/150?img=33"
                    alt="Suraj"
                    className="driver-avatar"
                    loading="eager"
                  />
                  <span className="driver-name">Suraj</span>
                </div>
                <button className="driver-arrow">
                  <FaAngleRight />
                </button>
              </div>
              <hr />
              <div className=" ride-details-card">
                <div className="detail-item">
                  <div className="detail-icon">
                    <MdFreeCancellation />
                  </div>
                  <span className="detail-text">Sometimes cancels rides</span>
                </div>

                <div className="detail-item">
                  <div className="detail-icon">
                    <GiCometSpark />
                  </div>
                  <span className="detail-text">
                    Your booking will be confirmed instantly
                  </span>
                </div>

                <div className="detail-item">
                  <div className="detail-icon">
                    <FaCar />
                  </div>
                  <span className="detail-text">
                    <b>MARUTI SWIFT DZIRE</b> - white
                  </span>
                </div>
              </div>
            </div>

            {/* Passengers Card */}
            <div className="ride-confirm-card ride-passengers-card">
              <h2 className="passengers-title">Passengers</h2>
              <div className="passenger-item">
                <div className="passenger-info">
                  <img
                    src="https://i.pravatar.cc/150?img=12"
                    alt="Deepak"
                    className="passenger-avatar"
                    loading="eager"
                  />
                  <div className="passenger-details">
                    <span className="passenger-name">Deepak</span>
                    <span className="passenger-route">Mumbai → Pune</span>
                  </div>
                </div>
                <button className="passenger-arrow">
                  <FaAngleRight />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="ride-confirm-sidebar">
            {/* Status Badge */}
            <div className="ride-status-badge">
              <BsInfoCircle />
              <span>This ride has already departed</span>
            </div>

            {/* Trip Summary Card */}
            <div className="ride-confirm-card ride-summary-card">
              <div className="summary-timeline">
                Book safe, affordable rides with verified drivers, real-time
                tracking, instant confirmation, flexible cancellation, and
                comfort. Tap the button below to book now.
              </div>
              <div className="driver-infos">
                <div className="summary-driver">
                  <img
                    src="https://i.pravatar.cc/150?img=33"
                    alt="Suraj"
                    className="summary-driver-avatar"
                    loading="eager"
                  />
                  <span className="summary-driver-name">
                    Suraj <i className="role-info">(Driver)</i>
                  </span>
                </div>
                <p className="driver-detl">
                  Skilled and reliable driver dedicated to providing safe,
                  comfortable, and on-time rides with a professional attitude.
                </p>
              </div>

              <div className="book-rides-now">
                <div className="summary-pricing">
                  <span className="summary-passengers">2 passengers</span>
                  <div className="summary-price">
                    <span className="price-currency">₹</span>
                    <span className="price-amount">600.00</span>
                  </div>
                  <button
                    className="summary-arrow"
                    onClick={() => setOpenModal(true)}
                  >
                    <FaAngleRight />
                  </button>
                </div>
                {token ? (
                  <button
                    className="btn register-btn"
                    onClick={() => setOpenVerificationModal(true)}
                  >
                    Request to Book
                  </button>
                ) : (
                  <button
                    className="btn register-btn"
                    onClick={() => setOpenVerificationModal(true)}
                  >
                    Book
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RideConfirmation;
