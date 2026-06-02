import React, { useState } from "react";


/* ─── Sample Data ─── */
const upcomingRides = [
  {
    id: 1, from: "Mumbai", to: "Pune",
    fromAddress: "Terminal 2, Chhatrapati Shivaji Airport",
    toAddress: "Navale Bridge, Vadgaon Budruk, Pune",
    date: "Apr 25, 2026", time: "11:00 AM", duration: "3h 10m",
    totalSeats: 4, bookedSeats: 2,
    passengers: [
      { name: "Sneha Das", initials: "SD", phone: "+91 98765 43210", seats: 1 },
      { name: "Arjun Roy", initials: "AR", phone: "+91 87654 32109", seats: 1 },
    ],
    price: 600, status: "upcoming",
  },
  {
    id: 2, from: "Delhi", to: "Agra",
    fromAddress: "Connaught Place, New Delhi",
    toAddress: "Taj Mahal Road, Agra",
    date: "Apr 28, 2026", time: "06:00 AM", duration: "4h 30m",
    totalSeats: 3, bookedSeats: 3,
    passengers: [
      { name: "Rahul Singh", initials: "RS", phone: "+91 76543 21098", seats: 1 },
      { name: "Priya Sharma", initials: "PS", phone: "+91 65432 10987", seats: 1 },
      { name: "Meera Sen",   initials: "MS", phone: "+91 54321 09876", seats: 1 },
    ],
    price: 450, status: "upcoming",
  },
];

const completedRides = [
  {
    id: 3, from: "Bangalore", to: "Mysore",
    fromAddress: "MG Road Metro Station, Bangalore",
    toAddress: "Mysore Palace Road, Mysore",
    date: "Apr 18, 2026", time: "09:00 AM", duration: "2h 45m",
    totalSeats: 4, bookedSeats: 3,
    passengers: [
      { name: "Vijay Kumar", initials: "VK", phone: "+91 43210 98765", seats: 2 },
      { name: "Divya Rao",   initials: "DR", phone: "+91 32109 87654", seats: 1 },
    ],
    price: 350, status: "completed",
    earnings: 1050,
  },
  {
    id: 4, from: "Chennai", to: "Pondicherry",
    fromAddress: "Chennai Central Railway Station",
    toAddress: "Beach Road, Pondicherry",
    date: "Apr 10, 2026", time: "02:00 PM", duration: "3h 00m",
    totalSeats: 4, bookedSeats: 4,
    passengers: [
      { name: "Karan Mehta", initials: "KM", phone: "+91 21098 76543", seats: 1 },
      { name: "Anita Das",   initials: "AD", phone: "+91 10987 65432", seats: 1 },
      { name: "Suresh Rao",  initials: "SR", phone: "+91 09876 54321", seats: 2 },
    ],
    price: 500, status: "completed",
    earnings: 2000,
  },
];

const cancelledRides = [
  {
    id: 5, from: "Hyderabad", to: "Vijayawada",
    fromAddress: "HITEC City, Hyderabad",
    toAddress: "MG Road, Vijayawada",
    date: "Apr 5, 2026", time: "08:00 AM", duration: "5h 30m",
    totalSeats: 4, bookedSeats: 1,
    passengers: [
      { name: "Ravi Teja", initials: "RT", phone: "+91 98765 12340", seats: 1 },
    ],
    price: 700, status: "cancelled",
    cancelledBy: "You", cancelReason: "Vehicle breakdown",
  },
];

const TABS = [
  { key: "upcoming",  label: "Upcoming",  emoji: "🗓️" },
  { key: "completed", label: "Completed", emoji: "✅" },
  { key: "cancelled", label: "Cancelled", emoji: "❌" },
];

/* ─── Status pill ─── */
const StatusPill = ({ status }) => (
  <span className={`status-pill ${status}`}>
    <span className={`status-dot ${status === "upcoming" ? "pulse" : ""}`} />
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </span>
);

/* ─── Seat bar ─── */
const SeatBar = ({ booked, total }) => (
  <div className="seat-bar">
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} className={`seat-dot ${i < booked ? "filled" : "empty"}`} />
    ))}
  </div>
);

/* ─── Passenger Stack ─── */
const PassengerStack = ({ passengers, max = 3 }) => {
  const shown = passengers.slice(0, max);
  const extra = passengers.length - max;
  return (
    <div className="mini-stack">
      {shown.map((p, i) => (
        <div className="mini-avatar-init" key={i} title={p.name}>{p.initials}</div>
      ))}
      {extra > 0 && <div className="mini-more">+{extra}</div>}
    </div>
  );
};

/* ─── Detail Modal ─── */
const RideDetailModal = ({ ride, onClose }) => {
  if (!ride) return null;
  const totalEarnings = ride.earnings || ride.price * ride.bookedSeats;

  return (
    <div className="rides-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="rides-modal">
        <div className="modal-head">
          <h2>Ride Details</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">

          {/* Route Banner */}
          <div className="modal-route-banner">
            <div className="modal-route-city">
              <span className="city-label">From</span>
              <div className="city-name">{ride.from}</div>
              <span className="city-sub">{ride.fromAddress}</span>
            </div>
            <div className="modal-route-arrow">→</div>
            <div className="modal-route-city" style={{ textAlign: "right" }}>
              <span className="city-label">To</span>
              <div className="city-name">{ride.to}</div>
              <span className="city-sub">{ride.toAddress}</span>
            </div>
          </div>

          {/* Status + notify chip */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <StatusPill status={ride.status} />
            {ride.status === "upcoming" && ride.bookedSeats === ride.totalSeats && (
              <span className="driver-notify-chip">
                <span className="notify-pulse" />
                Full — Ready to Go
              </span>
            )}
          </div>

          {/* Trip info */}
          <div className="modal-section">
            <div className="modal-section-title">Trip Information</div>
            <div className="modal-info-grid">
              <div className="modal-info-card">
                <div className="mic-label">📅 Date</div>
                <div className="mic-value">{ride.date}</div>
              </div>
              <div className="modal-info-card">
                <div className="mic-label">🕐 Time</div>
                <div className="mic-value">{ride.time}</div>
              </div>
              <div className="modal-info-card">
                <div className="mic-label">⏱ Duration</div>
                <div className="mic-value">{ride.duration}</div>
              </div>
              <div className="modal-info-card">
                <div className="mic-label">💺 Seats Filled</div>
                <div className="mic-value">{ride.bookedSeats} / {ride.totalSeats}</div>
              </div>
              <div className="modal-info-card">
                <div className="mic-label">💲 Per Seat</div>
                <div className="mic-value">₹{ride.price}</div>
              </div>
            </div>
          </div>

          {/* Passengers */}
          {ride.passengers && ride.passengers.length > 0 && (
            <div className="modal-section">
              <div className="modal-section-title">
                Passengers ({ride.passengers.length})
              </div>
              {ride.passengers.map((p, i) => (
                <div className="modal-person-card" key={i}>
                  <div className="modal-person-avatar-init">{p.initials}</div>
                  <div className="modal-person-info">
                    <strong>{p.name}</strong>
                    <span>{p.phone} · {p.seats} seat{p.seats > 1 ? "s" : ""}</span>
                  </div>
                  <button className="modal-contact-btn" title="Call Passenger">📞</button>
                </div>
              ))}
            </div>
          )}

          {/* Cancellation */}
          {ride.status === "cancelled" && (
            <div className="modal-cancel-box">
              <p><strong>Cancelled by:</strong> {ride.cancelledBy}</p>
              {ride.cancelReason && <p><strong>Reason:</strong> {ride.cancelReason}</p>}
            </div>
          )}

          {/* Earnings */}
          <div className="modal-price-row">
            <span className="modal-price-label">
              {ride.status === "completed" ? "Total Earnings" : "Expected Earnings"}
            </span>
            <span className="modal-price-value">₹{totalEarnings.toLocaleString()}</span>
          </div>

          {/* Actions */}
          <div className="modal-actions">
            {ride.status === "upcoming" && (
              <>
                <button className="btn-text danger">Cancel Ride</button>
                <button className="btn-text success">Start Ride 🚗</button>
              </>
            )}
            {ride.status === "completed" && (
              <>
                <button className="btn-text ghost">Download Summary 🧾</button>
                <button className="btn-text primary">Publish Again →</button>
              </>
            )}
            {ride.status === "cancelled" && (
              <button className="btn-text primary" style={{ flex: 1 }}>Republish Ride →</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export default function DriverRides() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedRide, setSelectedRide] = useState(null);

  const dataMap = { upcoming: upcomingRides, completed: completedRides, cancelled: cancelledRides };
  const rides = dataMap[activeTab] || [];

  const totalEarnings = completedRides.reduce((s, r) => s + (r.earnings || r.price * r.bookedSeats), 0);
  const totalPassengers = completedRides.reduce((s, r) => s + r.bookedSeats, 0);

  return (
    <div className="driver-rides">
      {/* ── Banner ── */}
      <div className="rides-banner">
        <div className="rides-banner-inner">
          <div className="rides-banner-left">
            <h1>🚘 My Published Rides</h1>
            <p>Manage all rides you have offered to passengers</p>
          </div>
          <div className="rides-banner-right">
            <div className="rides-user-pill">
              <div className="rides-user-avatar">D</div>
              <span className="rides-user-name">Dinesh Kumar</span>
            </div>
            <span className="rides-role-tag">Driver</span>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="rides-stats">
        <div className="rides-stat">
          <div className="rides-stat-icon icon-blue">🗓️</div>
          <div className="rides-stat-text">
            <strong>{upcomingRides.length}</strong>
            <span>Upcoming Rides</span>
          </div>
        </div>
        <div className="rides-stat">
          <div className="rides-stat-icon icon-green">✅</div>
          <div className="rides-stat-text">
            <strong>{completedRides.length}</strong>
            <span>Completed</span>
          </div>
        </div>
        <div className="rides-stat">
          <div className="rides-stat-icon icon-violet">👥</div>
          <div className="rides-stat-text">
            <strong>{totalPassengers}</strong>
            <span>Total Passengers</span>
          </div>
        </div>
        <div className="rides-stat">
          <div className="rides-stat-icon icon-amber">💸</div>
          <div className="rides-stat-text">
            <strong>₹{totalEarnings.toLocaleString()}</strong>
            <span>Total Earnings</span>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="rides-tabs-wrap">
        <div className="rides-tabs">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`rides-tab ${activeTab === t.key ? "active" : ""}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.emoji} {t.label}
              <span className="tab-badge">{dataMap[t.key].length}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="rides-table-wrap">
        <div className="rides-table-box">
          <div className="rides-table-header">
            <span className="rides-table-title">
              {TABS.find((t) => t.key === activeTab)?.label} Rides
            </span>
            <span className="rides-count-pill">{rides.length} ride{rides.length !== 1 ? "s" : ""}</span>
          </div>

          {rides.length === 0 ? (
            <div className="rides-empty">
              <div className="rides-empty-icon">🚘</div>
              <h3>No {activeTab} rides</h3>
              <p>You haven't published any {activeTab} rides yet.</p>
            </div>
          ) : (
            <table className="rides-table">
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Date &amp; Time</th>
                  <th>Duration</th>
                  <th>Passengers</th>
                  <th>Seats</th>
                  <th>
                    {activeTab === "completed" ? "Earnings" : "Per Seat"}
                  </th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rides.map((ride) => (
                  <tr key={ride.id}>
                    {/* Route */}
                    <td>
                      <div className="td-route">
                        <div>
                          <div className="td-city">{ride.from}</div>
                        </div>
                        <span className="td-arrow">→</span>
                        <div>
                          <div className="td-city">{ride.to}</div>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td>
                      <div className="td-datetime">
                        <strong>{ride.date}</strong>
                        <span>{ride.time}</span>
                      </div>
                    </td>

                    {/* Duration */}
                    <td><span className="td-duration">⏱ {ride.duration}</span></td>

                    {/* Passengers */}
                    <td>
                      {ride.passengers.length > 0 ? (
                        <div className="td-person">
                          <PassengerStack passengers={ride.passengers} />
                          <div className="td-person-info">
                            <strong>{ride.passengers.length} booked</strong>
                            <span>
                              {ride.passengers.slice(0, 1).map((p) => p.name).join(", ")}
                              {ride.passengers.length > 1 ? ` +${ride.passengers.length - 1}` : ""}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <span style={{ fontSize: 13, color: "var(--fr-text-light)" }}>No bookings yet</span>
                      )}
                    </td>

                    {/* Seats */}
                    <td>
                      <div className="td-seats">
                        <SeatBar booked={ride.bookedSeats} total={ride.totalSeats} />
                        <span style={{ fontSize: 12, color: "var(--fr-text-gray)" }}>
                          {ride.bookedSeats}/{ride.totalSeats}
                        </span>
                      </div>
                    </td>

                    {/* Earnings / Price */}
                    <td>
                      {activeTab === "completed" ? (
                        <span className="earn-badge">
                          ₹{(ride.earnings || ride.price * ride.bookedSeats).toLocaleString()}
                        </span>
                      ) : (
                        <span className="td-price">₹{ride.price}</span>
                      )}
                    </td>

                    {/* Status */}
                    <td>
                      <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-start" }}>
                        <StatusPill status={ride.status} />
                        {ride.status === "upcoming" && ride.bookedSeats === ride.totalSeats && (
                          <span className="driver-notify-chip" style={{ fontSize: 10, padding: "2px 8px" }}>
                            <span className="notify-pulse" />
                            Full
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="td-actions">
                        <button
                          className="btn-icon primary"
                          title="View Details"
                          onClick={() => setSelectedRide(ride)}
                        >
                          👁
                        </button>
                        {ride.status === "upcoming" && (
                          <>
                            <button
                              className="btn-icon"
                              title="Start Ride"
                              style={{ background: "#ecfdf5", borderColor: "#a7f3d0", color: "#059669" }}
                            >
                              ▶
                            </button>
                            <button className="btn-icon danger" title="Cancel Ride">✕</button>
                          </>
                        )}
                        {ride.status === "completed" && (
                          <button className="btn-icon" title="Download Summary">🧾</button>
                        )}
                        {ride.status === "cancelled" && (
                          <button className="btn-icon" title="Republish">↩</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedRide && (
        <RideDetailModal ride={selectedRide} onClose={() => setSelectedRide(null)} />
      )}
    </div>
  );
}