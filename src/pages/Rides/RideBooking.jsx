// src/pages/Rides/find-ride/RideBooking.jsx

import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

import { useBooking } from "./ride-booking/hooks/useBooking";
import { isRidePassed } from "./ride-booking/utils/bookingHelpers";

import DriverModal from "./ride-booking/components/DriverModal";
import PriceModal from "./ride-booking/components/PriceModal";
import TripTimeline from "./ride-booking/components/TripTimeline";
import DriverCard from "./ride-booking/components/DriverCard";
import PassengersCard from "./ride-booking/components/PassengersCard";
import BookingSidebar from "./ride-booking/components/BookingSidebar";

export default function RideBooking() {
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const ride = state?.ride ?? null;
  const noOfSIt = state?.noOfSIt ?? null;

  const {
    openPriceModal, setOpenPriceModal,
    openDriverModal, setOpenDriverModal,
    bookingLoading, handleBookRide,
    openAlert, setOpenAlert, alertMessage, alertType,
  } = useBooking();

  const pricePerSeat = ride ? Number(ride.price_per_seat).toFixed(2) : "0.00";
  const ridePassed = isRidePassed(ride?.ride_date, ride?.departure_time);

  // ── Error state ───────────────────────────────────────────────────────
  if (!ride) {
    return (
      <div style={{ padding: "60px 20px", textAlign: "center", color: "#e53e3e" }}>
        <p style={{ marginBottom: 16, fontSize: 16 }}>
          Ride data not found. Please go back and select a ride.
        </p>
        <button className="btn register-btn" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Global snackbar ── */}
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

      {/* ── Modals ── */}
      <DriverModal
        open={openDriverModal}
        onClose={() => setOpenDriverModal(false)}
        ride={ride}
      />
      <PriceModal
        open={openPriceModal}
        onClose={() => setOpenPriceModal(false)}
        ride={ride}
        pricePerSeat={pricePerSeat}
        noOfSIt={noOfSIt}
      />

      <div className="ride-confirm-page">
        <div className="ride-confirm-container">

          {/* ── Left: main content ── */}
          <div className="ride-confirm-main">
            <h1 className="ride-confirm-title">Ride details</h1>
            <TripTimeline ride={ride} />
            <DriverCard ride={ride} onDriverClick={() => setOpenDriverModal(true)} />
            <PassengersCard ride={ride} />
          </div>

          {/* ── Right: sidebar ── */}
          <BookingSidebar
            ride={ride}
            noOfSIt={noOfSIt}
            pricePerSeat={pricePerSeat}
            isRidePassed={ridePassed}
            token={token}
            bookingLoading={bookingLoading}
            onPriceClick={() => setOpenPriceModal(true)}
            onBookClick={() => handleBookRide({ ride, noOfSIt, navigate })}
            onLoginClick={() => navigate("/login", { state: { from: location } })}
          />

        </div>
      </div>
    </>
  );
}