import React, { useEffect, useState, useRef } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { CgArrowsExchangeV } from "react-icons/cg";
import { MdAirlineSeatLegroomReduced, MdMyLocation } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import { IoFastFoodSharp, IoTimerOutline } from "react-icons/io5";
import { FaSmoking } from "react-icons/fa";
import { GiCometSpark } from "react-icons/gi";
import { FaUserGroup } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { FaCarAlt } from "react-icons/fa";

import ArcLoader from "../../../components/Loader";
import { API_BASE_URL } from "../../../utils/api";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
let _scriptLoaded = false;
let _scriptLoading = false;
const _scriptCallbacks = [];

function loadGoogleScript() {
  return new Promise((resolve, reject) => {
    if (window.google?.maps?.places) {
      resolve();
      return;
    }
    if (_scriptLoading) {
      _scriptCallbacks.push({ resolve, reject });
      return;
    }
    _scriptLoading = true;
    _scriptCallbacks.push({ resolve, reject });
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places&language=en`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      _scriptLoaded = true;
      _scriptLoading = false;
      _scriptCallbacks.forEach((cb) => cb.resolve());
      _scriptCallbacks.length = 0;
    };
    script.onerror = () => {
      _scriptLoading = false;
      _scriptCallbacks.forEach((cb) =>
        cb.reject(new Error("Google Maps failed to load")),
      );
      _scriptCallbacks.length = 0;
    };
    document.head.appendChild(script);
  });
}

const PinIcon = () => (
  <svg
    width="15"
    height="15"
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

function LocationDropdown({
  placeholder,
  icon,
  value,
  onSelect,
  showCurrentLocation = false,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value?.name || "");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);
  const [selected, setSelected] = useState(!!value);
  const [focused, setFocused] = useState(false);
  const serviceRef = useRef(null);
  const debounceRef = useRef(null);
  const ref = useRef(null);

  useEffect(() => {
    loadGoogleScript()
      .then(() => {
        serviceRef.current =
          new window.google.maps.places.AutocompleteService();
        setGoogleReady(true);
      })
      .catch((err) => console.error("Google Maps load error:", err));
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetchSuggestions = (input) => {
    clearTimeout(debounceRef.current);
    if (!input || input.trim().length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(() => {
      if (!serviceRef.current) return;
      serviceRef.current.getPlacePredictions(
        {
          input: input.trim(),
          componentRestrictions: { country: "in" },
          types: ["establishment", "geocode"],
        },
        (predictions, status) => {
          setLoading(false);
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          )
            setSuggestions(predictions);
          else setSuggestions([]);
        },
      );
    }, 400);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setSelected(false);
    setOpen(true);
    fetchSuggestions(val);
    if (!val) onSelect(null);
  };

  const handleSelect = async (prediction) => {
    // const cityName =
    //   prediction.structured_formatting?.main_text || prediction.description;
    const cityName = prediction.description;
    setQuery(cityName);
    setSuggestions([]);
    setOpen(false);
    setSelected(true);
    try {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ placeId: prediction.place_id }, (results, status) => {
        if (status === "OK" && results[0]) {
          const loc = results[0].geometry.location;
          onSelect({
            name: cityName,
            fullAddress: prediction.description,
            placeId: prediction.place_id,
            lat: loc.lat(),
            lng: loc.lng(),
          });
        } else {
          onSelect({
            name: cityName,
            fullAddress: prediction.description,
            placeId: prediction.place_id,
            lat: null,
            lng: null,
          });
        }
      });
    } catch (err) {
      console.error("Geocode error:", err);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setQuery("");
    setSelected(false);
    setSuggestions([]);
    onSelect(null);
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          setLocating(false);
          if (status === "OK" && results[0]) {
            const cityComponent = results[0].address_components?.find((c) =>
              c.types.includes("locality"),
            );
            const cityName = cityComponent?.long_name || "Current Location";
            setQuery(cityName);
            setOpen(false);
            setSelected(true);
            onSelect({
              name: cityName,
              fullAddress: results[0].formatted_address,
              placeId: results[0].place_id,
              lat,
              lng,
            });
          } else {
            setLocating(false);
          }
        });
      },
      (err) => {
        console.error("Geolocation error:", err);
        setLocating(false);
      },
    );
  };

  const showDropdown =
    open &&
    (loading ||
      suggestions.length > 0 ||
      showCurrentLocation ||
      (query.length >= 2 && !loading));

  return (
    <div
      className={`prh-field prh-field--loc${focused ? " prh-field--focused" : ""}`}
      ref={ref}
    >
      <span className="prh-field-icon prh-field-icon--from">{icon}</span>
      <input
        className="prh-input"
        type="text"
        placeholder={placeholder}
        value={query}
        autoComplete="off"
        onChange={handleInputChange}
        onFocus={() => {
          setOpen(true);
          setFocused(true);
        }}
        onBlur={() => setFocused(false)}
        disabled={!googleReady}
      />
      {selected && query && (
        <button
          className="prh-field-clear"
          onMouseDown={handleClear}
          tabIndex={-1}
        >
          <RxCross2 size={15} />
        </button>
      )}
      {showDropdown && (
        <div className="prh-loc-dropdown">
          {showCurrentLocation && (
            <div
              className="prh-loc-item prh-loc-current"
              onMouseDown={handleCurrentLocation}
            >
              <span className="prh-loc-pin prh-loc-pin-blue">
                <MdMyLocation />
              </span>
              <span className="prh-loc-name">
                {locating
                  ? "Detecting your location..."
                  : "Use current location"}
              </span>
            </div>
          )}
          {loading && <div className="prh-loc-empty">Searching...</div>}
          {!loading &&
            suggestions.map((s) => (
              <div
                key={s.place_id}
                className="prh-loc-item"
                onMouseDown={() => handleSelect(s)}
              >
                <span className="prh-loc-pin">
                  <PinIcon />
                </span>
                <span className="prh-loc-name">
                  {s.structured_formatting?.main_text || s.description}
                </span>
                <span className="prh-loc-state">
                  {s.structured_formatting?.secondary_text || ""}
                </span>
              </div>
            ))}
          {!loading && suggestions.length === 0 && query.trim().length >= 2 && (
            <div className="prh-loc-empty">No places found</div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Page Loader ───────────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <<ArcLoader /> */}
      <ArcLoader />
    </div>
  );
}

const PRHero = () => {
  const navigate = useNavigate();

  // form state
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [seats, setSeats] = useState(1);
  const [swapped, setSwapped] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [prefs, setPrefs] = useState({
    pets: false,
    smoking: false,
    instant: false,
    maxTwo: false,
  });
  const token = localStorage.getItem("token");

  // vehicles
  const [vehicles, setVehicles] = useState([]);
  const [vehiclesLoading, setVehiclesLoading] = useState(false);

  // submission
  const [loading, setLoading] = useState(false);

  // snackbar
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");
  const alertTimerRef = useRef(null);

  const showAlert = (severity, message) => {
    clearTimeout(alertTimerRef.current);
    setAlertType(severity);
    setAlertMessage(message);
    setOpenAlert(true);
    alertTimerRef.current = setTimeout(() => setOpenAlert(false), 5000);
  };

  // swap handler
  const handleSwap = () => {
    setSwapped(!swapped);
    const temp = from;
    setFrom(to);
    setTo(temp);
  };
  // fetch vehicles
  useEffect(() => {
    const fetchVehicles = async () => {
      setVehiclesLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}vehicles`, {
          headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        });
        setVehicles(response.data?.data || response.data || []);
      } catch (error) {
        const msg =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to load vehicles.";
        // showAlert("warning", msg);
      } finally {
        setVehiclesLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  // publish ride
  const handlePublish = async () => {
    // auth check

    if (!token) {
      navigate("/login");
      return;
    }
    if (vehicles.length < 1) {
      showAlert("error", "Please register a vehicle to publish a ride ");
      setTimeout(() => {
        navigate("/vehicle-registration");
      }, 2000);
      return;
    }
    // validation
    if (!from) return showAlert("error", "Please select a departure location.");
    if (!to) return showAlert("error", "Please select a destination.");
    if (!date) return showAlert("error", "Please select a travel date.");
    if (!time) return showAlert("error", "Please select a departure time.");
    if (!price || isNaN(price) || Number(price) <= 0)
      return showAlert("error", "Please enter a valid price per seat.");

    if (!selectedVehicle) return showAlert("error", "Please choose a vehicle.");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const driverId = user?.id || "";

    const payload = {
      driver_id: driverId,
      vehicle_id: selectedVehicle,
      source_address: from.fullAddress,
      destination_address: to.fullAddress,
      source_lat: from.lat,
      source_lng: from.lng,
      destination_lat: to.lat,
      destination_lng: to.lng,
      ride_date: date,
      departure_time: time,
      price_per_seat: price,
      total_seats: seats,
      pet_allowed: prefs.pets === true ? "yes" : "no",
      smoking_allowed: prefs.smoking === true ? "yes" : "no",
      instant_booking: prefs.instant === true ? "yes" : "no",
      max_two_in_back: prefs.maxTwo === true ? "yes" : "no",
      source_place_id: from.placeId,
      destination_place_id: to.placeId,
    };

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}store-ride-data`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const { status, message = "Ride published successfully!" } =
        response.data;
      showAlert(status === "success" ? "success" : "info", message);

      if (status === "success") {
        // reset form
        setFrom("");
        setTo("");
        setDate("");
        setTime("");
        setPrice("");
        setSeats(1);
        setSelectedVehicle("");
        setPrefs({
          pets: false,
          smoking: false,
          instant: false,
          maxTwo: false,
        });
      }
    } catch (error) {
      const apiMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong. Please try again.";
      showAlert("error", apiMessage);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
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

      {loading && <PageLoader />}

      <section className="prh-root">
        <div className="prh-bg-blur prh-bg-blur--1" />
        <div className="prh-bg-blur prh-bg-blur--2" />

        <div className="prh-inner">
          {/* LEFT — Form card */}
          <div className="prh-card">
            <div className="prh-card-badge">
              <span className="prh-badge-dot" />
              Live rides available
            </div>

            <h2 className="prh-card-title">Offer a Ride</h2>
            <p className="prh-card-sub">Shared journeys, split costs</p>

            {/* Route */}
            <div className="prh-route-wrap">
              <LocationDropdown
                placeholder="Leaving from"
                icon={<CiLocationOn />}
                value={from}
                onSelect={setFrom}
                showCurrentLocation={true}
              />

              <button
                className={`prh-swap-btn ${swapped ? "prh-swap-btn--active" : ""}`}
                onClick={handleSwap}
                aria-label="Swap cities"
              >
                <CgArrowsExchangeV />
              </button>

              <LocationDropdown
                placeholder="Going to"
                icon={<FaLocationDot />}
                value={to}
                onSelect={setTo}
                showCurrentLocation={false}
              />
            </div>

            {/* Date & Time */}
            <div className="prh-datetime-row">
              <div className="underFields">
                <p className="prh-prefs-label">DATE</p>
                <div className="prh-field prh-field--inline prh-field--focusable">
                  <input
                    className="prh-input"
                    type="date"
                    value={date}
                    min={today}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="underFields">
                <p className="prh-prefs-label">TIME</p>
                <div className="prh-field prh-field--inline prh-field--focusable">
                  <input
                    className="prh-input"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Seats */}
            <div className="prh-seats-row">
              <span className="prh-seats-label">
                <MdAirlineSeatLegroomReduced />
                Seats
              </span>
              <div className="prh-seats-ctrl">
                <button
                  type="button"
                  className="prh-seats-btn"
                  onClick={() => setSeats((s) => Math.max(1, s - 1))}
                  disabled={seats <= 1}
                >
                  −
                </button>

                <span className="prh-seats-val">{seats}</span>

                <button
                  type="button"
                  className="prh-seats-btn"
                  onClick={() => setSeats((s) => Math.min(8, s + 1))}
                  disabled={seats >= 8}
                >
                  +
                </button>
              </div>
            </div>

            {/* Price per seat */}
            <div className="prh-field prh-field--price prh-field--focusable">
              <span className="prh-field-icon prh-field-icon--from">
                <BiDollar />
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

            {/* Vehicle chooser */}
            {vehicles.length >= 1 && token && (
              <div className="prh-field prh-field--vehicle prh-field--focusable">
                <span className="prh-field-icon prh-field-icon--from">
                  <FaCarAlt />
                </span>
                <select
                  className="prh-input prh-select"
                  value={selectedVehicle}
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                  disabled={vehiclesLoading}
                >
                  <option value="">
                    {vehiclesLoading
                      ? "Loading vehicles..."
                      : "Choose your vehicle"}
                  </option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.brand}
                      {v.model ? ` ${v.model}` : ""}
                      {v.plate ? ` — ${v.plate}` : ""}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Preferences */}
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
                      onChange={() =>
                        setPrefs((p) => ({ ...p, [key]: !p[key] }))
                      }
                    />
                    <span className="prh-pref-icon">{icon}</span>
                    <span className="prh-pref-text">{label}</span>
                    <span className="prh-pref-tick">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
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
            {/* <div className="prh-savings">
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
            </div> */}

            <button
              className="prh-cta"
              onClick={handlePublish}
              disabled={loading}
            >
              <span>Publish a ride</span>
            </button>
          </div>

          {/* RIGHT — Hero copy */}
          <div className="prh-copy">
            <div className="prh-tag">Trusted by 27M+ travellers</div>

            <h1 className="prh-headline">
              Travel smarter. Become a carpooling driver and save on travel
              costs.
              <br />
              <span className="prh-headline-accent">Share the ride.</span>
            </h1>

            <p className="prh-desc">
              Connect with drivers heading your way. Split fuel costs, reduce
              emissions, and arrive happier — every single journey.
            </p>

            <div className="prh-stats">
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
            </div>

            <div className="prh-road-wrap">
              <svg
                className="prh-road-svg"
                viewBox="0 0 400 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0"
                  y="60"
                  width="400"
                  height="40"
                  rx="6"
                  fill="#dbeafe"
                />
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
                <ellipse cx="228" cy="46" rx="5" ry="4" fill="#fef9c3" />
                <ellipse cx="132" cy="46" rx="4" ry="3" fill="#fca5a5" />
                <circle cx="155" cy="70" r="13" fill="#1e293b" />
                <circle cx="155" cy="70" r="6" fill="#475569" />
                <circle cx="215" cy="70" r="13" fill="#1e293b" />
                <circle cx="215" cy="70" r="6" fill="#475569" />
                <circle cx="175" cy="24" r="4" fill="#60a5fa" />
                <circle cx="195" cy="24" r="4" fill="#60a5fa" />
                <circle cx="212" cy="24" r="4" fill="#93c5fd" />
                <path
                  d="M130 52 Q118 50 110 44 Q102 38 96 30"
                  stroke="#bfdbfe"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray="4 3"
                />
                <path
                  d="M240 80 Q310 78 390 82"
                  stroke="#93c5fd"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="8 6"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PRHero;
