import React, { useState } from "react";
import { motion } from "framer-motion";
import { CiLocationOn } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { CgArrowsExchangeV } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { IoTimerOutline } from "react-icons/io5";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaSmoking } from "react-icons/fa";
import { GiCometSpark } from "react-icons/gi";
import { FaUserGroup } from "react-icons/fa6";
const PRHero = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [seats, setSeats] = useState(1);
  const [swapped, setSwapped] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [prefs, setPrefs] = useState({
    pets: false,
    smoking: false,
    instant: false,
    maxTwo: false,
  });
  const handleSwap = () => {
    setSwapped(!swapped);
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <section className="prh-root">
      {/* Background decoration */}
      <div className="prh-bg-blur prh-bg-blur--1" />
      <div className="prh-bg-blur prh-bg-blur--2" />

      <div className="prh-inner">
        {/* LEFT — Form card */}
        <motion.div
          className="prh-card"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="prh-card-badge">
            <span className="prh-badge-dot" />
            Live rides available
          </div>

          <h2 className="prh-card-title">Offer a Ride</h2>
          <p className="prh-card-sub">Shared journeys, split costs</p>

          <div className="prh-route-wrap">
            {/* From */}
            <div className="prh-field">
              <span className="prh-field-icon prh-field-icon--from">
                <CiLocationOn />
              </span>
              <input
                className="prh-input"
                type="text"
                placeholder="Leaving from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>

            {/* Swap */}
            <button
              className={`prh-swap-btn ${swapped ? "prh-swap-btn--active" : ""}`}
              onClick={handleSwap}
              aria-label="Swap cities"
            >
              <CgArrowsExchangeV />
            </button>

            {/* To */}
            <div className="prh-field">
              <span className="prh-field-icon prh-field-icon--to">
                <FaLocationDot />
              </span>
              <input
                className="prh-input"
                type="text"
                placeholder="Going to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
          </div>
          {/* Date & Time Row */}
          <div className="prh-datetime-row">
            <div className="prh-field prh-field--inline">
              <span className="prh-field-icon prh-field-icon--from">
                <SlCalender />
              </span>
              <input
                className="prh-input"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="prh-field prh-field--inline">
              <span className="prh-field-icon prh-field-icon--to">
                <IoTimerOutline />
              </span>
              <input
                className="prh-input"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          {/* Seats */}
          <div className="prh-seats-row">
            <span className="prh-seats-label">
              <FaRegUser />
              Seats
            </span>
            <div className="prh-seats-ctrl">
              <button
                className="prh-seats-btn"
                onClick={() => setSeats((s) => Math.max(1, s - 1))}
                aria-label="Decrease"
              >
                −
              </button>
              <span className="prh-seats-val">{seats}</span>
              <button
                className="prh-seats-btn"
                onClick={() => setSeats((s) => Math.min(8, s + 1))}
                aria-label="Increase"
              >
                +
              </button>
            </div>
          </div>
          {/* Price per seat */}
          <div className="prh-field prh-field--price">
            <span className="prh-field-icon prh-field-icon--from">
              <HiOutlineCurrencyDollar />
            </span>

            <input
              className="prh-input"
              type="number"
              placeholder="Price per seat"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <span className="prh-price-suffix">/ seat</span>
          </div>

          {/* Preferences checkboxes */}
          <div className="prh-prefs-group">
            <p className="prh-prefs-label">Ride preferences</p>
            <div className="prh-prefs-grid">
              {[
                {
                  key: "pets",
                  icon: <IoFastFoodSharp />,
                  label: "Pets allowed",
                },
                {
                  key: "smoking",
                  icon: <FaSmoking />,
                  label: "Smoking allowed",
                },
                {
                  key: "instant",
                  icon: <GiCometSpark />,
                  label: "Instant booking",
                },
                {
                  key: "maxTwo",
                  icon: <FaUserGroup />,
                  label: "Max 2 in back",
                },
              ].map(({ key, icon, label }) => (
                <label
                  key={key}
                  className={`prh-pref-chip ${prefs[key] ? "prh-pref-chip--on" : ""}`}
                >
                  <input
                    type="checkbox"
                    className="prh-pref-hidden-check"
                    checked={prefs[key]}
                    onChange={() => setPrefs((p) => ({ ...p, [key]: !p[key] }))}
                  />
                  <span className="prh-pref-icon">{icon}</span>
                  <span className="prh-pref-text">{label}</span>
                  <span className="prh-pref-tick">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Savings pill */}
          <div className="prh-savings">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            Save up to <strong>₹1,624</strong> on your first ride
          </div>

          <motion.button className="prh-cta" whileTap={{ scale: 0.98 }}>
            <span>Publish a ride</span>
          </motion.button>
        </motion.div>

        {/* RIGHT — Hero copy */}
        <motion.div
          className="prh-copy"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          <motion.div
            className="prh-tag"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            Trusted by 27M+ travellers
          </motion.div>

          <motion.h1
            className="prh-headline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Travel smarter. Become a carpooling driver and save on travel costs.
            <br />
            <span className="prh-headline-accent">Share the ride.</span>
          </motion.h1>

          <motion.p
            className="prh-desc"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            Connect with drivers heading your way. Split fuel costs, reduce
            emissions, and arrive happier — every single journey.
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="prh-stats"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {[
              { val: "27M+", label: "Members" },
              { val: "600K+", label: "Daily rides" },
              { val: "22", label: "Countries" },
            ].map((s) => (
              <div className="prh-stat" key={s.label}>
                <span className="prh-stat-val">{s.val}</span>
                <span className="prh-stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Road SVG decoration */}
          <motion.div
            className="prh-road-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <svg
              className="prh-road-svg"
              viewBox="0 0 400 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Road surface */}
              <rect
                x="0"
                y="60"
                width="400"
                height="40"
                rx="6"
                fill="#dbeafe"
              />
              {/* Center dashes */}
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <rect
                  key={i}
                  x={20 + i * 55}
                  y="78"
                  width="30"
                  height="5"
                  rx="2.5"
                  fill="#93c5fd"
                />
              ))}
              {/* Car body */}
              <rect
                x="130"
                y="30"
                width="100"
                height="38"
                rx="10"
                fill="#1e40af"
              />
              <path
                d="M150 30 Q160 12 180 12 L210 12 Q225 12 230 30"
                fill="#1e40af"
              />
              {/* Windows */}
              <rect
                x="154"
                y="18"
                width="28"
                height="16"
                rx="4"
                fill="#bfdbfe"
              />
              <rect
                x="192"
                y="18"
                width="25"
                height="16"
                rx="4"
                fill="#bfdbfe"
              />
              {/* Headlight */}
              <ellipse cx="228" cy="46" rx="5" ry="4" fill="#fef9c3" />
              {/* Tail light */}
              <ellipse cx="132" cy="46" rx="4" ry="3" fill="#fca5a5" />
              {/* Wheels */}
              <circle cx="155" cy="70" r="13" fill="#1e293b" />
              <circle cx="155" cy="70" r="6" fill="#475569" />
              <circle cx="215" cy="70" r="13" fill="#1e293b" />
              <circle cx="215" cy="70" r="6" fill="#475569" />
              {/* Passengers dots */}
              <circle cx="175" cy="24" r="4" fill="#60a5fa" />
              <circle cx="195" cy="24" r="4" fill="#60a5fa" />
              <circle cx="212" cy="24" r="4" fill="#93c5fd" />
              {/* Exhaust */}
              <path
                d="M130 52 Q118 50 110 44 Q102 38 96 30"
                stroke="#bfdbfe"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="4 3"
              />
              {/* Road lines ahead */}
              <path
                d="M240 80 Q310 78 390 82"
                stroke="#93c5fd"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="8 6"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PRHero;
