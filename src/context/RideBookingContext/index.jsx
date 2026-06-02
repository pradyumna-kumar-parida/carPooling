
import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext();

const RideBookingProvider = ({ children }) => {
  const [bookingRide, setBookingRide] = useState({});

  return (
    <BookingContext.Provider
      value={{
        bookingRide,
        setBookingRide,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default RideBookingProvider;

export const useBookingRide = () => useContext(BookingContext);