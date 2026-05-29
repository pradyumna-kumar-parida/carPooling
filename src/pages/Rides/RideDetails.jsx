import React, { useEffect, useState } from "react";
import "../../styles/FindRide.css";
import Header from "../../components/Nav";
import Footer from "../../components/Footer";
import SearchRide from "./find-ride/SearchRide";
import { FaCarSide } from "react-icons/fa";
import varifiedBedge from "../../assets/Images/verifiedBedge.png";
import rideNotFound from "../../assets/Images/no-ride.png";
import { GiCometSpark } from "react-icons/gi";
import { FaUserGroup } from "react-icons/fa6";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaSmoking } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api";
import { BiSolidLocationPlus } from "react-icons/bi";
import { LuFilter } from "react-icons/lu";
const SORT_OPTIONS = [
  { id: "earliest", label: "Earliest departure" },
  { id: "lowest", label: "Lowest price" },
  { id: "shortest", label: "Shortest ride" },
];

const DEPART_SLOTS = [
  { id: "before6", label: "Before 06:00" },
  { id: "6to12", label: "06:00 - 12:00" },
  { id: "12to18", label: "12:01 - 18:00" },
  { id: "after18", label: "After 18:00" },
];

const AMENITIES = [
  { id: "max_two_in_back", label: "Max. 2 in the back" },
  { id: "instant_booking", label: "Instant Booking" },
  { id: "smoking_allowed", label: "Smoking allowed" },
  { id: "pet_allowed", label: "Pets allowed" },
];

const SLOT_MAP = {
  before6: "Before 06:00",
  "6to12": "06:00 - 12:00",
  "12to18": "12:01 - 18:00",
  after18: "After 18:00",
};

const DEFAULT_AMENITY_CHECKS = {
  max_two_in_back: false,
  instant_booking: false,
  smoking_allowed: false,
  pet_allowed: false,
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  ["#dbeafe", "#1e40af"],
  ["#dcfce7", "#166534"],
  ["#fef3c7", "#92400e"],
  ["#fce7f3", "#9d174d"],
  ["#ede9fe", "#5b21b6"],
];
const avatarColor = (name) =>
  AVATAR_COLORS[(name || "A").charCodeAt(0) % AVATAR_COLORS.length];

const formatTime = (timeStr) => (timeStr ? timeStr.slice(0, 5) : "--:--");

const secondsToHM = (secs) => {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  return h > 0 ? `${h}h${m > 0 ? m + "m" : ""}` : `${m}m`;
};

const getDepartSlot = (timeStr) => {
  if (!timeStr) return "";
  const [h] = timeStr.split(":").map(Number);
  if (h < 6) return "Before 06:00";
  if (h < 12) return "06:00 - 12:00";
  if (h < 18) return "12:01 - 18:00";
  return "After 18:00";
};

const getInitials = (name) => {
  if (!name) return "??";
  const parts = name.trim().split(" ");
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : parts[0].slice(0, 2).toUpperCase();
};

// ── Star Rating ───────────────────────────────────────────────────────────────

function StarRating({ rating }) {
  return (
    <span className="ridetail-star-wrap">
      <FaStar />
      <span className="ridetail-star-val">
        {Number(rating || 0).toFixed(1)}
      </span>
    </span>
  );
}

// ── Ride Card ─────────────────────────────────────────────────────────────────

function RideCard({ ride }) {
  const navigate = useNavigate();
  const [bg, text] = avatarColor(ride.driver_name);

  return (
    <div
      className="ridetail-card-ride"
      onClick={() => navigate("/ride-book")}
    >
      <div className="ridetail-ride-top">
        <div className="ridetail-ride-timeline">
          <div className="ridetail-ride-point">
            <span className="ridetail-ride-time">
              {formatTime(ride.departure_time)}
            </span>
            <span className="ridetail-ride-city">
              {ride.source_address?.split(",")[0]}
            </span>
          </div>
          <div className="ridetail-ride-line">
            <div className="ridetail-ride-dot ridetail-ride-dot--left" />
            <div className="ridetail-ride-track">
              <span className="ridetail-ride-dur">
                {secondsToHM(ride.duration_seconds)}
              </span>
            </div>
            <div className="ridetail-ride-dot ridetail-ride-dot--right" />
          </div>
          <div className="ridetail-ride-point ridetail-ride-point--right">
            <span className="ridetail-ride-time">
              {formatTime(ride.estimated_reach_time)}
            </span>
            <span className="ridetail-ride-city">
              {ride.destination_address?.split(",")[0]}
            </span>
          </div>
        </div>
        <div className="ridetail-ride-price">
          <span className="ridetail-price-sym">₹</span>
          <span className="ridetail-price-main">
            {Number(ride.price_per_seat).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="ridetail-ride-bottom">
        <div className="ridetail-driver-row">
          <span className="ridetail-car-icon">
            <FaCarSide />
          </span>
          <div
            className="ridetail-avatar"
            style={{ background: bg, color: text }}
          >
            {getInitials(ride.driver_name)}
          </div>
          <span className="ridetail-driver-name">{ride.driver_name}</span>
          <StarRating rating={ride.driver_rating || 0} />
        </div>
        <div className="ridetail-badges">
          {ride.instant_booking === "yes" && (
            <span className="ridetail-badge ridetail-badge--instant">
              <GiCometSpark /> Instant Booking
            </span>
          )}
          {ride.max_two_in_back === "yes" && (
            <span className="ridetail-badge ridetail-badge--back">
              <FaUserGroup /> Max. 2 in the back
            </span>
          )}
          {ride.smoking_allowed === "yes" && (
            <span className="ridetail-badge ridetail-badge--back">
              <FaSmoking /> Smoking allowed
            </span>
          )}
          {ride.pet_allowed === "yes" && (
            <span className="ridetail-badge ridetail-badge--back">
              <IoFastFoodSharp /> Pets allowed
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Group by date ─────────────────────────────────────────────────────────────

function groupByDate(rides) {
  const order = [];
  const map = {};
  rides.forEach((r) => {
    const label = r.ride_date || "Unknown";
    if (!map[label]) {
      map[label] = [];
      order.push(label);
    }
    map[label].push(r);
  });
  return order.map((d) => ({
    date: d,
    rides: map[d],
    route: `${map[d][0].source_address} → ${map[d][0].destination_address}`,
  }));
}

// ── Filter Section ────────────────────────────────────────────────────────────

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
      {open && (
        <div style={{ overflow: "hidden" }}>
          <div className="ridetail-filter-body">{children}</div>
        </div>
      )}
    </div>
  );
}

// ── Mobile Search Bar (compact summary + search drawer) ───────────────────────

function MobileSearchBar({ from, to, date, passengers, onFilterClick }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Compact bar */}
      <div className="mobile-search-bar">
        <button
          className="mobile-search-summary"
          onClick={() => setSearchOpen(true)}
        >
          <span className="mobile-search-icon">
            <BiSolidLocationPlus />
          </span>
          <span className="mobile-search-text">
            <span className="mobile-search-route">
              {from
                ? `${from.split(",")[0]} → ${to ? to.split(",")[0] : "..."}`
                : "Where are you going?"}
            </span>
            <span className="mobile-search-sub">
              {date || "Select date"}
              {passengers
                ? `, ${passengers} passenger${Number(passengers) > 1 ? "s" : ""}`
                : ""}
            </span>
          </span>
        </button>
        <button className="mobile-filter-btn" onClick={onFilterClick}>
          <LuFilter />
          Filter
        </button>
      </div>

      {/* Full search drawer */}
      {searchOpen && (
        <>
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              background: "rgba(11,22,41,0.45)",
            }}
            onClick={() => setSearchOpen(false)}
          />
          <div className="mobile-search-drawer">
            <div className="mobile-search-drawer-head">
              <span className="mobile-search-drawer-title">Search rides</span>
              <button
                className="ridetail-mobile-close"
                onClick={() => setSearchOpen(false)}
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
            <div className="mobile-search-drawer-body">
              <SearchRide
                initialFrom={from}
                initialTo={to}
                initialDate={date}
                initialPassengers={passengers}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function RideDetails() {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");
  const passengers = searchParams.get("passengers");

  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const [sortBy, setSortBy] = useState("earliest");
  const [departSlot, setDepartSlot] = useState("");
  const [amenityChecks, setAmenityChecks] = useState({
    ...DEFAULT_AMENITY_CHECKS,
  });
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    if (!from || !to || !date) return;
    const fetchRides = async () => {
      setLoading(true);
      setApiError("");
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${API_BASE_URL}find-rides`,
          {
            source_address: from,
            destination_address: to,
            ride_date: date,
            no_of_seats: passengers,
          },
          {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          },
        );
        const result = response.data;
        setRides(Array.isArray(result.rides) ? result.rides : []);
      } catch (err) {
        console.error("Fetch rides error:", err);
        setApiError("Failed to load rides. Please try again.");
        setRides([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRides();
  }, [from, to, date, passengers]);

  const filtered = rides.filter((r) => {
    if (verifiedOnly && r.is_verified !== "1") return false;
    if (departSlot && getDepartSlot(r.departure_time) !== departSlot)
      return false;
    if (amenityChecks.instant_booking && r.instant_booking !== "yes")
      return false;
    if (amenityChecks.smoking_allowed && r.smoking_allowed !== "yes")
      return false;
    if (amenityChecks.pet_allowed && r.pet_allowed !== "yes") return false;
    if (amenityChecks.max_two_in_back && r.max_two_in_back !== "yes")
      return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "lowest")
      return Number(a.price_per_seat) - Number(b.price_per_seat);
    if (sortBy === "shortest") return a.duration_seconds - b.duration_seconds;
    return (a.departure_time || "").localeCompare(b.departure_time || "");
  });

  const groups = groupByDate(sorted.slice(0, visibleCount));

  const clearAll = () => {
    setSortBy("earliest");
    setDepartSlot("");
    setAmenityChecks({ ...DEFAULT_AMENITY_CHECKS });
    setVerifiedOnly(false);
  };

  return (
    <>
      <Header />
      <div className="ridetail-page">
        {/* ── Desktop topbar ── */}
        <div className="ridetail-topbar ridetail-topbar--desktop">
          <div className="ridetail-topbar-inner">
            <SearchRide
              initialFrom={from}
              initialTo={to}
              initialDate={date}
              initialPassengers={passengers}
            />
          </div>
        </div>

        {/* ── Mobile compact bar ── */}
        <div className="ridetail-topbar--mobile">
          <MobileSearchBar
            from={from}
            to={to}
            date={date}
            passengers={passengers}
            onFilterClick={() => setFilterOpen(true)}
          />
        </div>

        <div className="ridetail-body">
          {/* ── Sidebar (desktop) ── */}
          <aside className="ridetail-sidebar">
            <div className="ridetail-sidebar-head">
              <span className="ridetail-sidebar-title">Filter</span>
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
                      type="radio"
                      className="ridetail-radio"
                      name="depart-slot"
                      checked={departSlot === SLOT_MAP[d.id]}
                      onChange={() => setDepartSlot(SLOT_MAP[d.id])}
                    />
                    <span className="ridetail-check-label">{d.label}</span>
                  </label>
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
                  <span className="ridetail-verified-badge">
                    <img src={varifiedBedge} alt="" loading="lazy" />
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
                </div>
              ))}
            </FilterSection>
          </aside>

          {/* ── Results ── */}
          <main>
            {/* Mobile filter drawer */}
            <MobileSidebar
              open={filterOpen}
              setOpen={setFilterOpen}
              sortBy={sortBy}
              setSortBy={setSortBy}
              departSlot={departSlot}
              setDepartSlot={setDepartSlot}
              verifiedOnly={verifiedOnly}
              setVerifiedOnly={setVerifiedOnly}
              amenityChecks={amenityChecks}
              setAmenityChecks={setAmenityChecks}
              clearAll={clearAll}
            />

            <div className="ridetail-results">
              {loading && (
                <div className="ridetail-empty">Loading rides...</div>
              )}
              {!loading && apiError && (
                <div className="ridetail-empty">{apiError}</div>
              )}
              {!loading && !apiError && groups.length === 0 && (
                <>
                  <div className="notfoundride">
                    <img
                      src={rideNotFound}
                      alt="ride unavilable"
                      height="100%"
                      width="100%"
                      loading="lazy"
                    />
                  </div>
                </>
              )}
              {!loading &&
                !apiError &&
                groups.map((group) => (
                  <div key={group.date} className="ridetail-date-group">
                    <div className="ridetail-date-header">
                      <span className="ridetail-date-label">{group.date}</span>
                      <span className="ridetail-date-route">{group.route}</span>
                    </div>
                    {group.rides.map((ride) => (
                      <RideCard key={ride.id} ride={ride} />
                    ))}
                  </div>
                ))}
            </div>

            {visibleCount < sorted.length && (
              <div className="ridetail-load-wrap">
                <button
                  type="button"
                  className="ridetail-load-btn"
                  onClick={() => setVisibleCount((n) => n + 4)}
                >
                  Load more results
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

// ── Mobile Sidebar ────────────────────────────────────────────────────────────

function MobileSidebar({
  open,
  setOpen,
  sortBy,
  setSortBy,
  departSlot,
  setDepartSlot,
  verifiedOnly,
  setVerifiedOnly,
  amenityChecks,
  setAmenityChecks,
  clearAll,
}) {
  return (
    <>
      {open && (
        <>
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "rgba(11,22,41,0.45)",
            }}
            onClick={() => setOpen(false)}
          />
          <div className="ridetail-mobile-sidebar">
            <div className="ridetail-mobile-sidebar-head">
              <span className="ridetail-sidebar-title">Filters &amp; Sort</span>
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
                ></button>
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
                      type="radio"
                      className="ridetail-radio"
                      name="depart-slot-m"
                      checked={departSlot === SLOT_MAP[d.id]}
                      onChange={() => setDepartSlot(SLOT_MAP[d.id])}
                    />
                    <span className="ridetail-check-label">{d.label}</span>
                  </label>
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
                  <span className="ridetail-check-label">Verified Profile</span>
                </label>
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
                </div>
              ))}
            </FilterSection>
          </div>
        </>
      )}
    </>
  );
}
