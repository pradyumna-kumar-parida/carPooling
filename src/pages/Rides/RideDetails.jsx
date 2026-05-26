import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/FindRide.css";
import Header from "../../components/Nav";
import Footer from "../../components/Footer";
import SearchRide from "./find-ride/SearchRide";
import { FaCarSide } from "react-icons/fa";
import varifiedBedge from "../../assets/Images/verifiedBedge.png";
import { GiCometSpark } from "react-icons/gi";
import { FaUserGroup } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
/* ─────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────── */
const RIDES = [
  {
    id: 1,
    date: "Wednesday, 15 April",
    route: "New Delhi → Chandigarh",
    depart: "08:50",
    arrive: "10:00",
    duration: "3h10",
    from: "Delhi",
    to: "Chandigarh",
    price: 540,
    driver: { name: "Saumya", rating: 5.0, avatar: "SA" },
    maxBack: 2,
    instantBooking: false,
    smoking: false,
    pets: false,
    verified: true,
    departSlot: "06:00 - 12:00",
  },
  {
    id: 2,
    date: "Today",
    route: "New Delhi → Chandigarh",
    depart: "19:30",
    arrive: "22:40",
    duration: "3h10",
    from: "New Delhi",
    to: "Rajpura",
    price: 580,
    driver: { name: "Gurmeet", rating: 4.0, avatar: "GU" },
    maxBack: 2,
    instantBooking: false,
    smoking: false,
    pets: false,
    verified: true,
    departSlot: "After 18:00",
  },
  {
    id: 3,
    date: "Today",
    route: "New Delhi → Chandigarh",
    depart: "20:00",
    arrive: "23:10",
    duration: "3h10",
    from: "New Delhi",
    to: "Rajpura",
    price: 760,
    driver: { name: "Daya", rating: 1.0, avatar: "DA" },
    maxBack: 2,
    instantBooking: false,
    smoking: true,
    pets: false,
    verified: false,
    departSlot: "After 18:00",
  },
  {
    id: 4,
    date: "Wednesday, 15 April",
    route: "New Delhi → Chandigarh",
    depart: "04:00",
    arrive: "07:20",
    duration: "3h20",
    from: "Badli",
    to: "Shahzadpur",
    price: 490,
    driver: { name: "Ravi", rating: 4.8, avatar: "RA" },
    maxBack: 2,
    instantBooking: true,
    smoking: false,
    pets: false,
    verified: true,
    departSlot: "Before 06:00",
  },
  {
    id: 5,
    date: "Tomorrow",
    route: "New Delhi → Chandigarh",
    depart: "09:10",
    arrive: "12:30",
    duration: "3h20",
    from: "Ghaziabad",
    to: "Dera Bassi",
    price: 550,
    driver: { name: "Chirag", rating: 4.5, avatar: "CH" },
    maxBack: 2,
    instantBooking: true,
    smoking: false,
    pets: true,
    verified: true,
    departSlot: "06:00 - 12:00",
  },
  {
    id: 6,
    date: "Tomorrow",
    route: "New Delhi → Chandigarh",
    depart: "14:15",
    arrive: "17:45",
    duration: "3h30",
    from: "New Delhi",
    to: "Chandigarh",
    price: 620,
    driver: { name: "Priya", rating: 4.7, avatar: "PR" },
    maxBack: 2,
    instantBooking: false,
    smoking: false,
    pets: true,
    verified: true,
    departSlot: "12:01 - 18:00",
  },
];

const SORT_OPTIONS = [
  { id: "earliest", label: "Earliest departure" },
  { id: "lowest", label: "Lowest price" },
  { id: "departure", label: "Close to departure point" },
  { id: "arrival", label: "Close to arrival point" },
  { id: "shortest", label: "Shortest ride" },
];

const DEPART_SLOTS = [
  { id: "before6", label: "Before 06:00", count: 9 },
  { id: "6to12", label: "06:00 - 12:00", count: 16 },
  { id: "12to18", label: "12:01 - 18:00", count: 20 },
  { id: "after18", label: "After 18:00", count: 13 },
];

const AMENITIES = [
  { id: "maxBack", label: "Max. 2 in the back", count: 38 },
  { id: "instantBooking", label: "Instant Booking", count: 10 },
  { id: "smoking", label: "Smoking allowed", count: 23 },
  { id: "pets", label: "Pets allowed", count: 24 },
];

/* ─────────────────────────────────────────
   AVATAR COLORS
───────────────────────────────────────── */
const AVATAR_COLORS = [
  ["#dbeafe", "#1e40af"],
  ["#dcfce7", "#166534"],
  ["#fef3c7", "#92400e"],
  ["#fce7f3", "#9d174d"],
  ["#ede9fe", "#5b21b6"],
];
const avatarColor = (name) =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

/* ─────────────────────────────────────────
   STAR RATING
───────────────────────────────────────── */
function StarRating({ rating }) {
  return (
    <span className="ridetail-star-wrap">
      <FaStar />
      <span className="ridetail-star-val">{rating.toFixed(1)}</span>
    </span>
  );
}

/* ─────────────────────────────────────────
   RIDE CARD
───────────────────────────────────────── */
function RideCard({ ride }) {
  const [bg, text] = avatarColor(ride.driver.name);
  return (
    <motion.div
      className="ridetail-card-ride"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22 }}
      whileHover={{ y: -2, boxShadow: "0 8px 32px rgba(15,52,120,0.13)" }}
    >
      {/* Time row */}
      <div className="ridetail-ride-top">
        <div className="ridetail-ride-timeline">
          <div className="ridetail-ride-point">
            <span className="ridetail-ride-time">{ride.depart}</span>
            <span className="ridetail-ride-city">{ride.from}</span>
          </div>

          <div className="ridetail-ride-line">
            <div className="ridetail-ride-dot ridetail-ride-dot--left" />
            <div className="ridetail-ride-track">
              <span className="ridetail-ride-dur">{ride.duration}</span>
            </div>
            <div className="ridetail-ride-dot ridetail-ride-dot--right" />
          </div>

          <div className="ridetail-ride-point ridetail-ride-point--right">
            <span className="ridetail-ride-time">{ride.arrive}</span>
            <span className="ridetail-ride-city">{ride.to}</span>
          </div>
        </div>

        <div className="ridetail-ride-price">
          <span className="ridetail-price-sym">₹</span>
          <span className="ridetail-price-main">{ride.price}.00</span>
        </div>
      </div>

      {/* Driver row */}
      <div className="ridetail-ride-bottom">
        <div className="ridetail-driver-row">
          {/* Car icon */}
          <span className="ridetail-car-icon">
            <FaCarSide />
          </span>

          {/* Avatar */}
          <div
            className="ridetail-avatar"
            style={{ background: bg, color: text }}
          >
            {ride.driver.avatar}
          </div>

          <span className="ridetail-driver-name">{ride.driver.name}</span>
          <StarRating rating={ride.driver.rating} />
        </div>

        <div className="ridetail-badges">
          {ride.instantBooking && (
            <span className="ridetail-badge ridetail-badge--instant">
              <GiCometSpark />
              Instant Booking
            </span>
          )}
          <span className="ridetail-badge ridetail-badge--back">
            <FaUserGroup />
            Max. {ride.maxBack} in the back
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   GROUP RIDES BY DATE LABEL
───────────────────────────────────────── */
function groupByDate(rides) {
  const order = [];
  const map = {};
  rides.forEach((r) => {
    if (!map[r.date]) {
      map[r.date] = [];
      order.push(r.date);
    }
    map[r.date].push(r);
  });
  return order.map((d) => ({ date: d, rides: map[d], route: map[d][0].route }));
}

/* ─────────────────────────────────────────
   SIDEBAR FILTER
───────────────────────────────────────── */
function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="ridetail-filter-section">
      <button
        className="ridetail-filter-title"
        onClick={() => setOpen((o) => !o)}
      >
        {title}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform .2s",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}
          >
            <div className="ridetail-filter-body">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function RideDetails() {
  const [sortBy, setSortBy] = useState("earliest");
  const [departChecks, setDepartChecks] = useState({
    before6: true,
    "6to12": true,
    "12to18": false,
    after18: true,
  });
  const [amenityChecks, setAmenityChecks] = useState({
    maxBack: true,
    instantBooking: false,
    smoking: false,
    pets: false,
  });
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

  const slotMap = {
    before6: "Before 06:00",
    "6to12": "06:00 - 12:00",
    "12to18": "12:01 - 18:00",
    after18: "After 18:00",
  };

  const filtered = RIDES.filter((r) => {
    if (verifiedOnly && !r.verified) return false;
    const activeSlots = Object.entries(departChecks)
      .filter(([, v]) => v)
      .map(([k]) => slotMap[k]);
    if (activeSlots.length && !activeSlots.includes(r.departSlot)) return false;
    if (amenityChecks.instantBooking && !r.instantBooking) return false;
    if (amenityChecks.smoking && !r.smoking) return false;
    if (amenityChecks.pets && !r.pets) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "lowest") return a.price - b.price;
    if (sortBy === "shortest") return a.duration.localeCompare(b.duration);
    if (sortBy === "earliest") return a.depart.localeCompare(b.depart);
    return 0;
  });

  const groups = groupByDate(sorted.slice(0, visibleCount));

  const clearAll = () => {
    setSortBy("earliest");
    setDepartChecks({
      before6: false,
      "6to12": false,
      "12to18": false,
      after18: false,
    });
    setAmenityChecks({
      maxBack: false,
      instantBooking: false,
      smoking: false,
      pets: false,
    });
    setVerifiedOnly(false);
  };

  return (
    <>
      <Header />
      <div className="ridetail-page">
        {/* ── TOP BAR: empty slot for your form ── */}
        <div className="ridetail-topbar">
          <div className="ridetail-topbar-inner">
            <SearchRide />
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="ridetail-body">
          {/* ── SIDEBAR (desktop) ── */}
          <aside className="ridetail-sidebar">
            <div className="ridetail-sidebar-head">
              <span className="ridetail-sidebar-title">Sort by</span>
              <button className="ridetail-clear-btn" onClick={clearAll}>
                Clear all
              </button>
            </div>

            <FilterSection title="Sort by" defaultOpen={true}>
              {SORT_OPTIONS.map((s) => (
                <label key={s.id} className="ridetail-radio-row">
                  <span className="ridetail-radio-left">
                    <input
                      type="radio"
                      className="ridetail-radio"
                      name="sort"
                      checked={sortBy === s.id}
                      onChange={() => setSortBy(s.id)}
                    />
                    <span className="ridetail-radio-label">{s.label}</span>
                  </span>
                </label>
              ))}
            </FilterSection>

            <FilterSection title="Departure time" defaultOpen={true}>
              {DEPART_SLOTS.map((d) => (
                <div key={d.id} className="ridetail-check-row">
                  <label className="ridetail-check-left">
                    <input
                      type="checkbox"
                      className="ridetail-checkbox"
                      checked={!!departChecks[d.id]}
                      onChange={() =>
                        setDepartChecks((p) => ({ ...p, [d.id]: !p[d.id] }))
                      }
                    />
                    <span className="ridetail-check-label">{d.label}</span>
                  </label>
                  <div className="ridetail-check-right">
                    <span className="ridetail-check-count">{d.count}</span>
                  </div>
                </div>
              ))}
            </FilterSection>

            <FilterSection title="Trust and safety" defaultOpen={true}>
              <div className="ridetail-check-row">
                <label className="ridetail-check-left">
                  <input
                    type="checkbox"
                    className="ridetail-checkbox"
                    checked={verifiedOnly}
                    onChange={() => setVerifiedOnly((v) => !v)}
                  />
                  <span className="ridetail-check-label">Verified Profile</span>
                </label>
                <div className="ridetail-check-right">
                  <span className="ridetail-check-count">38</span>
                  <span className="ridetail-verified-badge">
                    <img src={varifiedBedge} alt="" loading="eager" />
                  </span>
                </div>
              </div>
            </FilterSection>

            <FilterSection title="Amenities" defaultOpen={true}>
              {AMENITIES.map((a) => (
                <div key={a.id} className="ridetail-check-row">
                  <label className="ridetail-check-left">
                    <input
                      type="checkbox"
                      className="ridetail-checkbox"
                      checked={!!amenityChecks[a.id]}
                      onChange={() =>
                        setAmenityChecks((p) => ({ ...p, [a.id]: !p[a.id] }))
                      }
                    />
                    <span className="ridetail-check-label">{a.label}</span>
                  </label>
                  <div className="ridetail-check-right">
                    <span className="ridetail-check-count">{a.count}</span>
                  </div>
                </div>
              ))}
            </FilterSection>
          </aside>

          {/* ── RESULTS ── */}
          <main>
            {/* Mobile filter toggle */}
            <MobileSidebar
              sortBy={sortBy}
              setSortBy={setSortBy}
              departChecks={departChecks}
              setDepartChecks={setDepartChecks}
              verifiedOnly={verifiedOnly}
              setVerifiedOnly={setVerifiedOnly}
              amenityChecks={amenityChecks}
              setAmenityChecks={setAmenityChecks}
              clearAll={clearAll}
            />

            <div className="ridetail-results">
              {groups.length === 0 ? (
                <div className="ridetail-empty">
                  No rides match your filters.
                </div>
              ) : (
                groups.map((group) => (
                  <div key={group.date} className="ridetail-date-group">
                    <div className="ridetail-date-header">
                      <span className="ridetail-date-label">{group.date}</span>
                      <span className="ridetail-date-route">{group.route}</span>
                    </div>
                    <AnimatePresence>
                      {group.rides.map((ride) => (
                        <RideCard key={ride.id} ride={ride} />
                      ))}
                    </AnimatePresence>
                  </div>
                ))
              )}
            </div>

            {visibleCount < sorted.length && (
              <div className="ridetail-load-wrap">
                <motion.button
                  className="ridetail-load-btn"
                  onClick={() => setVisibleCount((n) => n + 4)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Load more results
                </motion.button>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

/* ─────────────────────────────────────────
   MOBILE SIDEBAR DRAWER
───────────────────────────────────────── */
function MobileSidebar({
  sortBy,
  setSortBy,
  departChecks,
  setDepartChecks,
  verifiedOnly,
  setVerifiedOnly,
  amenityChecks,
  setAmenityChecks,
  clearAll,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="ridetail-filter-toggle" onClick={() => setOpen(true)}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="14" y2="12" />
          <line x1="4" y1="18" x2="10" y2="18" />
        </svg>
        Filters &amp; Sort
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="ridetail-mobile-overlay"
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 100,
                background: "rgba(11,22,41,0.45)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="ridetail-mobile-sidebar"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 80, damping: 18 }}
            >
              <div className="ridetail-mobile-sidebar-head">
                <span className="ridetail-sidebar-title">
                  Filters &amp; Sort
                </span>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <button
                    className="ridetail-clear-btn"
                    onClick={() => {
                      clearAll();
                      setOpen(false);
                    }}
                  >
                    Clear all
                  </button>
                  <button
                    className="ridetail-mobile-close"
                    onClick={() => setOpen(false)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>

              <FilterSection title="Sort by">
                {SORT_OPTIONS.map((s) => (
                  <label key={s.id} className="ridetail-radio-row">
                    <span className="ridetail-radio-left">
                      <input
                        type="radio"
                        className="ridetail-radio"
                        name="sort-m"
                        checked={sortBy === s.id}
                        onChange={() => setSortBy(s.id)}
                      />
                      <span className="ridetail-radio-label">{s.label}</span>
                    </span>
                  </label>
                ))}
              </FilterSection>

              <FilterSection title="Departure time">
                {DEPART_SLOTS.map((d) => (
                  <div key={d.id} className="ridetail-check-row">
                    <label className="ridetail-check-left">
                      <input
                        type="checkbox"
                        className="ridetail-checkbox"
                        checked={!!departChecks[d.id]}
                        onChange={() =>
                          setDepartChecks((p) => ({ ...p, [d.id]: !p[d.id] }))
                        }
                      />
                      <span className="ridetail-check-label">{d.label}</span>
                    </label>
                    <span className="ridetail-check-count">{d.count}</span>
                  </div>
                ))}
              </FilterSection>

              <FilterSection title="Trust and safety">
                <div className="ridetail-check-row">
                  <label className="ridetail-check-left">
                    <input
                      type="checkbox"
                      className="ridetail-checkbox"
                      checked={verifiedOnly}
                      onChange={() => setVerifiedOnly((v) => !v)}
                    />
                    <span className="ridetail-check-label">
                      Verified Profile
                    </span>
                  </label>
                  <span className="ridetail-check-count">38</span>
                </div>
              </FilterSection>

              <FilterSection title="Amenities">
                {AMENITIES.map((a) => (
                  <div key={a.id} className="ridetail-check-row">
                    <label className="ridetail-check-left">
                      <input
                        type="checkbox"
                        className="ridetail-checkbox"
                        checked={!!amenityChecks[a.id]}
                        onChange={() =>
                          setAmenityChecks((p) => ({ ...p, [a.id]: !p[a.id] }))
                        }
                      />
                      <span className="ridetail-check-label">{a.label}</span>
                    </label>
                    <span className="ridetail-check-count">{a.count}</span>
                  </div>
                ))}
              </FilterSection>

              <div style={{ padding: "16px 20px" }}>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    width: "100%",
                    background: "#1e40af",
                    color: "#fff",
                    border: "none",
                    borderRadius: 12,
                    padding: "13px",
                    fontSize: "0.92rem",
                    fontWeight: 700,
                    fontFamily: "'Outfit', sans-serif",
                    cursor: "pointer",
                  }}
                >
                  Show results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
