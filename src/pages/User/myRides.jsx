import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Chip,
} from "@mui/material";
import { ImArrowRight } from "react-icons/im";
import { ImInfo } from "react-icons/im";
// import CloseIcon from "@mui/icons-material/Close";
import { IoLocationOutline } from "react-icons/io5";
import { FaCar, FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";
import Header from "../../components/Nav";
import Footer from "../../components/Footer";
import { FaLocationDot } from "react-icons/fa6";
const MyRides = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedRide, setSelectedRide] = useState(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  // Sample data
  const upcomingRides = [
    {
      id: 1,

      from: "Mumbai",
      to: "Pune",
      date: "April 25, 2026",
      time: "11:00 AM",
      duration: "3h 10m",
      fromAddress:
        "Terminal 2, International APT, Metro Stn, Navpada, Marol, Andheri(E)",
      toAddress:
        "FR6C+9WF, Navale Brg, Kudale Baug, Vadgaon Budruk, Maharashtra",
      driver: {
        name: "Suraj Kumar",
        avatar: "https://i.pravatar.cc/150?img=33",
        rating: 4.8,
        car: "Maruti Swift Dzire - White",
        phone: "+91 9876543210",
      },
      price: 600,
      passengers: 2,
      status: "confirmed",
    },
    {
      id: 2,

      from: "Delhi",
      to: "Agra",
      date: "April 28, 2026",
      time: "06:00 AM",
      duration: "4h 30m",
      fromAddress: "Connaught Place, New Delhi",
      toAddress: "Taj Mahal Road, Agra",
      passengers: 3,
      price: 450,
      status: "confirmed",
      bookedSeats: [
        {
          name: "Rahul Singh",
          avatar: "https://i.pravatar.cc/150?img=12",
          phone: "+91 9876543211",
        },
        {
          name: "Priya Sharma",
          avatar: "https://i.pravatar.cc/150?img=45",
          phone: "+91 9876543212",
        },
      ],
    },
    {
      id: 3,

      from: "Bangalore",
      to: "Mysore",
      date: "May 2, 2026",
      time: "09:30 AM",
      duration: "2h 45m",
      fromAddress: "MG Road, Bangalore",
      toAddress: "Mysore Palace Road",
      driver: {
        name: "Amit Patel",
        avatar: "https://i.pravatar.cc/150?img=68",
        rating: 4.9,
        car: "Honda City - Silver",
        phone: "+91 9876543213",
      },
      price: 350,
      passengers: 1,
      status: "confirmed",
    },
  ];

  const completedRides = [
    {
      id: 4,

      from: "Chennai",
      to: "Pondicherry",
      date: "April 10, 2026",
      time: "02:00 PM",
      duration: "3h 00m",
      fromAddress: "Chennai Central Railway Station",
      toAddress: "Beach Road, Pondicherry",
      driver: {
        name: "Vijay Kumar",
        avatar: "https://i.pravatar.cc/150?img=56",
        rating: 4.7,
        car: "Hyundai Creta - Red",
        phone: "+91 9876543214",
      },
      price: 500,
      passengers: 2,
      status: "completed",
    },
    {
      id: 5,

      from: "Kolkata",
      to: "Darjeeling",
      date: "March 20, 2026",
      time: "05:00 AM",
      duration: "12h 00m",
      fromAddress: "Howrah Station, Kolkata",
      toAddress: "Mall Road, Darjeeling",
      passengers: 4,
      price: 1200,
      status: "completed",
      bookedSeats: [
        {
          name: "Sneha Das",
          avatar: "https://i.pravatar.cc/150?img=23",
          phone: "+91 9876543215",
        },
        {
          name: "Arjun Roy",
          avatar: "https://i.pravatar.cc/150?img=67",
          phone: "+91 9876543216",
        },
        {
          name: "Meera Sen",
          avatar: "https://i.pravatar.cc/150?img=89",
          phone: "+91 9876543217",
        },
      ],
    },
  ];

  const cancelledRides = [
    {
      id: 6,

      from: "Hyderabad",
      to: "Vijayawada",
      date: "April 5, 2026",
      time: "08:00 AM",
      duration: "5h 30m",
      fromAddress: "HITEC City, Hyderabad",
      toAddress: "MG Road, Vijayawada",
      driver: {
        name: "Rajesh Reddy",
        avatar: "https://i.pravatar.cc/150?img=15",
        rating: 4.5,
        car: "Toyota Innova - White",
        phone: "+91 9876543218",
      },
      price: 700,
      passengers: 1,
      status: "cancelled",
      cancelledBy: "You",
      cancelReason: "Change of plans",
    },
  ];

  const getRidesData = () => {
    switch (activeTab) {
      case "upcoming":
        return upcomingRides;
      case "completed":
        return completedRides;
      case "cancelled":
        return cancelledRides;
      default:
        return upcomingRides;
    }
  };

  const handleViewDetails = (ride) => {
    setSelectedRide(ride);
    setOpenDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setOpenDetailsModal(false);
    setSelectedRide(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "#008257";
      case "pending":
        return "#f59e0b";
      case "completed":
        return "#3b82f6";
      case "cancelled":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  return (
    <>
      <Header />
      <div className="myride-page">
        <div className="myride-container">
          {/* Page Header */}
          <div className="myride-header">
            <h1 className="myride-title">My Rides</h1>
            <p className="myride-subtitle">Manage your carpooling journeys</p>
          </div>

          {/* Tabs */}
          <div className="myride-tabs">
            <button
              className={`myride-tab ${activeTab === "upcoming" ? "active" : ""}`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming ({upcomingRides.length})
            </button>
            <button
              className={`myride-tab ${activeTab === "completed" ? "active" : ""}`}
              onClick={() => setActiveTab("completed")}
            >
              Completed ({completedRides.length})
            </button>
            <button
              className={`myride-tab ${activeTab === "cancelled" ? "active" : ""}`}
              onClick={() => setActiveTab("cancelled")}
            >
              Cancelled ({cancelledRides.length})
            </button>
          </div>

          {/* Rides Grid */}
          <div className="myride-grid">
            {getRidesData().length === 0 ? (
              <div className="myride-empty">
                <div className="empty-icon">🚗</div>
                <h3>No rides found</h3>
                <p>You don't have any {activeTab} rides yet.</p>
              </div>
            ) : (
              getRidesData().map((ride) => (
                <div key={ride.id} className="myride-card">
                  <div className="myride-card-header">
                    <Chip
                      label={ride.status}
                      size="small"
                      sx={{
                        backgroundColor: getStatusColor(ride.status),
                        color: "white",
                        fontWeight: 600,
                        letterSpacing: ".05rem",
                        textTransform: "capitalize",
                        fontSize: "0.75rem",
                      }}
                    />
                  </div>

                  <div className="myride-route-simple">
                    <div className="route-simple-item">
                      <span className="route-label">From:</span>
                      <span className="route-value">{ride.from}</span>
                    </div>
                    <div className="route-arrow">
                      <ImArrowRight />
                    </div>
                    <div className="route-simple-item ">
                      <span className="route-label">To:</span>
                      <span className="route-value">{ride.to}</span>
                    </div>
                  </div>

                  <div className="myride-card-info">
                    <div className="info-row">
                      <span className="info-label">Date:</span>
                      <span className="info-value">{ride.date}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Time:</span>
                      <span className="info-value">{ride.time}</span>
                    </div>
                  </div>

                  <div className="myride-card-footer">
                    <div className="myride-price">
                      <span className="price-label">Price:</span>
                      <span className="price-value">₹{ride.price}</span>
                    </div>
                    <button
                      className=" myride-details-btn"
                      onClick={() => handleViewDetails(ride)}
                    >
                      View Details <ImInfo />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Details Modal */}
        <Dialog
          open={openDetailsModal}
          onClose={handleCloseDetails}
          maxWidth="md"
          fullWidth
          PaperProps={{
            className: "myride-details-modal",
          }}
        >
          <DialogTitle className="myride-modal-title">
            Ride Details
            {/* <IconButton
              onClick={handleCloseDetails}
              className="myride-modal-close"
            >
              <CloseIcon />
            </IconButton> */}
          </DialogTitle>
          <DialogContent className="myride-modal-content">
            {selectedRide && (
              <>
                {/* Status Badges */}
                <div className="myride-modal-badges">
                  <Chip
                    label={selectedRide.status}
                    sx={{
                      backgroundColor: getStatusColor(selectedRide.status),
                      color: "white",
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  />
                </div>

                {/* Route with Stepper */}
                <div className="myride-modal-route">
                  <h3 className="section-title">Journey Details</h3>
                  <div className="route-stepper">
                    <div className="route-step">
                      <div className="step-marker">
                        <IoLocationOutline className="step-icon start" />
                        <div className="step-line"></div>
                      </div>
                      <div className="step-content">
                        <h4 className="step-city">{selectedRide.from}</h4>
                        <p className="step-address">
                          {selectedRide.fromAddress}
                        </p>
                        <span className="step-time">{selectedRide.time}</span>
                      </div>
                    </div>

                    <div className="route-step">
                      <div className="step-marker">
                        <FaLocationDot className="step-icon end" />
                      </div>
                      <div className="step-content">
                        <h4 className="step-city">{selectedRide.to}</h4>
                        <p className="step-address">{selectedRide.toAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trip Information */}
                <div className="myride-modal-info">
                  <h3 className="section-title">Trip Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <FaCalendarAlt className="item-icon" />
                      <div>
                        <span className="item-label">Date</span>
                        <span className="item-value">{selectedRide.date}</span>
                      </div>
                    </div>
                    <div className="info-item">
                      <FaClock className="item-icon" />
                      <div>
                        <span className="item-label">Duration</span>
                        <span className="item-value">
                          {selectedRide.duration}
                        </span>
                      </div>
                    </div>
                    <div className="info-item">
                      <FaUser className="item-icon" />
                      <div>
                        <span className="item-label">Passengers</span>
                        <span className="item-value">
                          {selectedRide.passengers} seats
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Driver Info (for passenger) */}
                {selectedRide.type === "passenger" && selectedRide.driver && (
                  <div className="myride-modal-driver">
                    <h3 className="section-title">Driver Information</h3>
                    <div className="driver-card">
                      <img
                        src={selectedRide.driver.avatar}
                        alt={selectedRide.driver.name}
                        className="driver-avatar"
                        loading="eager"
                      />
                      <div className="driver-details">
                        <h4 className="driver-name">
                          {selectedRide.driver.name}
                        </h4>
                        <div className="driver-meta">
                          <span className="driver-rating">
                            ⭐ {selectedRide.driver.rating}
                          </span>
                          <span className="driver-phone">
                            {selectedRide.driver.phone}
                          </span>
                        </div>
                        <div className="driver-car">
                          <FaCar className="car-icon" />
                          <span>{selectedRide.driver.car}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Passengers Info (for driver) */}
                {selectedRide.type === "driver" && selectedRide.bookedSeats && (
                  <div className="myride-modal-passengers">
                    <h3 className="section-title">Booked Passengers</h3>
                    <div className="passengers-grid">
                      {selectedRide.bookedSeats.map((passenger, index) => (
                        <div key={index} className="passenger-card">
                          <img
                            src={passenger.avatar}
                            alt={passenger.name}
                            className="passenger-avatar"
                            loading="eager"
                          />
                          <div className="passenger-details">
                            <h4 className="passenger-name">{passenger.name}</h4>
                            <span className="passenger-phone">
                              {passenger.phone}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cancel Info */}
                {selectedRide.status === "cancelled" && (
                  <div className="myride-modal-cancel">
                    <h3 className="section-title">Cancellation Details</h3>
                    <div className="cancel-info">
                      <p>
                        <strong>Cancelled by:</strong>{" "}
                        {selectedRide.cancelledBy}
                      </p>
                      {selectedRide.cancelReason && (
                        <p>
                          <strong>Reason:</strong> {selectedRide.cancelReason}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Price */}
                <div className="myride-modal-price">
                  <span className="modal-price-label">
                    {selectedRide.type === "driver"
                      ? "Total Earning"
                      : "Total Price"}
                  </span>
                  <span className="modal-price-value">
                    ₹{selectedRide.price}
                  </span>
                </div>

                {/* Actions */}
                {selectedRide.status === "upcoming" && (
                  <div className="myride-modal-actions">
                    <button className="action-btn cancel-btn">
                      Cancel Ride
                    </button>
                    <button className="action-btn contact-btn">
                      Contact{" "}
                      {selectedRide.type === "driver" ? "Passenger" : "Driver"}
                    </button>
                  </div>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </>
  );
};

export default MyRides;
