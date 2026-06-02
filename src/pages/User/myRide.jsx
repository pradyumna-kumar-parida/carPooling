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
      <div className="myride-page">
        <div className="myride-container">
          {/* Page Header */}
          <div className="myride-header">
            <h1 className="vehicledetails-title">My Rides</h1>
            <p className="vehicledetails-subtitle">
              Manage your carpooling journeys
            </p>
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
                        loading="lazy"
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
                            loading="lazy"
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
    </>
  );
};

export default MyRides;

// import React, { useState } from "react";

// /* ─── Sample Data ─── */
// const upcomingRides = [
//   {
//     id: 1, from: "Mumbai", to: "Pune",
//     fromAddress: "Terminal 2, Chhatrapati Shivaji Int'l Airport",
//     toAddress: "Navale Bridge, Vadgaon Budruk, Pune",
//     date: "Apr 25, 2026", time: "11:00 AM", duration: "3h 10m",
//     driver: { name: "Suraj Kumar", initials: "SK", rating: 4.8, car: "Maruti Swift Dzire — White", phone: "+91 98765 43210" },
//     price: 600, seats: 2, totalSeats: 4, status: "confirmed",
//   },
//   {
//     id: 2, from: "Delhi", to: "Agra",
//     fromAddress: "Connaught Place, New Delhi",
//     toAddress: "Taj Mahal Road, Agra",
//     date: "Apr 28, 2026", time: "06:00 AM", duration: "4h 30m",
//     driver: { name: "Amit Verma", initials: "AV", rating: 4.6, car: "Hyundai Verna — Grey", phone: "+91 97654 32101" },
//     price: 450, seats: 1, totalSeats: 3, status: "confirmed",
//   },
//   {
//     id: 3, from: "Bangalore", to: "Mysore",
//     fromAddress: "MG Road Metro Station, Bangalore",
//     toAddress: "Mysore Palace Road, Mysore",
//     date: "May 2, 2026", time: "09:30 AM", duration: "2h 45m",
//     driver: { name: "Priya Nair", initials: "PN", rating: 4.9, car: "Honda City — Silver", phone: "+91 96543 21012" },
//     price: 350, seats: 1, totalSeats: 4, status: "confirmed",
//   },
// ];

// const completedRides = [
//   {
//     id: 4, from: "Chennai", to: "Pondicherry",
//     fromAddress: "Chennai Central Railway Station",
//     toAddress: "Beach Road, Pondicherry",
//     date: "Apr 10, 2026", time: "02:00 PM", duration: "3h 00m",
//     driver: { name: "Vijay Kumar", initials: "VK", rating: 4.7, car: "Hyundai Creta — Red", phone: "+91 95432 10123" },
//     price: 500, seats: 2, totalSeats: 4, status: "completed",
//   },
//   {
//     id: 5, from: "Kolkata", to: "Darjeeling",
//     fromAddress: "Howrah Station, Kolkata",
//     toAddress: "Mall Road, Darjeeling",
//     date: "Mar 20, 2026", time: "05:00 AM", duration: "12h 00m",
//     driver: { name: "Rahul Das", initials: "RD", rating: 4.5, car: "Toyota Innova — White", phone: "+91 94321 01234" },
//     price: 1200, seats: 3, totalSeats: 6, status: "completed",
//   },
// ];

// const cancelledRides = [
//   {
//     id: 6, from: "Hyderabad", to: "Vijayawada",
//     fromAddress: "HITEC City, Hyderabad",
//     toAddress: "MG Road, Vijayawada",
//     date: "Apr 5, 2026", time: "08:00 AM", duration: "5h 30m",
//     driver: { name: "Rajesh Reddy", initials: "RR", rating: 4.5, car: "Toyota Innova — White", phone: "+91 93210 12345" },
//     price: 700, seats: 1, totalSeats: 4, status: "cancelled",
//     cancelledBy: "You", cancelReason: "Change of plans",
//   },
// ];

// const TABS = [
//   { key: "upcoming",  label: "Upcoming",  emoji: "🗓️" },
//   { key: "completed", label: "Completed", emoji: "✅" },
//   { key: "cancelled", label: "Cancelled", emoji: "❌" },
// ];

// /* ─── Status pill helper ─── */
// const StatusPill = ({ status }) => (
//   <span className={`status-pill ${status}`}>
//     <span className={`status-dot ${status === "confirmed" || status === "upcoming" ? "pulse" : ""}`} />
//     {status === "confirmed" ? "Upcoming" : status.charAt(0).toUpperCase() + status.slice(1)}
//   </span>
// );

// /* ─── Seat bar ─── */
// const SeatBar = ({ booked, total }) => (
//   <div className="seat-bar">
//     {Array.from({ length: total }).map((_, i) => (
//       <div key={i} className={`seat-dot ${i < booked ? "filled" : "empty"}`} />
//     ))}
//   </div>
// );

// /* ─── Detail Modal ─── */
// const RideDetailModal = ({ ride, onClose }) => {
//   if (!ride) return null;
//   return (
//     <div className="rides-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
//       <div className="rides-modal">
//         <div className="modal-head">
//           <h2>Ride Details</h2>
//           <button className="modal-close" onClick={onClose}>✕</button>
//         </div>
//         <div className="modal-body">

//           {/* Route Banner */}
//           <div className="modal-route-banner">
//             <div className="modal-route-city">
//               <span className="city-label">From</span>
//               <div className="city-name">{ride.from}</div>
//               <span className="city-sub">{ride.fromAddress}</span>
//             </div>
//             <div className="modal-route-arrow">→</div>
//             <div className="modal-route-city" style={{ textAlign: "right" }}>
//               <span className="city-label">To</span>
//               <div className="city-name">{ride.to}</div>
//               <span className="city-sub">{ride.toAddress}</span>
//             </div>
//           </div>

//           {/* Status */}
//           <div style={{ marginBottom: 18 }}>
//             <StatusPill status={ride.status} />
//           </div>

//           {/* Trip info grid */}
//           <div className="modal-section">
//             <div className="modal-section-title">Trip Information</div>
//             <div className="modal-info-grid">
//               <div className="modal-info-card">
//                 <div className="mic-label">📅 Date</div>
//                 <div className="mic-value">{ride.date}</div>
//               </div>
//               <div className="modal-info-card">
//                 <div className="mic-label">🕐 Time</div>
//                 <div className="mic-value">{ride.time}</div>
//               </div>
//               <div className="modal-info-card">
//                 <div className="mic-label">⏱ Duration</div>
//                 <div className="mic-value">{ride.duration}</div>
//               </div>
//               <div className="modal-info-card">
//                 <div className="mic-label">💺 Your Seats</div>
//                 <div className="mic-value">{ride.seats} seat{ride.seats > 1 ? "s" : ""}</div>
//               </div>
//             </div>
//           </div>

//           {/* Driver */}
//           {ride.driver && (
//             <div className="modal-section">
//               <div className="modal-section-title">Your Driver</div>
//               <div className="modal-person-card">
//                 <div className="modal-person-avatar-init">{ride.driver.initials}</div>
//                 <div className="modal-person-info">
//                   <strong>{ride.driver.name}</strong>
//                   <span className="rating">⭐ {ride.driver.rating} · </span>
//                   <span>{ride.driver.car}</span>
//                 </div>
//                 <button className="modal-contact-btn" title="Call Driver">📞</button>
//               </div>
//             </div>
//           )}

//           {/* Cancellation */}
//           {ride.status === "cancelled" && (
//             <div className="modal-cancel-box">
//               <p><strong>Cancelled by:</strong> {ride.cancelledBy}</p>
//               {ride.cancelReason && <p><strong>Reason:</strong> {ride.cancelReason}</p>}
//             </div>
//           )}

//           {/* Price */}
//           <div className="modal-price-row">
//             <span className="modal-price-label">Total Fare</span>
//             <span className="modal-price-value">₹{ride.price}</span>
//           </div>

//           {/* Actions */}
//           <div className="modal-actions">
//             {(ride.status === "confirmed" || ride.status === "upcoming") ? (
//               <>
//                 <button className="btn-text danger">Cancel Ride</button>
//                 <button className="btn-text primary">Contact Driver 📞</button>
//               </>
//             ) : ride.status === "completed" ? (
//               <>
//                 <button className="btn-text ghost">Download Receipt 🧾</button>
//                 <button className="btn-text primary">Book Again →</button>
//               </>
//             ) : (
//               <button className="btn-text primary" style={{ flex: 1 }}>Find Similar Ride →</button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ══════════════════════════════════════
//    MAIN COMPONENT
// ══════════════════════════════════════ */
// export default function UserRides() {
//   const [activeTab, setActiveTab] = useState("upcoming");
//   const [selectedRide, setSelectedRide] = useState(null);

//   const dataMap = { upcoming: upcomingRides, completed: completedRides, cancelled: cancelledRides };
//   const rides = dataMap[activeTab] || [];

//   const totalSpend = [...upcomingRides, ...completedRides].reduce((s, r) => s + r.price, 0);

//   return (
//     <div className="user-rides">
//       {/* ── Banner ── */}
//       <div className="rides-banner">
//         <div className="rides-banner-inner">
//           <div className="rides-banner-left">
//             <h1>🚗 My Rides</h1>
//             <p>Track and manage all your booked journeys</p>
//           </div>
//           <div className="rides-banner-right">
//             <div className="rides-user-pill">
//               <div className="rides-user-avatar">P</div>
//               <span className="rides-user-name">Pradyumna</span>
//             </div>
//             <span className="rides-role-tag">Passenger</span>
//           </div>
//         </div>
//       </div>

//       {/* ── Stats ── */}
//       <div className="rides-stats">
//         <div className="rides-stat">
//           <div className="rides-stat-icon icon-blue">🗓️</div>
//           <div className="rides-stat-text">
//             <strong>{upcomingRides.length}</strong>
//             <span>Upcoming Rides</span>
//           </div>
//         </div>
//         <div className="rides-stat">
//           <div className="rides-stat-icon icon-green">✅</div>
//           <div className="rides-stat-text">
//             <strong>{completedRides.length}</strong>
//             <span>Completed</span>
//           </div>
//         </div>
//         <div className="rides-stat">
//           <div className="rides-stat-icon icon-red">❌</div>
//           <div className="rides-stat-text">
//             <strong>{cancelledRides.length}</strong>
//             <span>Cancelled</span>
//           </div>
//         </div>
//         <div className="rides-stat">
//           <div className="rides-stat-icon icon-amber">💰</div>
//           <div className="rides-stat-text">
//             <strong>₹{totalSpend.toLocaleString()}</strong>
//             <span>Total Spent</span>
//           </div>
//         </div>
//       </div>

//       {/* ── Tabs ── */}
//       <div className="rides-tabs-wrap">
//         <div className="rides-tabs">
//           {TABS.map((t) => (
//             <button
//               key={t.key}
//               className={`rides-tab ${activeTab === t.key ? "active" : ""}`}
//               onClick={() => setActiveTab(t.key)}
//             >
//               {t.emoji} {t.label}
//               <span className="tab-badge">{dataMap[t.key].length}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ── Table ── */}
//       <div className="rides-table-wrap">
//         <div className="rides-table-box">
//           <div className="rides-table-header">
//             <span className="rides-table-title">
//               {TABS.find((t) => t.key === activeTab)?.label} Rides
//             </span>
//             <span className="rides-count-pill">{rides.length} ride{rides.length !== 1 ? "s" : ""}</span>
//           </div>

//           {rides.length === 0 ? (
//             <div className="rides-empty">
//               <div className="rides-empty-icon">🚗</div>
//               <h3>No {activeTab} rides</h3>
//               <p>You don't have any {activeTab} rides yet.</p>
//             </div>
//           ) : (
//             <table className="rides-table">
//               <thead>
//                 <tr>
//                   <th>Route</th>
//                   <th>Date &amp; Time</th>
//                   <th>Duration</th>
//                   <th>Driver</th>
//                   <th>Seats</th>
//                   <th>Fare</th>
//                   <th>Status</th>
//                   <th style={{ textAlign: "right" }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {rides.map((ride) => (
//                   <tr key={ride.id}>
//                     {/* Route */}
//                     <td>
//                       <div className="td-route">
//                         <div>
//                           <div className="td-city">{ride.from}</div>
//                         </div>
//                         <span className="td-arrow">→</span>
//                         <div>
//                           <div className="td-city">{ride.to}</div>
//                         </div>
//                       </div>
//                     </td>

//                     {/* Date */}
//                     <td>
//                       <div className="td-datetime">
//                         <strong>{ride.date}</strong>
//                         <span>{ride.time}</span>
//                       </div>
//                     </td>

//                     {/* Duration */}
//                     <td><span className="td-duration">⏱ {ride.duration}</span></td>

//                     {/* Driver */}
//                     <td>
//                       <div className="td-person">
//                         <div className="mini-avatar-init">{ride.driver.initials}</div>
//                         <div className="td-person-info">
//                           <strong>{ride.driver.name}</strong>
//                           <span>⭐ {ride.driver.rating}</span>
//                         </div>
//                       </div>
//                     </td>

//                     {/* Seats */}
//                     <td>
//                       <div className="td-seats">
//                         <SeatBar booked={ride.seats} total={ride.totalSeats} />
//                         <span style={{ fontSize: 12, color: "var(--fr-text-gray)" }}>
//                           {ride.seats}/{ride.totalSeats}
//                         </span>
//                       </div>
//                     </td>

//                     {/* Price */}
//                     <td><span className="td-price">₹{ride.price}</span></td>

//                     {/* Status */}
//                     <td><StatusPill status={ride.status} /></td>

//                     {/* Actions */}
//                     <td>
//                       <div className="td-actions">
//                         <button
//                           className="btn-icon primary"
//                           title="View Details"
//                           onClick={() => setSelectedRide(ride)}
//                         >
//                           👁
//                         </button>
//                         {(ride.status === "confirmed" || ride.status === "upcoming") && (
//                           <>
//                             <button className="btn-icon" title="Contact Driver">📞</button>
//                             <button className="btn-icon danger" title="Cancel Ride">✕</button>
//                           </>
//                         )}
//                         {ride.status === "completed" && (
//                           <button className="btn-icon" title="Book Again">↩</button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>

//       {/* Modal */}
//       {selectedRide && (
//         <RideDetailModal ride={selectedRide} onClose={() => setSelectedRide(null)} />
//       )}
//     </div>
//   );
// }
