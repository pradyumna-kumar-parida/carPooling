import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── City dataset ─────────────────────────────────────────────────────────────
const ALL_CITIES = [
  { name: "Chennai", state: "Tamil Nadu" },
  { name: "Chandigarh", state: "Punjab" },
  { name: "Lucknow", state: "Uttar Pradesh" },
  { name: "Kochi", state: "Kerala" },
  { name: "Mumbai", state: "Maharashtra" },
  { name: "Delhi", state: "Delhi" },
  { name: "Bengaluru", state: "Karnataka" },
  { name: "Hyderabad", state: "Telangana" },
  { name: "Pune", state: "Maharashtra" },
  { name: "Ahmedabad", state: "Gujarat" },
  { name: "Jaipur", state: "Rajasthan" },
  { name: "Kolkata", state: "West Bengal" },
  { name: "Surat", state: "Gujarat" },
  { name: "Bhubaneswar", state: "Odisha" },
  { name: "Nagpur", state: "Maharashtra" },
];

// ── Icon components ───────────────────────────────────────────────────────────
const PinIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="10" r="3" />
    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z" />
  </svg>
);

const DestIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
);

const CalIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const UserIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MinusIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// ── Location Dropdown ─────────────────────────────────────────────────────────
function LocationDropdown({ value, onChange, placeholder, icon, fieldKey }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const ref = useRef(null);

  const filtered =
    query.trim().length === 0
      ? ALL_CITIES
      : ALL_CITIES.filter(
          (c) =>
            c.name.toLowerCase().startsWith(query.toLowerCase()) ||
            c.state.toLowerCase().includes(query.toLowerCase()),
        );

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = (city) => {
    onChange(city.name);
    setQuery(city.name);
    setOpen(false);
  };

  return (
    <div className="fr-field" ref={ref}>
      <span className="fr-field-icon">{icon}</span>
      <input
        type="text"
        className="fr-field-input"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
      />
      <AnimatePresence>
        {open && (
          <motion.div
            className="fr-loc-dropdown"
            initial={{ opacity: 0, y: -8, scaleY: 0.92 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.92 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {filtered.length === 0 ? (
              <div className="fr-loc-empty">No cities found</div>
            ) : (
              filtered.map((city, i) => (
                <motion.div
                  key={city.name}
                  className="fr-loc-item"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onMouseDown={() => select(city)}
                >
                  <span className="fr-loc-pin">
                    <PinIcon />
                  </span>
                  <span className="fr-loc-name">{city.name}</span>
                  <span className="fr-loc-state">{city.state}</span>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Passenger Selector ────────────────────────────────────────────────────────
function PassengerField({ count, setCount }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      className="fr-field fr-field-passenger"
      ref={ref}
      onClick={() => setOpen((o) => !o)}
    >
      <span className="fr-field-icon">
        <UserIcon />
      </span>
      <span className="fr-field-value">
        {count} {count === 1 ? "passenger" : "passengers"}
      </span>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fr-pax-popup"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="fr-pax-row">
              <span className="fr-pax-label">Passengers</span>
              <div className="fr-pax-counter">
                <button
                  className="fr-pax-btn"
                  onClick={() => setCount((n) => Math.max(1, n - 1))}
                  disabled={count <= 1}
                >
                  <MinusIcon />
                </button>
                <span className="fr-pax-count">{count}</span>
                <button
                  className="fr-pax-btn"
                  onClick={() => setCount((n) => Math.min(8, n + 1))}
                  disabled={count >= 8}
                >
                  <PlusIcon />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Date Field ────────────────────────────────────────────────────────────────
function DateField({ name, value, onChange, placeholder, icon }) {
  const inputRef = useRef(null);
  return (
    <div className="fr-field" onClick={() => inputRef.current?.showPicker?.()}>
      <span className="fr-field-icon">{icon}</span>
      <input
        ref={inputRef}
        type="date"
        name={name}
        className="fr-field-input fr-date-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {!value && <span className="fr-date-placeholder">{placeholder}</span>}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
const FRSearchBar = () => {
  const [leaving, setLeaving] = useState("");
  const [going, setGoing] = useState("");
  const [date, setDate] = useState("");
 
  const [passengers, setPassengers] = useState(1);
  const [showStays, setShowStays] = useState(false);

  const handleSearch = () => {
    console.log("Search:", {
      leaving,
      going,
      date,
    
      passengers,
      showStays,
    });
  };

  return (
    <>
      <motion.section
        className="fr-search-section"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="fr-search-wrapper">
          <motion.h1
            className="fr-page-title"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            Find a ride
          </motion.h1>

          <motion.div
            className="fr-search-container"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <div className="fr-search-bar">
              {/* Leaving From */}
              <LocationDropdown
                value={leaving}
                onChange={setLeaving}
                placeholder="Leaving from"
                icon={<PinIcon />}
                fieldKey="leaving"
              />

              {/* Going To */}
              <LocationDropdown
                value={going}
                onChange={setGoing}
                placeholder="Going to"
                icon={<DestIcon />}
                fieldKey="going"
              />

              {/* Date */}
              <DateField
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                icon={<CalIcon />}
              />

            
              {/* Passengers */}
              <PassengerField count={passengers} setCount={setPassengers} />

              {/* Search Button */}
              <motion.button
                className="fr-search-btn"
                onClick={handleSearch}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <SearchIcon />
                Search
              </motion.button>
            </div>

            {/* Show Stays */}
            <motion.div
              className="fr-checkbox-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <label className="fr-checkbox-label">
                <input
                  type="checkbox"
                  className="fr-checkbox"
                  checked={showStays}
                  onChange={(e) => setShowStays(e.target.checked)}
                />
                <span className="fr-checkbox-text">Show stays</span>
              </label>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default FRSearchBar;
