// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { MdMyLocation } from "react-icons/md";
// import { RxCross2 } from "react-icons/rx";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { API_BASE_URL } from "../../../utils/api";

// // ── Icons ─────────────────────────────────────────────────────────────────────

// const PinIcon = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="10" r="3" />
//     <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z" />
//   </svg>
// );
// const DestIcon = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <polygon points="3 11 22 2 13 21 11 13 3 11" />
//   </svg>
// );
// const CalIcon = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="3" y="4" width="18" height="18" rx="2" />
//     <line x1="16" y1="2" x2="16" y2="6" />
//     <line x1="8" y1="2" x2="8" y2="6" />
//     <line x1="3" y1="10" x2="21" y2="10" />
//   </svg>
// );
// const UserIcon = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//     <circle cx="12" cy="7" r="4" />
//   </svg>
// );
// const MinusIcon = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//   >
//     <line x1="5" y1="12" x2="19" y2="12" />
//   </svg>
// );
// const PlusIcon = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//   >
//     <line x1="12" y1="5" x2="12" y2="19" />
//     <line x1="5" y1="12" x2="19" y2="12" />
//   </svg>
// );
// const SearchIcon = () => (
//   <svg
//     width="18"
//     height="18"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//   >
//     <circle cx="11" cy="11" r="8" />
//     <line x1="21" y1="21" x2="16.65" y2="16.65" />
//   </svg>
// );

// // ── Location Dropdown ─────────────────────────────────────────────────────────

// function LocationDropdown({
//   placeholder,
//   icon,
//   onSelect,
//   showCurrentLocation = false,
//   value,
// }) {
//   const [open, setOpen] = useState(false);
//   const [query, setQuery] = useState(value?.name || "");
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [locating, setLocating] = useState(false);
//   const [selected, setSelected] = useState(false);

//   const debounceRef = useRef(null);
//   const ref = useRef(null);
//   useEffect(() => {
//     setQuery(value?.name || "");
//     setSelected(!!value);
//   }, [value]);
//   const storageKey =
//     placeholder === "Leaving from" ? "from_location" : "to_location";

//   useEffect(() => {
//     const handler = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) setOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const saveToStorage = (data) => {
//     try {
//       localStorage.setItem(storageKey, JSON.stringify(data));
//     } catch (err) {
//       console.error("localStorage error:", err);
//     }
//   };

//   const fetchSuggestions = (input) => {
//     clearTimeout(debounceRef.current);

//     if (!input || input.trim().length < 2) {
//       setSuggestions([]);
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     debounceRef.current = setTimeout(async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.post(
//           `${API_BASE_URL}search-locaton`,
//           { keyword: input.trim() },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               ...(token ? { Authorization: `Bearer ${token}` } : {}),
//             },
//           },
//         );

//         const results = Array.isArray(response.data) ? response.data : [];

//         setSuggestions(results);
//       } catch (err) {
//         console.error("Location search error:", err);
//         setSuggestions([]);
//       } finally {
//         setLoading(false);
//       }
//     }, 400);
//   };

//   const handleInputChange = (e) => {
//     const val = e.target.value;
//     setQuery(val);
//     setSelected(false);
//     setOpen(true);
//     fetchSuggestions(val);
//   };

//   const handleSelect = (item) => {
//     const name =
//       typeof item === "string"
//         ? item
//         : item.name || item.city || item.label || "";
//     setQuery(name);
//     setSuggestions([]);
//     setOpen(false);
//     setSelected(true);

//     const data = {
//       name,
//       fullAddress:
//         item.full_address || item.address || item.description || name,
//       lat: item.lat || item.latitude || null,
//       lng: item.lng || item.longitude || null,
//     };

//     saveToStorage(data);
//     onSelect(data);
//   };

//   // Clear the field
//   const handleClear = (e) => {
//     e.stopPropagation();
//     setQuery("");
//     setSelected(false);
//     setSuggestions([]);
//     onSelect(null);
//     try {
//       localStorage.removeItem(storageKey);
//     } catch (err) {
//       console.error("localStorage error:", err);
//     }
//   };

//   // const handleCurrentLocation = () => {
//   //   if (!navigator.geolocation) return;
//   //   setLocating(true);
//   //   navigator.geolocation.getCurrentPosition(
//   //     async (position) => {
//   //       const { latitude: lat, longitude: lng } = position.coords;
//   //       try {

//   //         const res = await fetch(
//   //           `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
//   //         );
//   //         const json = await res.json();
//   //         const cityName =
//   //           json.address?.city ||
//   //           json.address?.town ||
//   //           json.address?.village ||
//   //           "Current Location";

//   //         const data = {
//   //           name: cityName,
//   //           fullAddress: json.display_name || cityName,
//   //           lat,
//   //           lng,
//   //         };

//   //         setQuery(cityName);
//   //         setOpen(false);
//   //         setSelected(true);
//   //         saveToStorage(data);
//   //         onSelect(data);
//   //       } catch (err) {
//   //         console.error("Reverse geocode error:", err);
//   //       } finally {
//   //         setLocating(false);
//   //       }
//   //     },
//   //     (err) => {
//   //       console.error("Geolocation error:", err);
//   //       setLocating(false);
//   //     },
//   //   );
//   // };

//   const showDropdown =
//     open &&
//     query.trim().length >= 2 &&
//     (loading || suggestions.length > 0 || (query.length >= 2 && !loading));

//   return (
//     <div className="fr-field" ref={ref}>
//       <span className="fr-field-icon">{icon}</span>
//       <input
//         type="text"
//         className="fr-field-input"
//         placeholder={placeholder}
//         value={query}
//         autoComplete="off"
//         onChange={handleInputChange}
//       />

//       {/* Clear button — shows only after a location is selected */}
//       {selected && query && (
//         <button
//           className="fr-field-clear"
//           onMouseDown={handleClear}
//           tabIndex={-1}
//         >
//           <RxCross2 size={15} />
//         </button>
//       )}

//       <AnimatePresence>
//         {showDropdown && (
//           <motion.div
//             className="fr-loc-dropdown"
//             initial={{ opacity: 0, y: -8, scaleY: 0.92 }}
//             animate={{ opacity: 1, y: 0, scaleY: 1 }}
//             exit={{ opacity: 0, y: -8, scaleY: 0.92 }}
//             transition={{ duration: 0.18, ease: "easeOut" }}
//           >
//             {/* Use current location */}
//             {/* {showCurrentLocation && (
//               <motion.div
//                 className="fr-loc-item fr-loc-current"
//                 initial={{ opacity: 0, x: -6 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 onMouseDown={handleCurrentLocation}
//               >
//                 <span className="fr-loc-pin fr-loc-pin-blue">
//                   <MdMyLocation />
//                 </span>
//                 <span className="fr-loc-name">
//                   {locating
//                     ? "Detecting your location..."
//                     : "Use current location"}
//                 </span>
//               </motion.div>
//             )} */}

//             {/* Loading */}
//             {loading && <div className="fr-loc-empty">Searching...</div>}

//             {!loading &&
//               suggestions.map((item, i) => {
//                 const name =
//                   typeof item === "string"
//                     ? item
//                     : item.name || item.city || "";
//                 return (
//                   <motion.div
//                     key={i}
//                     className="fr-loc-item"
//                     initial={{ opacity: 0, x: -6 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: i * 0.03 }}
//                     onMouseDown={() => handleSelect(item)}
//                   >
//                     <span className="fr-loc-pin">
//                       <PinIcon />
//                     </span>
//                     <span className="fr-loc-name">{name}</span>
//                   </motion.div>
//                 );
//               })}

//             {/* No results */}
//             {!loading &&
//               suggestions.length === 0 &&
//               query.trim().length >= 2 && (
//                 <div className="fr-loc-empty">No places found</div>
//               )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // ── Passenger Selector ────────────────────────────────────────────────────────

// function PassengerField({ count, setCount }) {
//   const [open, setOpen] = useState(false);
//   const ref = useRef(null);

//   useEffect(() => {
//     const handler = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) setOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   return (
//     <div
//       className="fr-field fr-field-passenger"
//       ref={ref}
//       onClick={() => setOpen((o) => !o)}
//     >
//       <span className="fr-field-icon">
//         <UserIcon />
//       </span>
//       <span className="fr-field-value">
//         {count} {count === 1 ? "passenger" : "passengers"}
//       </span>
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             className="fr-pax-popup"
//             initial={{ opacity: 0, y: -8, scale: 0.96 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -8, scale: 0.96 }}
//             transition={{ duration: 0.18, ease: "easeOut" }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="fr-pax-row">
//               <span className="fr-pax-label">Passengers</span>
//               <div className="fr-pax-counter">
//                 <button
//                   className="fr-pax-btn"
//                   onClick={() => setCount((n) => Math.max(1, n - 1))}
//                   disabled={count <= 1}
//                 >
//                   <MinusIcon />
//                 </button>
//                 <span className="fr-pax-count">{count}</span>
//                 <button
//                   className="fr-pax-btn"
//                   onClick={() => setCount((n) => Math.min(8, n + 1))}
//                   disabled={count >= 8}
//                 >
//                   <PlusIcon />
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // ── Date Field ────────────────────────────────────────────────────────────────

// function DateField({ name, value, onChange, icon }) {
//   const inputRef = useRef(null);
//   const today = new Date().toISOString().split("T")[0];
//   return (
//     <div className="fr-field" onClick={() => inputRef.current?.showPicker?.()}>
//       <span className="fr-field-icon">{icon}</span>
//       <input
//         ref={inputRef}
//         type="date"
//         name={name}
//         className="fr-field-input fr-date-input"
//         value={value}
//         min={today}
//         onChange={onChange}
//       />
//     </div>
//   );
// }

// // ── Main Component ────────────────────────────────────────────────────────────

// const FRSearchBar = ({
//   initialFrom,
//   initialTo,
//   initialDate,
//   initialPassengers,
// }) => {
//   const [leaving, setLeaving] = useState(initialFrom);
//   const [going, setGoing] = useState(initialTo);
//   const [date, setDate] = useState(initialDate);
//   const [passengers, setPassengers] = useState(initialPassengers || 1);
//   const [error, setError] = useState("");
// console.log("living",leaving);
// console.log("going",going);
// console.log("date",date);
// console.log("pass",passengers);
// // Add this inside FRSearchBar, after your useState declarations
// useEffect(() => {
//   if (initialFrom) setLeaving(initialFrom);
// }, [initialFrom]);

// useEffect(() => {
//   if (initialTo) setGoing(initialTo);
// }, [initialTo]);

// useEffect(() => {
//   if (initialDate) setDate(initialDate);
// }, [initialDate]);

// useEffect(() => {
//   if (initialPassengers) setPassengers(initialPassengers);
// }, [initialPassengers]);
//   const navigate = useNavigate();

//   const handleSearch = () => {
//     if (!leaving || !going) {
//       setError("Please select both departure and destination cities.");
//       return;
//     }
//     if (!date) {
//       setError("Please select a travel date.");
//       return;
//     }
//     setError("");

//     const payload = {
//       from: leaving,
//       to: going,
//       date,
//       passengers,
//     };

//     navigate(
//       `/all-rides?from=${encodeURIComponent(leaving.name)}&to=${encodeURIComponent(going.name)}&date=${date}&passengers=${passengers}`,
//     );
//   };

//   return (
//     <motion.section
//       className="fr-search-section"
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="fr-search-wrapper">
//         <motion.div
//           className="fr-search-container"
//           initial={{ opacity: 0, scale: 0.97 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.25, duration: 0.4 }}
//         >
//           <div className="fr-search-bar">
//             <LocationDropdown
//               placeholder="Leaving from"
//               icon={<PinIcon />}
//               onSelect={setLeaving}
//               showCurrentLocation={true}
//               value={leaving}
//             />

//             <LocationDropdown
//               placeholder="Going to"
//               icon={<DestIcon />}
//               onSelect={setGoing}
//               showCurrentLocation={false}
//               value={going}
//             />
//             <DateField
//               name="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               icon={<CalIcon />}
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />
//             <PassengerField count={passengers} setCount={setPassengers} />
//             <motion.button
//               className="fr-search-btn"
//               onClick={handleSearch}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.97 }}
//             >
//               <SearchIcon />
//               Search
//             </motion.button>
//           </div>

//           {error && (
//             <motion.p
//               className="fr-error"
//               initial={{ opacity: 0, y: -4 }}
//               animate={{ opacity: 1, y: 0 }}
//             >
//               {error}
//             </motion.p>
//           )}
//         </motion.div>
//       </div>
//     </motion.section>
//   );
// };

// export default FRSearchBar;
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdMyLocation } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../utils/api";

// ── Icons ─────────────────────────────────────────────────────────────────────

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

function LocationDropdown({
  placeholder,
  icon,
  onSelect,
  showCurrentLocation = false,
  value,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value?.name || "");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);

  const debounceRef = useRef(null);
  const ref = useRef(null);

  useEffect(() => {
    setQuery(value?.name || "");
    setSelected(!!value);
  }, [value]);

  const storageKey =
    placeholder === "Leaving from" ? "from_location" : "to_location";

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const saveToStorage = (data) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (err) {
      console.error("localStorage error:", err);
    }
  };

  const fetchSuggestions = (input) => {
    clearTimeout(debounceRef.current);
    if (!input || input.trim().length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${API_BASE_URL}search-locaton`,
          { keyword: input.trim() },
          {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          },
        );
        const results = Array.isArray(response.data) ? response.data : [];
        setSuggestions(results);
      } catch (err) {
        console.error("Location search error:", err);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setSelected(false);
    setOpen(true);
    fetchSuggestions(val);
  };

  const handleSelect = (item) => {
    const name =
      typeof item === "string"
        ? item
        : item.name || item.city || item.label || "";
    setQuery(name);
    setSuggestions([]);
    setOpen(false);
    setSelected(true);
    const data = {
      name,
      fullAddress:
        item.full_address || item.address || item.description || name,
      lat: item.lat || item.latitude || null,
      lng: item.lng || item.longitude || null,
    };
    saveToStorage(data);
    onSelect(data);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setQuery("");
    setSelected(false);
    setSuggestions([]);
    onSelect(null);
    try {
      localStorage.removeItem(storageKey);
    } catch (err) {
      console.error("localStorage error:", err);
    }
  };

  const showDropdown =
    open &&
    query.trim().length >= 2 &&
    (loading || suggestions.length > 0 || (query.length >= 2 && !loading));

  return (
    <div className="fr-field" ref={ref}>
      <span className="fr-field-icon">{icon}</span>
      <input
        type="text"
        className="fr-field-input"
        placeholder={placeholder}
        value={query}
        autoComplete="off"
        onChange={handleInputChange}
      />
      {selected && query && (
        <button
          className="fr-field-clear"
          onMouseDown={handleClear}
          tabIndex={-1}
        >
          <RxCross2 size={15} />
        </button>
      )}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            className="fr-loc-dropdown"
            initial={{ opacity: 0, y: -8, scaleY: 0.92 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.92 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {loading && <div className="fr-loc-empty">Searching...</div>}
            {!loading &&
              suggestions.map((item, i) => {
                const name =
                  typeof item === "string"
                    ? item
                    : item.name || item.city || "";
                return (
                  <motion.div
                    key={i}
                    className="fr-loc-item"
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onMouseDown={() => handleSelect(item)}
                  >
                    <span className="fr-loc-pin">
                      <PinIcon />
                    </span>
                    <span className="fr-loc-name">{name}</span>
                  </motion.div>
                );
              })}
            {!loading &&
              suggestions.length === 0 &&
              query.trim().length >= 2 && (
                <div className="fr-loc-empty">No places found</div>
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
function DateField({ name, value, onChange, icon }) {
  const inputRef = useRef(null);
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fr-field" onClick={() => inputRef.current?.showPicker?.()}>
      <span className="fr-field-icon">{icon}</span>

      <input
        ref={inputRef}
        type={value ? "date" : "text"}
        placeholder="dd-mm-yyyy"
        name={name}
        className="fr-field-input fr-date-input"
        value={value}
        min={today}
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => {
          if (!value) e.target.type = "text";
        }}
        onChange={onChange}
      />
    </div>
  );
}
// ── Main Component ────────────────────────────────────────────────────────────

const toLocationObj = (val) => {
  if (!val) return null;
  if (typeof val === "string")
    return { name: val, fullAddress: val, lat: null, lng: null };
  return val;
};

const FRSearchBar = ({
  initialFrom,
  initialTo,
  initialDate,
  initialPassengers,
}) => {
  const [leaving, setLeaving] = useState(() => toLocationObj(initialFrom));
  const [going, setGoing] = useState(() => toLocationObj(initialTo));
  const [date, setDate] = useState(initialDate || "");
  const [passengers, setPassengers] = useState(Number(initialPassengers) || 1);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialFrom) setLeaving(toLocationObj(initialFrom));
  }, [initialFrom]);

  useEffect(() => {
    if (initialTo) setGoing(toLocationObj(initialTo));
  }, [initialTo]);

  useEffect(() => {
    if (initialDate) setDate(initialDate);
  }, [initialDate]);

  useEffect(() => {
    if (initialPassengers) setPassengers(Number(initialPassengers));
  }, [initialPassengers]);

  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("hello dostoo");

    if (!leaving || !going) {
      setError("Please select both departure and destination cities.");
      return;
    }

    if (!date) {
      setError("Please select a travel date.");
      return;
    }

    setError("");

    const url = `/all-rides?from=${encodeURIComponent(leaving.name)}&to=${encodeURIComponent(going.name)}&date=${date}&passengers=${passengers}`;

    if (window.location.pathname === "/all-rides") {
      navigate(url, { replace: true });
      window.location.reload();
    } else {
      navigate(url);
    }
  };

  return (
    <motion.section
      className="fr-search-section"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="fr-search-wrapper">
        <motion.div
          className="fr-search-container"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          <div className="fr-search-bar">
            <LocationDropdown
              placeholder="Leaving from"
              icon={<PinIcon />}
              onSelect={setLeaving}
              showCurrentLocation={true}
              value={leaving}
            />
            <LocationDropdown
              placeholder="Going to"
              icon={<DestIcon />}
              onSelect={setGoing}
              showCurrentLocation={false}
              value={going}
            />
            <DateField
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              icon={<CalIcon />}
            />
            <PassengerField count={passengers} setCount={setPassengers} />
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
          {error && (
            <motion.p
              className="fr-error"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FRSearchBar;
