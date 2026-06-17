// src/pages/Rides/find-ride/ride-booking/hooks/useBooking.js

import { useState } from "react";
import axios from "axios";
import { bookRideApi } from "../../../../utils/api";
export function useBooking() {
  // ── Modal visibility ──────────────────────────────────────────────────
  const [openPriceModal, setOpenPriceModal] = useState(false);
  const [openDriverModal, setOpenDriverModal] = useState(false);

  // ── Booking loading ───────────────────────────────────────────────────
  const [bookingLoading, setBookingLoading] = useState(false);

  // ── Snackbar ──────────────────────────────────────────────────────────
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const showAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setOpenAlert(true);
  };

  // ── Book ride handler ─────────────────────────────────────────────────
  const handleBookRide = async ({ ride, noOfSIt, navigate }) => {
    setBookingLoading(true);
    try {
      const token = localStorage.getItem("token");
      const payload = {
        ride_id: ride.id,
        seats: noOfSIt,
      };
      console.log(ride);

      const response = await bookRideApi(payload);
      console.log("response", response);
      console.log("response-ststua", response.status);
      console.log("response-data", response.data);

      if (response.data?.status === "success") {
        navigate("/booking-payment", {
          state: { ride, noOfSIt, booking: response.data },
        });
      } else {
        showAlert(
          "error",
          response.data?.message || "Booking failed. Please try again.",
        );
      }
    } catch (err) {
      console.error("Booking error:", err);
      const message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      showAlert("error", message);
    } finally {
      setBookingLoading(false);
    }
  };

  // const handleBookRide = async ({ ride, noOfSIt, navigate }) => {
  //   navigate("/booking-payment", {
  //     state: { ride, noOfSIt},
  //   });
  // };
  return {
    // modals
    openPriceModal,
    setOpenPriceModal,
    openDriverModal,
    setOpenDriverModal,
    // booking
    bookingLoading,
    handleBookRide,
    // snackbar
    openAlert,
    setOpenAlert,
    alertMessage,
    alertType,
    showAlert,
  };
}
