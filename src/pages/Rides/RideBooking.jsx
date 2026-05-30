// import React, { useState } from "react";
// import { IoLocationOutline } from "react-icons/io5";
// import { FaLocationDot } from "react-icons/fa6";
// import { FaAngleRight } from "react-icons/fa6";
// import { MdFreeCancellation } from "react-icons/md";
// import { GiCometSpark } from "react-icons/gi";
// import { FaCar } from "react-icons/fa";
// import { BsInfoCircle } from "react-icons/bs";
// import {
//   Dialog,
//   DialogContent,
//   Typography,
//   TextField,
//   Button,
//   Alert,
//   Stack,
// } from "@mui/material";
// import Snackbar from "@mui/material/Snackbar";
// // import CloseIcon from "@mui/icons-material/Close";
// import Header from "../../components/Nav";
// import Footer from "../../components/Footer";

// const RideConfirmation = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [openVerificationModal, setOpenVerificationModal] = useState(false);
//   const [openAlert, setOpenAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");
//   const [alertType, setAlertType] = useState("success");
//   // Phone Verification States
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [showOtpInput, setShowOtpInput] = useState(false);
//   const [isVerified, setIsVerified] = useState(false);
//   const [error, setError] = useState("");
//   const [generatedOtp, setGeneratedOtp] = useState("");
//   const token = localStorage.getItem("token");
//   const handleClose = () => {
//     setOpenModal(false);
//   };

//   const handleVerificationClose = () => {
//     setOpenVerificationModal(false);
//     setPhoneNumber("");
//     setOtp("");
//     setShowOtpInput(false);
//     setIsVerified(false);
//     setError("");
//     setGeneratedOtp("");
//   };

//   const handleGetOtp = () => {
//     if (!phoneNumber) {
//       setAlertMessage("Please enter phone number");
//       setAlertType("error");
//       setOpenAlert(true);
//       return;
//     }

//     if (phoneNumber.length !== 10) {
//       setAlertMessage("Enter valid 10-digit phone number");
//       setAlertType("error");
//       setOpenAlert(true);
//       return;
//     }

//     const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
//     setGeneratedOtp(randomOtp);
//     setShowOtpInput(true);

//     console.log("Generated OTP:", randomOtp);
//     alert(`Your OTP is: ${randomOtp}`);
//   };

//   const handleVerifyOtp = () => {
//     if (!otp) {

//       setAlertMessage("Please enter the OTP");
//       setAlertType("error");
//       setOpenAlert(true);
//       return;
//     }

//     if (otp === generatedOtp) {
//       setAlertMessage("Number verification has been completed successfully.");
//       setAlertType("success");
//       setOpenAlert(true);

//       handleVerificationClose(); // ✅ close immediately
//     } else {
//       setAlertMessage("Invalid OTP. Please try again.");
//       setAlertType("error");
//       setOpenAlert(true);
//     }
//   };

//   const handlePhoneChange = (e) => {
//     const value = e.target.value.replace(/\D/g, ""); // Only numbers
//     if (value.length <= 10) {
//       setPhoneNumber(value);
//       setError("");
//     }
//   };

//   const handleOtpChange = (e) => {
//     const value = e.target.value.replace(/\D/g, ""); // Only numbers
//     if (value.length <= 6) {
//       setOtp(value);
//       setError("");
//     }
//   };

//   const modalStyle = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: { xs: "90%", sm: 450 },
//     bgcolor: "background.paper",
//     borderRadius: 2,
//     boxShadow: 24,
//     p: 4,
//   };

//   return (
//     <>
//       <Snackbar
//         open={openAlert}
//         autoHideDuration={5000}
//         onClose={() => setOpenAlert(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//         sx={{ zIndex: 9999 }} // ✅ IMPORTANT
//       >
//         <Alert
//           severity={alertType}
//           variant="filled"
//           onClose={() => setOpenAlert(false)}
//           sx={{ width: "100%" }}
//         >
//           {alertMessage}
//         </Alert>
//       </Snackbar>
//       {/* Price Details Modal */}
//       <Dialog
//         open={openModal}
//         onClose={handleClose}
//         PaperProps={{
//           className: "ride-price-modal",
//         }}
//       >
//         <DialogContent className="ride-price-content">
//           <h2 className="ride-price-title">Price details</h2>

//           <div className="ride-price-list">
//             <div className="ride-price-row">
//               <span>Co-traveller</span>
//               <span>₹300.00</span>
//             </div>

//             <div className="ride-price-row">
//               <span>Co-traveller</span>
//               <span>₹300.00</span>
//             </div>
//           </div>

//           <div className="ride-price-divider"></div>

//           <div className="ride-price-total">
//             <span>Total price</span>
//             <span className="ride-price-amount">₹600.00</span>
//           </div>
//         </DialogContent>
//       </Dialog>

//       <Header />
//       <div className="ride-confirm-page">
//         <div className="ride-confirm-container">
//           {/* Main Content */}
//           <div className="ride-confirm-main">
//             {/* Header */}
//             <h1 className="ride-confirm-title">Ride details</h1>

//             {/* Trip Timeline Card */}
//             <div className="ride-confirm-card ride-timeline-card">
//               <h3 className="summary-date">Wednesday, 15 April</h3>
//               <div className="timeline-route">
//                 <div className="timeline-stop">
//                   <div className="timeline-marker">
//                     <IoLocationOutline />
//                     <div className="timeline-line"></div>
//                   </div>
//                   <div className="timeline-content">
//                     <div className="timeline-time">11:00</div>
//                     <div className="timeline-duration">3h10</div>
//                     <div className="timeline-location">
//                       <h3 className="location-city">Mumbai</h3>
//                       <p className="location-address">
//                         Terminal 2, International APT, Metro Stn, Navpada,
//                         Marol, Andheri(E), Maharashtra
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="timeline-stop">
//                   <div className="timeline-marker">
//                     <FaLocationDot />
//                   </div>
//                   <div className="timeline-content">
//                     <div className="timeline-time">14:10</div>
//                     <div className="timeline-location">
//                       <h3 className="location-city">Pune</h3>
//                       <p className="location-address">
//                         FR6C+9WF, Navale Brg, Kudale Baug, Vadgaon Budruk,
//                         Maharashtra
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Driver Card */}
//             <div className="ride-confirm-card ride-driver-card">
//               <div className="driver-all-details">
//                 <div className="driver-info">
//                   <img
//                     src="https://i.pravatar.cc/150?img=33"
//                     alt="Suraj"
//                     className="driver-avatar"
//                    loading="lazy"
//                   />
//                   <span className="driver-name">Suraj</span>
//                 </div>
//                 <button className="driver-arrow">
//                   <FaAngleRight />
//                 </button>
//               </div>
//               <hr />
//               <div className=" ride-details-card">
//                 <div className="detail-item">
//                   <div className="detail-icon">
//                     <MdFreeCancellation />
//                   </div>
//                   <span className="detail-text">Sometimes cancels rides</span>
//                 </div>

//                 <div className="detail-item">
//                   <div className="detail-icon">
//                     <GiCometSpark />
//                   </div>
//                   <span className="detail-text">
//                     Your booking will be confirmed instantly
//                   </span>
//                 </div>

//                 <div className="detail-item">
//                   <div className="detail-icon">
//                     <FaCar />
//                   </div>
//                   <span className="detail-text">
//                     <b>MARUTI SWIFT DZIRE</b> - white
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Passengers Card */}
//             <div className="ride-confirm-card ride-passengers-card">
//               <h2 className="passengers-title">Passengers</h2>
//               <div className="passenger-item">
//                 <div className="passenger-info">
//                   <img
//                     src="https://i.pravatar.cc/150?img=12"
//                     alt="Deepak"
//                     className="passenger-avatar"
//                    loading="lazy"
//                   />
//                   <div className="passenger-details">
//                     <span className="passenger-name">Deepak</span>
//                     <span className="passenger-route">Mumbai → Pune</span>
//                   </div>
//                 </div>
//                 <button className="passenger-arrow">
//                   <FaAngleRight />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="ride-confirm-sidebar">
//             {/* Status Badge */}
//             <div className="ride-status-badge">
//               <BsInfoCircle />
//               <span>This ride has already departed</span>
//             </div>

//             {/* Trip Summary Card */}
//             <div className="ride-confirm-card ride-summary-card">
//               <div className="summary-timeline">
//                 Book safe, affordable rides with verified drivers, real-time
//                 tracking, instant confirmation, flexible cancellation, and
//                 comfort. Tap the button below to book now.
//               </div>
//               <div className="driver-infos">
//                 <div className="summary-driver">
//                   <img
//                     src="https://i.pravatar.cc/150?img=33"
//                     alt="Suraj"
//                     className="summary-driver-avatar"
//                    loading="lazy"
//                   />
//                   <span className="summary-driver-name">
//                     Suraj <i className="role-info">(Driver)</i>
//                   </span>
//                 </div>
//                 <p className="driver-detl">
//                   Skilled and reliable driver dedicated to providing safe,
//                   comfortable, and on-time rides with a professional attitude.
//                 </p>
//               </div>

//               <div className="book-rides-now">
//                 <div className="summary-pricing">
//                   <span className="summary-passengers">2 passengers</span>
//                   <div className="summary-price">
//                     <span className="price-currency">₹</span>
//                     <span className="price-amount">600.00</span>
//                   </div>
//                   <button
//                     className="summary-arrow"
//                     onClick={() => setOpenModal(true)}
//                   >
//                     <FaAngleRight />
//                   </button>
//                 </div>
//                 {token ? (
//                   <button
//                     className="btn register-btn"
//                     onClick={() => setOpenVerificationModal(true)}
//                   >
//                     Request to Book
//                   </button>
//                 ) : (
//                   <button
//                     className="btn register-btn"
//                     onClick={() => setOpenVerificationModal(true)}
//                   >
//                     Book
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default RideConfirmation;
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Nav";
import Footer from "../../components/Footer";
import { IoLocationOutline } from "react-icons/io5";
import { FaLocationDot, FaAngleRight } from "react-icons/fa6";
import { MdFreeCancellation } from "react-icons/md";
import { GiCometSpark } from "react-icons/gi";
import { FaCar } from "react-icons/fa";
import { BsInfoCircle, BsShieldCheck } from "react-icons/bs";
import { FaUserGroup, FaPhone, FaEnvelope } from "react-icons/fa6";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaSmoking } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  Chip,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

// ── Helpers ───────────────────────────────────────────────────────────────────
const formatTime = (t) => (t ? t.slice(0, 5) : "--:--");

const secondsToHM = (secs) => {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  return h > 0 ? `${h}h${m > 0 ? m + "m" : ""}` : `${m}m`;
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const metersToKm = (m) => (m ? `${(m / 1000).toFixed(1)} km` : "");

const AVATAR_COLORS = [
  ["#dbeafe", "#1e40af"],
  ["#dcfce7", "#166534"],
  ["#fef3c7", "#92400e"],
  ["#fce7f3", "#9d174d"],
  ["#ede9fe", "#5b21b6"],
];
const avatarColor = (name) =>
  AVATAR_COLORS[(name || "A").charCodeAt(0) % AVATAR_COLORS.length];

const getInitials = (name) => {
  if (!name) return "??";
  const parts = name.trim().split(" ");
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : parts[0].slice(0, 2).toUpperCase();
};

// ── Avatar Component ──────────────────────────────────────────────────────────
function Avatar({ src, name, className, style = {} }) {
  const [bg, text] = avatarColor(name);
  if (src)
    return (
      <img
        src={src}
        alt={name}
        className={className}
        loading="lazy"
        style={style}
      />
    );
  return (
    <div
      className={className}
      style={{
        background: bg,
        color: text,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: "16px",
        ...style,
      }}
    >
      {getInitials(name)}
    </div>
  );
}

// ── Driver Detail Modal ───────────────────────────────────────────────────────
function DriverModal({ open, onClose, ride }) {
  if (!ride) return null;
  const [bg, text] = avatarColor(ride.driver_name);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ style: { borderRadius: 16, minWidth: 340, maxWidth: 420 } }}
    >
      <DialogContent style={{ padding: "28px 24px" }}>
        {/* Driver header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          <Avatar
            src={ride.driver_profile_picture}
            name={ride.driver_name}
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
          <div>
            <Typography
              variant="h6"
              fontWeight={700}
              style={{ textTransform: "capitalize" }}
            >
              {ride.driver_name}
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "4px",
              }}
            >
              {ride.driver_is_verified === "1" ? (
                <Chip
                  icon={<BsShieldCheck />}
                  label="Verified Driver"
                  size="small"
                  color="success"
                />
              ) : (
                <Chip label="Not Verified" size="small" color="default" />
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #f0f0f0",
            paddingTop: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* Contact */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "14px",
            }}
          >
            <FaPhone style={{ color: "#0033a1", flexShrink: 0 }} />
            <span>{ride.driver_phone}</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "14px",
            }}
          >
            <FaEnvelope style={{ color: "#0033a1", flexShrink: 0 }} />
            <span>{ride.driver_email}</span>
          </div>

          {/* Vehicle */}
          <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "12px" }}>
            <Typography variant="subtitle2" fontWeight={700} mb={1}>
              Vehicle Details
            </Typography>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
                fontSize: "13px",
              }}
            >
              {[
                ["Type", ride.vehicle_type],
                ["Brand", ride.brand],
                ["Model", ride.model],
                ["Year", ride.manufacture_year],
                ["Fuel", ride.fuel_type],
                ["Reg. No.", ride.registration_number],
              ].map(([label, value]) => (
                <div key={label}>
                  <div
                    style={{
                      color: "#888",
                      fontSize: "11px",
                      marginBottom: "2px",
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ fontWeight: 600, textTransform: "capitalize" }}>
                    {value || "—"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ride preferences */}
          <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "12px" }}>
            <Typography variant="subtitle2" fontWeight={700} mb={1}>
              Ride Preferences
            </Typography>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {ride.instant_booking === "yes" && (
                <Chip
                  label="⚡ Instant Booking"
                  size="small"
                  style={{ background: "#ede9fe", color: "#5b21b6" }}
                />
              )}
              {ride.max_two_in_back === "yes" && (
                <Chip label="👥 Max 2 in back" size="small" />
              )}
              {ride.smoking_allowed === "yes" && (
                <Chip label="🚬 Smoking OK" size="small" />
              )}
              {ride.pet_allowed === "yes" && (
                <Chip label="🐾 Pets OK" size="small" />
              )}
            </div>
          </div>
        </div>

        <Button
          fullWidth
          variant="outlined"
          onClick={onClose}
          sx={{
            mt: 2,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}

// ── RideConfirmation ──────────────────────────────────────────────────────────
const RideConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const ride = state?.ride || null;
  console.log("ride",ride);
  
  const fetchError = !ride
    ? "Ride data not found. Please go back and select a ride."
    : "";

  // Modals
  const [openPriceModal, setOpenPriceModal] = useState(false);
  const [openOtpModal, setOpenOtpModal] = useState(false);
  const [openDriverModal, setOpenDriverModal] = useState(false);

  // OTP
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // Snackbar
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const showAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setOpenAlert(true);
  };

  // OTP handlers
  const handleOpenOtpModal = () => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    setOtp("");
    setIsVerified(false);
    setOpenOtpModal(true);
    console.log("OTP:", randomOtp);
    alert(`Your OTP is: ${randomOtp}`);
  };

  const handleCloseOtpModal = () => {
    setOpenOtpModal(false);
    setOtp("");
    setIsVerified(false);
    setGeneratedOtp("");
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      showAlert("error", "Please enter the OTP.");
      return;
    }
    if (otp === generatedOtp) {
      setIsVerified(true);
      showAlert("success", "OTP verified! Your booking request has been sent.");
      setTimeout(() => handleCloseOtpModal(), 1500);
    } else {
      showAlert("error", "Invalid OTP. Please try again.");
    }
  };

  // Derived
  const pricePerSeat = ride ? Number(ride.price_per_seat).toFixed(2) : "0.00";
  const isRidePassed = ride
    ? new Date(`${ride.ride_date}T${ride.departure_time}`) < new Date()
    : false;

  return (
    <>
      <Snackbar
        open={openAlert}
        autoHideDuration={5000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ zIndex: 9999 }}
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

      {/* Driver Detail Modal */}
      <DriverModal
        open={openDriverModal}
        onClose={() => setOpenDriverModal(false)}
        ride={ride}
      />

      {/* Price Details Modal */}
      <Dialog
        open={openPriceModal}
        onClose={() => setOpenPriceModal(false)}
        PaperProps={{ className: "ride-price-modal" }}
      >
        <DialogContent className="ride-price-content">
          <h2 className="ride-price-title">Price details</h2>
          <div className="ride-price-list">
            <div className="ride-price-row">
              <span>Price per seat</span>
              <span>₹{pricePerSeat}</span>
            </div>
            <div className="ride-price-row">
              <span>Available seats</span>
              <span>{ride?.available_seats ?? "--"}</span>
            </div>
            <div className="ride-price-row">
              <span>Distance</span>
              <span>{metersToKm(ride?.distance_meters)}</span>
            </div>
          </div>
          <div className="ride-price-divider" />
          <div className="ride-price-total">
            <span>Total price</span>
            <span className="ride-price-amount">₹{pricePerSeat}</span>
          </div>
        </DialogContent>
      </Dialog>

      {/* OTP Modal */}
      <Dialog
        open={openOtpModal}
        onClose={handleCloseOtpModal}
        PaperProps={{
          style: { borderRadius: 12, padding: "8px", minWidth: 360 },
        }}
      >
        <DialogContent>
          <Typography variant="h6" fontWeight={700} mb={1}>
            Confirm Booking
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Enter the OTP sent to your registered mobile number to confirm this
            booking.
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Enter OTP"
              variant="outlined"
              fullWidth
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              inputProps={{ maxLength: 6, inputMode: "numeric" }}
              placeholder="6-digit OTP"
              disabled={isVerified}
            />
            {isVerified ? (
              <Alert severity="success">Booking confirmed! ✓</Alert>
            ) : (
              <Button
                variant="contained"
                fullWidth
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6}
                sx={{
                  backgroundColor: "#0033a1",
                  "&:hover": { backgroundColor: "#002280" },
                  borderRadius: 2,
                  py: 1.2,
                  fontWeight: 700,
                }}
              >
                Verify &amp; Confirm Booking
              </Button>
            )}
            <Button
              variant="text"
              size="small"
              onClick={handleCloseOtpModal}
              sx={{ color: "text.secondary" }}
            >
              Cancel
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <Header />

      <div className="ride-confirm-page">
        {/* Error state */}
        {fetchError && (
          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
              color: "#e53e3e",
            }}
          >
            <p style={{ marginBottom: "16px", fontSize: "16px" }}>
              {fetchError}
            </p>
            <button className="btn register-btn" onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>
        )}

        {!fetchError && (
          <div className="ride-confirm-container">
            {/* ── Main Content ── */}
            <div className="ride-confirm-main">
              <h1 className="ride-confirm-title">Ride details</h1>

              {/* Trip Timeline Card */}
              <div className="ride-confirm-card ride-timeline-card">
                <h3 className="summary-date">{formatDate(ride?.ride_date)}</h3>
                <div className="timeline-route">
                  <div className="timeline-stop">
                    <div className="timeline-marker">
                      <IoLocationOutline />
                      <div className="timeline-line" />
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-time">
                        {formatTime(ride?.departure_time)}
                      </div>
                      <div className="timeline-duration">
                        {secondsToHM(ride?.duration_seconds)}
                      </div>
                      <div className="timeline-location">
                        <h3 className="location-city">
                          {ride?.source_address?.split(",")[0]}
                        </h3>
                        <p className="location-address">
                          {ride?.source_address}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="timeline-stop">
                    <div className="timeline-marker">
                      <FaLocationDot />
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-time">
                        {formatTime(ride?.estimated_reach_time)}
                      </div>
                      <div className="timeline-location">
                        <h3 className="location-city">
                          {ride?.destination_address?.split(",")[0]}
                        </h3>
                        <p className="location-address">
                          {ride?.destination_address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Driver Card — clicking > opens driver modal */}
              <div className="ride-confirm-card ride-driver-card">
                <div className="driver-all-details">
                  <div className="driver-info">
                    <Avatar
                      src={ride?.driver_profile_picture}
                      name={ride?.driver_name}
                      className="driver-avatar"
                      style={{ objectFit: "cover" }}
                    />
                    <span
                      className="driver-name"
                      style={{ textTransform: "capitalize" }}
                    >
                      {ride?.driver_name}
                    </span>
                  </div>
                  <button
                    className="driver-arrow"
                    onClick={() => setOpenDriverModal(true)}
                  >
                    <FaAngleRight />
                  </button>
                </div>
                <hr />
                <div className="ride-details-card">
                  <div className="detail-item">
                    <div className="detail-icon">
                      <MdFreeCancellation />
                    </div>
                    <span className="detail-text">
                      {ride?.instant_booking === "yes"
                        ? "Instant booking confirmed"
                        : "Sometimes cancels rides"}
                    </span>
                  </div>
                  {ride?.instant_booking === "yes" && (
                    <div className="detail-item">
                      <div className="detail-icon">
                        <GiCometSpark />
                      </div>
                      <span className="detail-text">
                        Your booking will be confirmed instantly
                      </span>
                    </div>
                  )}
                  <div className="detail-item">
                    <div className="detail-icon">
                      <FaCar />
                    </div>
                    <span className="detail-text">
                      <b style={{ textTransform: "capitalize" }}>
                        {ride?.brand} {ride?.model}
                      </b>{" "}
                      · {ride?.fuel_type} · {ride?.registration_number}
                    </span>
                  </div>
                  {ride?.max_two_in_back === "yes" && (
                    <div className="detail-item">
                      <div className="detail-icon">
                        <FaUserGroup />
                      </div>
                      <span className="detail-text">
                        Max. 2 passengers in the back
                      </span>
                    </div>
                  )}
                  {ride?.smoking_allowed === "yes" && (
                    <div className="detail-item">
                      <div className="detail-icon">
                        <FaSmoking />
                      </div>
                      <span className="detail-text">Smoking allowed</span>
                    </div>
                  )}
                  {ride?.pet_allowed === "yes" && (
                    <div className="detail-item">
                      <div className="detail-icon">
                        <IoFastFoodSharp />
                      </div>
                      <span className="detail-text">Pets allowed</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Passengers Card */}
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
                  <button className="passenger-arrow">
                    <FaAngleRight />
                  </button>
                </div>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="ride-confirm-sidebar">
              {isRidePassed && (
                <div className="ride-status-badge">
                  <BsInfoCircle />
                  <span>This ride has already departed</span>
                </div>
              )}

              <div className="ride-confirm-card ride-summary-card">
                <div className="summary-timeline">
                  Book safe, affordable rides with verified drivers, real-time
                  tracking, instant confirmation, flexible cancellation, and
                  comfort. Tap the button below to book now.
                </div>

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
                      {ride?.driver_name} <i className="role-info">(Driver)</i>
                    </span>
                  </div>
                  <p className="driver-detl">
                    {ride?.vehicle_type} · {ride?.brand} {ride?.model} (
                    {ride?.manufacture_year}) · {ride?.total_seats} seats ·{" "}
                    {ride?.available_seats} available
                  </p>
                </div>

                <div className="book-rides-now">
                  <div className="summary-pricing">
                    <span className="summary-passengers">
                      {ride?.available_seats} seat
                      {ride?.available_seats !== 1 ? "s" : ""} left
                    </span>
                    <div className="summary-price">
                      <span className="price-currency">₹</span>
                      <span className="price-amount">{pricePerSeat}</span>
                    </div>
                    <button
                      className="summary-arrow"
                      onClick={() => setOpenPriceModal(true)}
                    >
                      <FaAngleRight />
                    </button>
                  </div>

                  {!isRidePassed &&
                    (token ? (
                      <button
                        className="btn register-btn"
                        onClick={handleOpenOtpModal}
                      >
                        Request to Book
                      </button>
                    ) : (
                      <button
                        className="btn register-btn"
                        onClick={() => navigate("/login")}
                      >
                        Log in to Book
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default RideConfirmation;
