// import { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaCarAlt, FaUserAlt } from "react-icons/fa";
// import { FaArrowLeft } from "react-icons/fa6";
// import { Link, useNavigate } from "react-router-dom";
// import { API_BASE_URL } from "../../utils/api";
// import axios from "axios";
// import Alert from "@mui/material/Alert";
// import Snackbar from "@mui/material/Snackbar";
// import ArcLoader from "../../components/Loader";
// import {
//   Dialog,
//   DialogContent,
//   Typography,
//   TextField,
//   Button,

//   Stack,
// } from "@mui/material";
// // ── Animation Variants ──────────────────────────────────────────────────────
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
// };
// const leftPanelVariants = {
//   hidden: { x: -80, opacity: 0 },
//   visible: {
//     x: 0,
//     opacity: 1,
//     transition: { type: "spring", stiffness: 60, damping: 18 },
//   },
// };
// const rightPanelVariants = {
//   hidden: { x: 80, opacity: 0 },
//   visible: {
//     x: 0,
//     opacity: 1,
//     transition: { type: "spring", stiffness: 60, damping: 18 },
//   },
// };
// const stepVariants = {
//   enter: (direction) => ({ x: direction > 0 ? 60 : -60, opacity: 0 }),
//   center: {
//     x: 0,
//     opacity: 1,
//     transition: { type: "spring", stiffness: 80, damping: 18 },
//   },
//   exit: (direction) => ({
//     x: direction > 0 ? -60 : 60,
//     opacity: 0,
//     transition: { duration: 0.2 },
//   }),
// };

// // ── SVG Icons ───────────────────────────────────────────────────────────────
// const icons = {
//   user: (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//       <circle cx="12" cy="7" r="4" />
//     </svg>
//   ),
//   email: (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
//       <polyline points="22,6 12,13 2,6" />
//     </svg>
//   ),
//   phone: (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
//     </svg>
//   ),
//   group: (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
//       <circle cx="9" cy="7" r="4" />
//       <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
//       <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//     </svg>
//   ),
//   lock: (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
//       <path d="M7 11V7a5 5 0 0 1 10 0v4" />
//     </svg>
//   ),
//   map: (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
//       <circle cx="12" cy="10" r="3" />
//     </svg>
//   ),
//   bank: (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <rect x="2" y="9" width="20" height="12" rx="2" />
//       <path d="M12 3L2 9h20L12 3z" />
//       <line x1="12" y1="9" x2="12" y2="21" />
//       <line x1="7" y1="9" x2="7" y2="21" />
//       <line x1="17" y1="9" x2="17" y2="21" />
//     </svg>
//   ),
//   hash: (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <line x1="4" y1="9" x2="20" y2="9" />
//       <line x1="4" y1="15" x2="20" y2="15" />
//       <line x1="10" y1="3" x2="8" y2="21" />
//       <line x1="16" y1="3" x2="14" y2="21" />
//     </svg>
//   ),
//   globe: (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <circle cx="12" cy="12" r="10" />
//       <line x1="2" y1="12" x2="22" y2="12" />
//       <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
//     </svg>
//   ),
//   upload: (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <polyline points="16 16 12 12 8 16" />
//       <line x1="12" y1="12" x2="12" y2="21" />
//       <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
//     </svg>
//   ),
//   eyeOpen: (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//       <circle cx="12" cy="12" r="3" />
//     </svg>
//   ),
//   eyeClosed: (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
//       <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
//       <line x1="1" y1="1" x2="23" y2="23" />
//     </svg>
//   ),
// };

// // ── Field Components ────────────────────────────────────────────────────────
// function FieldInput({
//   id,
//   label,
//   type = "text",
//   placeholder,
//   value,
//   onChange,
//   required = true,
//   icon,
//   maxLength,
//   suffix,
// }) {
//   return (
//     <div className="field-wrapper">
//       <label htmlFor={id} className="field-label">
//         {label}
//       </label>
//       <div className="field-input-box" style={{ position: "relative" }}>
//         <span className="field-icon">{icon}</span>
//         <input
//           type={type}
//           id={id}
//           className="field-input"
//           placeholder={placeholder}
//           required={required}
//           value={value}
//           onChange={onChange}
//           maxLength={maxLength}
//           style={suffix ? { paddingRight: "72px" } : undefined}
//         />
//         {suffix && (
//           <span
//             style={{
//               position: "absolute",
//               right: "10px",
//               top: "50%",
//               transform: "translateY(-50%)",
//               fontSize: "12px",
//               fontWeight: 600,
//               color: "#16a34a",
//               whiteSpace: "nowrap",
//               pointerEvents: "none",
//               userSelect: "none",
//             }}
//           >
//             {suffix}
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }

// function PasswordField({ id, label, placeholder, value, onChange }) {
//   const [visible, setVisible] = useState(false);
//   return (
//     <div className="field-wrapper">
//       <label htmlFor={id} className="field-label">
//         {label}
//       </label>
//       <div className="field-input-box" style={{ position: "relative" }}>
//         <span className="field-icon">{icons.lock}</span>
//         <input
//           type={visible ? "text" : "password"}
//           id={id}
//           className="field-input"
//           placeholder={placeholder}
//           required
//           value={value}
//           onChange={onChange}
//           style={{ paddingRight: "40px" }}
//         />
//         <button
//           type="button"
//           onClick={() => setVisible((v) => !v)}
//           style={{
//             position: "absolute",
//             right: "10px",
//             top: "50%",
//             transform: "translateY(-50%)",
//             background: "none",
//             border: "none",
//             cursor: "pointer",
//             padding: "0",
//             color: "var(--text-secondary, #6b7280)",
//             display: "flex",
//             alignItems: "center",
//           }}
//           tabIndex={-1}
//           aria-label={visible ? "Hide password" : "Show password"}
//         >
//           {visible ? icons.eyeClosed : icons.eyeOpen}
//         </button>
//       </div>
//     </div>
//   );
// }

// function FieldSelect({
//   id,
//   label,
//   value,
//   onChange,
//   options,
//   icon,
//   required = true,
// }) {
//   return (
//     <div className="field-wrapper">
//       <label htmlFor={id} className="field-label">
//         {label}
//       </label>
//       <div className="field-input-box">
//         <span className="field-icon">{icon}</span>
//         <select
//           id={id}
//           className="field-select"
//           required={required}
//           value={value}
//           onChange={onChange}
//         >
//           <option value="">Select {label.toLowerCase()}</option>
//           {options.map((o) => (
//             <option key={o.value} value={o.value}>
//               {o.label}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// }

// function FileField({ id, label, value, onChange }) {
//   const fileName = value ? value.name : null;
//   return (
//     <div className="field-wrapper">
//       <label htmlFor={id} className="field-label">
//         {label}
//       </label>
//       <div
//         className="field-input-box"
//         style={{ cursor: "pointer", position: "relative" }}
//       >
//         <span className="field-icon">{icons.upload}</span>
//         <span
//           className="field-input"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             color: fileName ? "inherit" : "#aaa",
//             fontSize: "14px",
//             userSelect: "none",
//           }}
//         >
//           {fileName || "Choose file…"}
//         </span>
//         <input
//           type="file"
//           id={id}
//           accept="image/*,.pdf"
//           required
//           onChange={onChange}
//           style={{
//             position: "absolute",
//             inset: 0,
//             opacity: 0,
//             cursor: "pointer",
//             width: "100%",
//             height: "100%",
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// // ── Driver Step Definitions ─────────────────────────────────────────────────
// const DRIVER_STEPS = [
//   {
//     title: "Basic Details",
//     subtitle: "Tell us where you're based",
//     fields: ["city", "state", "country", "postalCode", "address"],
//   },
//   {
//     title: "Bank Details",
//     subtitle: "For secure earnings transfer",
//     fields: [
//       "bankAccountHolder",
//       "bankAccountNumber",
//       "bankIFSC",
//       "bankBranchName",
//     ],
//   },
//   {
//     title: "Upload Documents",
//     subtitle: "Required for driver verification",
//     fields: [
//       "driverLicense",
//       "aadhaarCard",
//       "panCard",
//       "bankAccountDetails",
//       "profilePicture",
//     ],
//   },
// ];

// const FILE_FIELDS = new Set([
//   "driverLicense",
//   "aadhaarCard",
//   "panCard",
//   "bankAccountDetails",
//   "profilePicture",
// ]);

// const FIELD_META = {
//   city: {
//     label: "City",
//     icon: icons.map,
//     type: "text",
//     placeholder: "Enter your city",
//   },
//   state: {
//     label: "State",
//     icon: icons.map,
//     type: "text",
//     placeholder: "Enter your state",
//   },
//   country: {
//     label: "Country",
//     icon: icons.globe,
//     type: "text",
//     placeholder: "Enter your country",
//   },
//   postalCode: {
//     label: "Postal Code",
//     icon: icons.hash,
//     type: "text",
//     placeholder: "Enter postal code",
//   },
//   address: {
//     label: "Address",
//     icon: icons.map,
//     type: "text",
//     placeholder: "Enter your full address",
//   },
//   bankAccountHolder: {
//     label: "Account Holder Name",
//     icon: icons.bank,
//     type: "text",
//     placeholder: "Name on bank account",
//   },
//   bankAccountNumber: {
//     label: "Bank Account Number",
//     icon: icons.bank,
//     type: "text",
//     placeholder: "Enter account number",
//   },
//   bankIFSC: {
//     label: "Bank IFSC Code",
//     icon: icons.bank,
//     type: "text",
//     placeholder: "Enter IFSC code",
//   },
//   bankBranchName: {
//     label: "Bank Name",
//     icon: icons.bank,
//     type: "text",
//     placeholder: "Enter bank name",
//   },
//   driverLicense: { label: "Driving License" },
//   aadhaarCard: { label: "Aadhaar Card" },
//   panCard: { label: "PAN Card" },
//   bankAccountDetails: { label: "Bank Account Details" },
//   profilePicture: { label: "Profile Picture" },
// };

// function StepDots({ total, current }) {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         gap: "8px",
//         marginBottom: "16px",
//       }}
//     >
//       {Array.from({ length: total }).map((_, i) => (
//         <div
//           key={i}
//           style={{
//             width: i === current ? "24px" : "8px",
//             height: "8px",
//             borderRadius: "4px",
//             background:
//               i === current
//                 ? "var(--primary-color, #4f46e5)"
//                 : i < current
//                   ? "var(--primary-light, #8395f3)"
//                   : "var(--border-color, #ddd)",
//             transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
//           }}
//         />
//       ))}
//     </div>
//   );
// }

// // ── Validation ──────────────────────────────────────────────────────────────
// const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const PHONE_RE = /^\d{10}$/;

// function isDriverRole(usertype, roles) {
//   const matched = roles.find((r) => r.name.toLowerCase() === "driver");
//   return matched ? String(matched.id) === String(usertype) : false;
// }

// function validateStep0(formData) {
//   if (!formData.fullname?.trim()) return "Full name is required.";
//   if (!EMAIL_RE.test(formData.email))
//     return "Please enter a valid email address.";
//   if (!PHONE_RE.test(formData.phone))
//     return "Phone number must be exactly 10 digits.";
//   if (!formData.usertype) return "Please select a user type.";
//   if (formData.password.length < 6)
//     return "Password must be at least 6 characters.";
//   if (formData.password !== formData.confirmPassword)
//     return "Passwords do not match.";
//   return null;
// }

// function validateDriverStep(stepIndex, formData) {
//   const step = DRIVER_STEPS[stepIndex];
//   for (const fieldId of step.fields) {
//     const meta = FIELD_META[fieldId];
//     if (!meta) continue; // guard: skip unknown fields
//     if (FILE_FIELDS.has(fieldId)) {
//       if (!formData[fieldId]) return `Please upload your ${meta.label}.`;
//     } else {
//       if (!formData[fieldId]?.trim()) return `${meta.label} is required.`;
//     }
//   }
//   return null;
// }

// const INITIAL_FORM = {
//   fullname: "",
//   email: "",
//   phone: "",
//   usertype: "",
//   password: "",
//   confirmPassword: "",
//   terms: false,
//   city: "",
//   state: "",
//   country: "",
//   postalCode: "",
//   address: "",
//   bankAccountHolder: "",
//   bankAccountNumber: "",
//   bankIFSC: "",
//   bankBranchName: "",
//   driverLicense: null,
//   aadhaarCard: null,
//   panCard: null,
//   bankAccountDetails: null,
//   profilePicture: null,
// };

// function PageLoader() {
//   return (
//     <div
//       style={{
//         position: "fixed",
//         inset: 0,
//         zIndex: 9999,
//         background: "rgba(0,0,0,0.45)",
//         backdropFilter: "blur(2px)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <ArcLoader />
//     </div>
//   );
// }

// // ── Signup Component ────────────────────────────────────────────────────────
// export default function Signup() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState(INITIAL_FORM);
//   const [step, setStep] = useState(0);
//   const [direction, setDirection] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [roles, setRoles] = useState([]);

//   // ── Snackbar state ────────────────────────────────────────────────────────
//   const [openAlert, setOpenAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");
//   const [alertType, setAlertType] = useState("info");
//   const [openVerificationModal, setOpenVerificationModal] = useState(false);
//   const [phoneVerified, setPhoneVerified] = useState(false);
//   const isDriver = isDriverRole(formData.usertype, roles);
//   const totalSteps = isDriver ? 1 + DRIVER_STEPS.length : 1;
//   const isFinalStep = step === totalSteps - 1;
//   // Add these inside the Signup component, near other useState declarations
//   const [otp, setOtp] = useState("");
//   const [generatedOtp, setGeneratedOtp] = useState("");
//   const [showOtpInput, setShowOtpInput] = useState(false);
//   const [isVerified, setIsVerified] = useState(false);
//   const alertTimerRef = useRef(null);

//   const handleVerificationClose = () => {
//     setOpenVerificationModal(false);
//   };
//   const handleOpenVerification = () => {
//     const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
//     setGeneratedOtp(randomOtp);
//     setShowOtpInput(true);
//     console.log("Generated OTP:", randomOtp);
//     alert(`Your OTP is: ${randomOtp}`); // replace with SMS API call
//     setOpenVerificationModal(true);
//   };

//   const handleVerifyOtp = () => {
//     if (!otp) {
//       showAlert("error", "Please enter the OTP");
//       return;
//     }
//     if (otp === generatedOtp) {
//       setIsVerified(true);
//       setPhoneVerified(true);
//       showAlert("success", "Phone number verified successfully!");
//       setTimeout(() => handleVerificationClose(), 1500);
//     } else {
//       showAlert("error", "Invalid OTP. Please try again.");
//     }
//   };

//   const handleOtpChange = (e) => {
//     const value = e.target.value.replace(/\D/g, "").slice(0, 6);
//     setOtp(value);
//   };
//   const showAlert = (severity, message) => {
//     clearTimeout(alertTimerRef.current);
//     setAlertType(severity);
//     setAlertMessage(message);
//     setOpenAlert(true);
//     alertTimerRef.current = setTimeout(() => setOpenAlert(false), 5000);
//   };

//   const clearAlert = () => {
//     clearTimeout(alertTimerRef.current);
//     setOpenAlert(false);
//   };

//   useEffect(() => {
//     const fetchRoles = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}get-roles`);
//         setRoles(response.data);
//       } catch (error) {
//         console.error("Error fetching roles:", error);
//       }
//     };
//     fetchRoles();
//   }, []);

//   const roleOptions = roles.map((role) => ({
//     value: String(role.id),
//     label: role.name,
//   }));

//   const handleChange = (e) => {
//     const { id, value, type, checked, files } = e.target;
//     clearAlert();

//     // For phone field: only allow digits, max 10
//     if (id === "phone") {
//       const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
//       setFormData((prev) => ({ ...prev, phone: digitsOnly }));
//       return;
//     }

//     setFormData((prev) => ({
//       ...prev,
//       [id]:
//         type === "checkbox"
//           ? checked
//           : type === "file"
//             ? files[0] || null
//             : value,
//     }));
//     if (id === "usertype") {
//       setStep(0);
//       setDirection(1);
//     }
//   };

//   const handleNext = (e) => {
//     e.preventDefault();
//     if (step === 0) {
//       const err = validateStep0(formData);
//       if (err) {
//         showAlert("error", err);
//         return;
//       }
//     } else if (isDriver && step >= 1) {
//       const err = validateDriverStep(step - 1, formData);
//       if (err) {
//         showAlert("error", err);
//         return;
//       }
//     }
//     clearAlert();
//     setDirection(1);
//     setStep((s) => s + 1);
//   };

//   const handleBack = () => {
//     clearAlert();
//     setDirection(-1);
//     setStep((s) => s - 1);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isFinalStep) {
//       handleNext(e);
//       return;
//     }

//     if (isDriver) {
//       const err = validateDriverStep(step - 1, formData);
//       if (err) {
//         showAlert("error", err);
//         return;
//       }
//     }
//     if (!formData.terms) {
//       showAlert(
//         "warning",
//         "You must agree to the Terms & Conditions to proceed.",
//       );
//       return;
//     }

//     setLoading(true);
//     clearAlert();

//     try {
//       const payload = new FormData();
//       payload.append("name", formData.fullname);
//       payload.append("email", formData.email);
//       payload.append("phone", formData.phone);
//       payload.append("role_id", formData.usertype);
//       payload.append("password", formData.password);

//       if (isDriver) {
//         payload.append("city", formData.city);
//         payload.append("state", formData.state);
//         payload.append("country", formData.country);
//         payload.append("postal_code", formData.postalCode);
//         payload.append("address", formData.address);
//         payload.append("bank_account_holder", formData.bankAccountHolder);
//         payload.append("bank_account_number", formData.bankAccountNumber);
//         payload.append("bank_account_ifsc", formData.bankIFSC);
//         payload.append("bank_branch_name", formData.bankBranchName);

//         if (formData.driverLicense)
//           payload.append("driver_license", formData.driverLicense);
//         if (formData.aadhaarCard)
//           payload.append("adhhar_card", formData.aadhaarCard);
//         if (formData.panCard) payload.append("pan_card", formData.panCard);
//         if (formData.bankAccountDetails)
//           payload.append("bank_account", formData.bankAccountDetails);
//         if (formData.profilePicture)
//           payload.append("profile_picture", formData.profilePicture);
//       }

//       const response = await axios.post(`${API_BASE_URL}register`, payload, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const {
//         status,
//         message = "Registration successful!",
//         token,
//       } = response.data;
//       if (token) localStorage.setItem("token", token);

//       showAlert(status === "success" ? "success" : "info", message);

//       if (status === "success") {
//         setFormData(INITIAL_FORM);
//         setStep(0);
//         setDirection(1);
//         localStorage.setItem("user", JSON.stringify(response.data.user));
//         localStorage.setItem("authData", JSON.stringify(response.data));
//         const role = String(response.data.user.role);
//         if (role === "1") localStorage.setItem("role", "admin");
//         else if (role === "2") localStorage.setItem("role", "driver");
//         else if (role === "3") localStorage.setItem("role", "passenger");
//         else localStorage.removeItem("role");
//         setTimeout(() => navigate("/"), 1500);
//       }
//     } catch (error) {
//       const apiMessage =
//         error?.response?.data?.message ||
//         error?.response?.data?.error ||
//         error?.message ||
//         "Something went wrong. Please try again.";
//       const apiSeverity = error?.response?.data?.severity || "error";
//       showAlert(apiSeverity, apiMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderStepContent = () => {
//     if (step === 0) {
//     const phoneComplete = /^\d{10}$/.test(formData.phone);
//       return (
//         <div className="signup-form-grid">
//           <FieldInput
//             id="fullname"
//             label="Full Name"
//             placeholder="Enter your full name"
//             value={formData.fullname}
//             onChange={handleChange}
//             icon={icons.user}
//           />
//           <FieldInput
//             id="email"
//             label="Email"
//             type="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleChange}
//             icon={icons.email}
//           />
//           {/* Phone field with ✓ Verified badge when 10 digits */}
//           <FieldInput
//             id="phone"
//             label="Phone Number"
//             type="tel"
//             placeholder="Enter your phone number"
//             value={formData.phone}
//             onChange={handleChange}
//             icon={icons.phone}
//             maxLength={10}
//             suffix={
//               phoneVerified && (
//                 <button
//                   type="button"
//                   className={`verify-btn ${phoneVerified ? "verified" : ""}`}
//                   className="verify-btn"
//                   onClick={handleOpenVerification}
//                   disabled={phoneVerified}
//                 >
//                   {phoneVerified ? "Verified ✓" : "Verify"}

//                 </button>
//               )
//             }
//           />

//           <FieldSelect
//             id="usertype"
//             label="User Type"
//             value={formData.usertype}
//             onChange={handleChange}
//             icon={icons.group}
//             options={roleOptions}
//           />
//           <PasswordField
//             id="password"
//             label="Password"
//             placeholder="Create a password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           <PasswordField
//             id="confirmPassword"
//             label="Confirm Password"
//             placeholder="Confirm your password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//           />
//         </div>
//       );
//     }

//     const driverStep = DRIVER_STEPS[step - 1];
//     return (
//       <>
//         <p
//           style={{
//             fontSize: "13px",
//             color: "var(--text-secondary, #6b7280)",
//             marginBottom: "14px",
//             marginTop: "-4px",
//           }}
//         >
//           {driverStep.subtitle}
//         </p>
//         <div className="signup-form-grid">
//           {driverStep.fields.map((fieldId) => {
//             const meta = FIELD_META[fieldId];

//             // ── FIX: guard against missing meta to prevent TypeError ──
//             if (!meta) {
//               console.warn(`Missing FIELD_META entry for field: "${fieldId}"`);
//               return null;
//             }

//             if (FILE_FIELDS.has(fieldId)) {
//               return (
//                 <FileField
//                   key={fieldId}
//                   id={fieldId}
//                   label={meta.label}
//                   value={formData[fieldId]}
//                   onChange={handleChange}
//                 />
//               );
//             }
//             return (
//               <FieldInput
//                 key={fieldId}
//                 id={fieldId}
//                 label={meta.label}
//                 type={meta.type}
//                 placeholder={meta.placeholder}
//                 value={formData[fieldId]}
//                 onChange={handleChange}
//                 icon={meta.icon}
//               />
//             );
//           })}
//         </div>
//       </>
//     );
//   };

//   // ── Render ────────────────────────────────────────────────────────────────
//   return (
//     <>
//       {/* ── Snackbar ── */}
//       <Snackbar
//         open={openAlert}
//         autoHideDuration={5000}
//         onClose={() => setOpenAlert(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//         sx={{ zIndex: 9999 }}
//       >
//         <Alert
//           severity={alertType}
//           variant="filled"
//           onClose={() => setOpenAlert(false)}
//           sx={{ width: "100%" }}
//         >
//           {alertMessage}
//         </Alert>
//       </Snackbar>

//       {loading && <PageLoader />}
//       {/* OTP Verification Modal */}
//       <Dialog
//         open={openVerificationModal}
//         onClose={handleVerificationClose}
//         PaperProps={{
//           style: { borderRadius: 12, padding: "8px", minWidth: 360 },
//         }}
//       >
//         <DialogContent>
//           <Typography variant="h6" fontWeight={700} mb={1}>
//             Verify Phone Number
//           </Typography>
//           <Typography variant="body2" color="text.secondary" mb={2}>
//             An OTP has been sent to <strong>+91 {formData.phone}</strong>
//           </Typography>

//           <Stack spacing={2}>
//             {showOtpInput && (
//               <TextField
//                 label="Enter OTP"
//                 variant="outlined"
//                 fullWidth
//                 value={otp}
//                 onChange={handleOtpChange}
//                 inputProps={{ maxLength: 6, inputMode: "numeric" }}
//                 placeholder="6-digit OTP"
//                 disabled={isVerified}
//               />
//             )}

//             {isVerified ? (
//               <Alert severity="success">Phone verified successfully! ✓</Alert>
//             ) : (
//               <Button
//                 variant="contained"
//                 fullWidth
//                 onClick={handleVerifyOtp}
//                 disabled={otp.length !== 6}
//                 sx={{
//                   backgroundColor: "#0033a1",
//                   "&:hover": { backgroundColor: "#002280" },
//                   borderRadius: 2,
//                   py: 1.2,
//                   fontWeight: 700,
//                 }}
//               >
//                 Verify OTP
//               </Button>
//             )}

//             <Button
//               variant="text"
//               size="small"
//               onClick={handleVerificationClose}
//               sx={{ color: "text.secondary" }}
//             >
//               Cancel
//             </Button>
//           </Stack>
//         </DialogContent>
//       </Dialog>
//       <motion.div
//         className="auth-container"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {/* ── LEFT PANEL ── */}
//         <motion.div className="image-section" variants={leftPanelVariants}>
//           <div className="floating-shapes">
//             <div className="shape"></div>
//             <div className="shape"></div>
//             <div className="shape"></div>
//           </div>
//           <div className="image-overlay">
//             <motion.div
//               className="auth-logo"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.6 }}
//             >
//               <div className="auth-logo-icon">
//                 <FaCarAlt />
//               </div>
//               <h2>Carpooling</h2>
//             </motion.div>
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.55, duration: 0.6 }}
//             >
//               Create Your Account &amp; Start Riding
//             </motion.h1>
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.75, duration: 0.6 }}
//             >
//               Join our ride-sharing platform and unlock a smarter way to travel.
//               Book rides, connect with trusted drivers, and enjoy safe journeys
//               anytime, anywhere.
//             </motion.p>
//           </div>
//           <Link to="/" className="back-btn">
//             <FaArrowLeft /> Back
//           </Link>
//         </motion.div>

//         {/* ── RIGHT PANEL ── */}
//         <motion.div className="form-section" variants={rightPanelVariants}>
//           <motion.div
//             className="signup-wrapper"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <Link to="/" className="auth-back-btn">
//               <FaArrowLeft />
//             </Link>
//             <div className="logo-section">
//               <div className="logo-icon">
//                 <FaUserAlt />
//               </div>
//             </div>

//             <h2 className="signup-title">Create Account</h2>

//             {isDriver && step > 0 ? (
//               <p className="signup-desc" style={{ fontWeight: 600 }}>
//                 {DRIVER_STEPS[step - 1].title}
//               </p>
//             ) : (
//               <p className="signup-desc">
//                 Join us and start your journey today
//               </p>
//             )}

//             {isDriver && <StepDots total={totalSteps} current={step} />}

//             <form className="registration-form" onSubmit={handleSubmit}>
//               <AnimatePresence mode="wait" custom={direction}>
//                 <motion.div
//                   key={step}
//                   custom={direction}
//                   variants={stepVariants}
//                   initial="enter"
//                   animate="center"
//                   exit="exit"
//                 >
//                   {renderStepContent()}
//                 </motion.div>
//               </AnimatePresence>

//               {isFinalStep && (
//                 <motion.div
//                   className="terms-section"
//                   initial={{ opacity: 0, y: 8 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.1 }}
//                 >
//                   <label className="checkbox-container">
//                     <input
//                       type="checkbox"
//                       id="terms"
//                       className="checkbox-input"
//                       required
//                       checked={formData.terms}
//                       onChange={handleChange}
//                     />
//                     <span className="checkbox-text">
//                       I agree to the{" "}
//                       <a href="#terms" className="terms-link">
//                         Terms &amp; Conditions
//                       </a>
//                     </span>
//                   </label>
//                 </motion.div>
//               )}

//               <div style={{ display: "flex", gap: "12px" }}>
//                 {step > 0 && (
//                   <motion.button
//                     type="button"
//                     className="register-btn"
//                     style={{
//                       flex: "0 0 auto",
//                       width: "auto",
//                       paddingLeft: "24px",
//                       paddingRight: "24px",
//                       background: "transparent",
//                       border: "1.5px solid #0033a1",
//                       opacity: 0.75,
//                       color: "#0033a1",
//                       fontWeight: 700,
//                     }}
//                     onClick={handleBack}
//                     whileTap={{ scale: 0.98 }}
//                     disabled={loading}
//                   >
//                     Back
//                   </motion.button>
//                 )}
//                 <motion.button
//                   type="submit"
//                   className="register-btn"
//                   style={{ flex: 1, opacity: loading ? 0.75 : 1 }}
//                   whileTap={{ scale: loading ? 1 : 0.98 }}
//                   disabled={loading}
//                 >
//                   {isFinalStep ? "Sign Up" : "Next"}
//                 </motion.button>
//               </div>
//             </form>

//             <div className="login-redirect">
//               Already have an account?{" "}
//               <Link to="/login" className="redirect-link">
//                 Login
//               </Link>
//             </div>
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </>
//   );
// }
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCarAlt, FaUserAlt } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../utils/api";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import ArcLoader from "../../components/Loader";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import {
  Dialog,
  DialogContent,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

// ── Animation Variants ──────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
};
const leftPanelVariants = {
  hidden: { x: -80, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 60, damping: 18 },
  },
};
const rightPanelVariants = {
  hidden: { x: 80, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 60, damping: 18 },
  },
};
const stepVariants = {
  enter: (direction) => ({ x: direction > 0 ? 60 : -60, opacity: 0 }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 18 },
  },
  exit: (direction) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.2 },
  }),
};

// ── SVG Icons ───────────────────────────────────────────────────────────────
const icons = {
  user: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  email: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  phone: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  group: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  lock: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  map: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  bank: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="9" width="20" height="12" rx="2" />
      <path d="M12 3L2 9h20L12 3z" />
      <line x1="12" y1="9" x2="12" y2="21" />
      <line x1="7" y1="9" x2="7" y2="21" />
      <line x1="17" y1="9" x2="17" y2="21" />
    </svg>
  ),
  hash: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="4" y1="15" x2="20" y2="15" />
      <line x1="10" y1="3" x2="8" y2="21" />
      <line x1="16" y1="3" x2="14" y2="21" />
    </svg>
  ),
  globe: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  upload: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  ),
  eyeOpen: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  eyeClosed: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ),
};

// ── Field Components ────────────────────────────────────────────────────────
function FieldInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = true,
  icon,
  maxLength,
  suffix,
}) {
  return (
    <div className="field-wrapper">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className="field-input-box" style={{ position: "relative" }}>
        <span className="field-icon">{icon}</span>
        <input
          type={type}
          id={id}
          className="field-input"
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          style={suffix ? { paddingRight: "80px" } : undefined}
        />
        {suffix && (
          <span
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "auto",
              userSelect: "none",
            }}
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function PasswordField({ id, label, placeholder, value, onChange }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="field-wrapper">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className="field-input-box" style={{ position: "relative" }}>
        <span className="field-icon">{icons.lock}</span>
        <input
          type={visible ? "text" : "password"}
          id={id}
          className="field-input"
          placeholder={placeholder}
          required
          value={value}
          onChange={onChange}
          style={{ paddingRight: "40px" }}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0",
            color: "var(--text-secondary, #6b7280)",
            display: "flex",
            alignItems: "center",
          }}
          tabIndex={-1}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? icons.eyeClosed : icons.eyeOpen}
        </button>
      </div>
    </div>
  );
}

function FieldSelect({
  id,
  label,
  value,
  onChange,
  options,
  icon,
  required = true,
}) {
  return (
    <div className="field-wrapper">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className="field-input-box">
        <span className="field-icon">{icon}</span>
        <select
          id={id}
          className="field-select"
          required={required}
          value={value}
          onChange={onChange}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function FileField({ id, label, value, onChange }) {
  const fileName = value ? value.name : null;
  return (
    <div className="field-wrapper">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div
        className="field-input-box"
        style={{ cursor: "pointer", position: "relative" }}
      >
        <span className="field-icon">{icons.upload}</span>
        <span
          className="field-input"
          style={{
            display: "flex",
            alignItems: "center",
            color: fileName ? "inherit" : "#aaa",
            fontSize: "14px",
            userSelect: "none",
          }}
        >
          {fileName || "Choose file…"}
        </span>
        <input
          type="file"
          id={id}
          accept="image/*,.pdf"
          required
          onChange={onChange}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            cursor: "pointer",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
}

// ── Driver Step Definitions ─────────────────────────────────────────────────
const DRIVER_STEPS = [
  {
    title: "Basic Details",
    subtitle: "Tell us where you're based",
    fields: ["city", "state", "country", "postalCode", "address"],
  },
  {
    title: "Bank Details",
    subtitle: "For secure earnings transfer",
    fields: [
      "bankAccountHolder",
      "bankAccountNumber",
      "bankIFSC",
      "bankBranchName",
    ],
  },
  {
    title: "Upload Documents",
    subtitle: "Required for driver verification",
    fields: [
      "driverLicense",
      "aadhaarCard",
      "panCard",
      "bankAccountDetails",
      "profilePicture",
    ],
  },
];

const FILE_FIELDS = new Set([
  "driverLicense",
  "aadhaarCard",
  "panCard",
  "bankAccountDetails",
  "profilePicture",
]);

const FIELD_META = {
  city: {
    label: "City",
    icon: icons.map,
    type: "text",
    placeholder: "Enter your city",
  },
  state: {
    label: "State",
    icon: icons.map,
    type: "text",
    placeholder: "Enter your state",
  },
  country: {
    label: "Country",
    icon: icons.globe,
    type: "text",
    placeholder: "Enter your country",
  },
  postalCode: {
    label: "Postal Code",
    icon: icons.hash,
    type: "text",
    placeholder: "Enter postal code",
  },
  address: {
    label: "Address",
    icon: icons.map,
    type: "text",
    placeholder: "Enter your full address",
  },
  bankAccountHolder: {
    label: "Account Holder Name",
    icon: icons.bank,
    type: "text",
    placeholder: "Name on bank account",
  },
  bankAccountNumber: {
    label: "Bank Account Number",
    icon: icons.bank,
    type: "text",
    placeholder: "Enter account number",
  },
  bankIFSC: {
    label: "Bank IFSC Code",
    icon: icons.bank,
    type: "text",
    placeholder: "Enter IFSC code",
  },
  bankBranchName: {
    label: "Bank Name",
    icon: icons.bank,
    type: "text",
    placeholder: "Enter bank name",
  },
  driverLicense: { label: "Driving License" },
  aadhaarCard: { label: "Aadhaar Card" },
  panCard: { label: "PAN Card" },
  bankAccountDetails: { label: "Bank Account Details" },
  profilePicture: { label: "Profile Picture" },
};

function StepDots({ total, current }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        marginBottom: "16px",
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === current ? "24px" : "8px",
            height: "8px",
            borderRadius: "4px",
            background:
              i === current
                ? "var(--primary-color, #4f46e5)"
                : i < current
                  ? "var(--primary-light, #8395f3)"
                  : "var(--border-color, #ddd)",
            transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      ))}
    </div>
  );
}

// ── Validation ──────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\d{10}$/;

function isDriverRole(usertype, roles) {
  const matched = roles.find((r) => r.name.toLowerCase() === "driver");
  return matched ? String(matched.id) === String(usertype) : false;
}

function validateStep0(formData) {
  if (!formData.fullname?.trim()) return "Full name is required.";
  if (!EMAIL_RE.test(formData.email))
    return "Please enter a valid email address.";
  if (!PHONE_RE.test(formData.phone))
    return "Phone number must be exactly 10 digits.";
  if (!formData.usertype) return "Please select a user type.";
  if (formData.password.length < 6)
    return "Password must be at least 6 characters.";
  if (formData.password !== formData.confirmPassword)
    return "Passwords do not match.";
  return null;
}

function validateDriverStep(stepIndex, formData) {
  const step = DRIVER_STEPS[stepIndex];
  for (const fieldId of step.fields) {
    const meta = FIELD_META[fieldId];
    if (!meta) continue;
    if (FILE_FIELDS.has(fieldId)) {
      if (!formData[fieldId]) return `Please upload your ${meta.label}.`;
    } else {
      if (!formData[fieldId]?.trim()) return `${meta.label} is required.`;
    }
  }
  return null;
}

const INITIAL_FORM = {
  fullname: "",
  email: "",
  phone: "",
  usertype: "",
  password: "",
  confirmPassword: "",
  terms: false,
  city: "",
  state: "",
  country: "",
  postalCode: "",
  address: "",
  bankAccountHolder: "",
  bankAccountNumber: "",
  bankIFSC: "",
  bankBranchName: "",
  driverLicense: null,
  aadhaarCard: null,
  panCard: null,
  bankAccountDetails: null,
  profilePicture: null,
};

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
      <ArcLoader />
    </div>
  );
}

// ── Signup Component ────────────────────────────────────────────────────────
export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);

  // ── Snackbar ──────────────────────────────────────────────────────────────
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");
  const alertTimerRef = useRef(null);

  // ── OTP / Verification ────────────────────────────────────────────────────
  const [openVerificationModal, setOpenVerificationModal] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // ── Derived ───────────────────────────────────────────────────────────────
  const isDriver = isDriverRole(formData.usertype, roles);
  const totalSteps = isDriver ? 1 + DRIVER_STEPS.length : 1;
  const isFinalStep = step === totalSteps - 1;

  // ── Alert helpers ─────────────────────────────────────────────────────────
  const showAlert = (severity, message) => {
    clearTimeout(alertTimerRef.current);
    setAlertType(severity);
    setAlertMessage(message);
    setOpenAlert(true);
    alertTimerRef.current = setTimeout(() => setOpenAlert(false), 5000);
  };

  const clearAlert = () => {
    clearTimeout(alertTimerRef.current);
    setOpenAlert(false);
  };

  // ── OTP handlers ──────────────────────────────────────────────────────────
  const handleOpenVerification = () => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    setOtp("");
    setIsVerified(false);
    console.log("Generated OTP:", randomOtp);
    alert(`Your OTP is: ${randomOtp}`); // replace with SMS API call
    setOpenVerificationModal(true);
  };

  const handleVerificationClose = () => {
    setOpenVerificationModal(false);
    setOtp("");
    setIsVerified(false);
    setGeneratedOtp("");
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      showAlert("error", "Please enter the OTP");
      return;
    }
    if (otp === generatedOtp) {
      setIsVerified(true);
      setPhoneVerified(true);
      showAlert("success", "Phone number verified successfully!");
      setTimeout(() => {
        setOpenVerificationModal(false);
        setOtp("");
        setIsVerified(false);
        setGeneratedOtp("");
      }, 1500);
    } else {
      showAlert("error", "Invalid OTP. Please try again.");
    }
  };

  // ── Fetch roles ───────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}get-roles`);
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const roleOptions = roles.map((role) => ({
    value: String(role.id),
    label: role.name,
  }));

  // ── Form change ───────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { id, value, type, checked, files } = e.target;
    clearAlert();

    if (id === "phone") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: digitsOnly }));
      if (phoneVerified) setPhoneVerified(false);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [id]:
        type === "checkbox"
          ? checked
          : type === "file"
            ? files[0] || null
            : value,
    }));

    if (id === "usertype") {
      setStep(0);
      setDirection(1);
    }
  };

  // ── Navigation ────────────────────────────────────────────────────────────
  const handleNext = (e) => {
    e.preventDefault();
    if (step === 0) {
      const err = validateStep0(formData);
      if (err) {
        showAlert("error", err);
        return;
      }
    } else if (isDriver && step >= 1) {
      const err = validateDriverStep(step - 1, formData);
      if (err) {
        showAlert("error", err);
        return;
      }
    }
    clearAlert();
    setDirection(1);
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    clearAlert();
    setDirection(-1);
    setStep((s) => s - 1);
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFinalStep) {
      handleNext(e);
      return;
    }

    if (isDriver) {
      const err = validateDriverStep(step - 1, formData);
      if (err) {
        showAlert("error", err);
        return;
      }
    }
    if (!formData.terms) {
      showAlert(
        "warning",
        "You must agree to the Terms & Conditions to proceed.",
      );
      return;
    }

    setLoading(true);
    clearAlert();

    try {
      const payload = new FormData();
      payload.append("name", formData.fullname);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("role_id", formData.usertype);
      payload.append("password", formData.password);

      if (isDriver) {
        payload.append("city", formData.city);
        payload.append("state", formData.state);
        payload.append("country", formData.country);
        payload.append("postal_code", formData.postalCode);
        payload.append("address", formData.address);
        payload.append("bank_account_holder", formData.bankAccountHolder);
        payload.append("bank_account_number", formData.bankAccountNumber);
        payload.append("bank_account_ifsc", formData.bankIFSC);
        payload.append("bank_branch_name", formData.bankBranchName);
        if (formData.driverLicense)
          payload.append("driver_license", formData.driverLicense);
        if (formData.aadhaarCard)
          payload.append("adhhar_card", formData.aadhaarCard);
        if (formData.panCard) payload.append("pan_card", formData.panCard);
        if (formData.bankAccountDetails)
          payload.append("bank_account", formData.bankAccountDetails);
        if (formData.profilePicture)
          payload.append("profile_picture", formData.profilePicture);
      }

      const response = await axios.post(`${API_BASE_URL}register`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const {
        status,
        message = "Registration successful!",
        token,
      } = response.data;
      if (token) localStorage.setItem("token", token);

      showAlert(status === "success" ? "success" : "info", message);

      if (status === "success") {
        setFormData(INITIAL_FORM);
        setStep(0);
        setDirection(1);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("authData", JSON.stringify(response.data));
        const role = String(response.data.user.role);
        if (role === "1") localStorage.setItem("role", "admin");
        else if (role === "2") localStorage.setItem("role", "driver");
        else if (role === "3") localStorage.setItem("role", "passenger");
        else localStorage.removeItem("role");
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (error) {
      const apiMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong. Please try again.";
      const apiSeverity = error?.response?.data?.severity || "error";
      showAlert(apiSeverity, apiMessage);
    } finally {
      setLoading(false);
    }
  };

  // ── Step Content ──────────────────────────────────────────────────────────
  const renderStepContent = () => {
    if (step === 0) {
      const phoneComplete = /^\d{10}$/.test(formData.phone);
      return (
        <div className="signup-form-grid">
          <FieldInput
            id="fullname"
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.fullname}
            onChange={handleChange}
            icon={icons.user}
          />
          <FieldInput
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            icon={icons.email}
          />
          <FieldInput
            id="phone"
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            icon={icons.phone}
            maxLength={10}
            suffix={
              phoneComplete && (
                <button
                  type="button"
                  className={`verify-btn ${phoneVerified ? "verified" : ""}`}
                  onClick={handleOpenVerification}
                  disabled={phoneVerified}
                >
                  {phoneVerified ? <IoMdCheckmarkCircleOutline /> : "Verify"}
                </button>
              )
            }
          />
          <FieldSelect
            id="usertype"
            label="User Type"
            value={formData.usertype}
            onChange={handleChange}
            icon={icons.group}
            options={roleOptions}
          />
          <PasswordField
            id="password"
            label="Password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
          />
          <PasswordField
            id="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
      );
    }

    const driverStep = DRIVER_STEPS[step - 1];
    return (
      <>
        <p
          style={{
            fontSize: "13px",
            color: "var(--text-secondary, #6b7280)",
            marginBottom: "14px",
            marginTop: "-4px",
          }}
        >
          {driverStep.subtitle}
        </p>
        <div className="signup-form-grid">
          {driverStep.fields.map((fieldId) => {
            const meta = FIELD_META[fieldId];
            if (!meta) {
              console.warn(`Missing FIELD_META entry for field: "${fieldId}"`);
              return null;
            }
            if (FILE_FIELDS.has(fieldId)) {
              return (
                <FileField
                  key={fieldId}
                  id={fieldId}
                  label={meta.label}
                  value={formData[fieldId]}
                  onChange={handleChange}
                />
              );
            }
            return (
              <FieldInput
                key={fieldId}
                id={fieldId}
                label={meta.label}
                type={meta.type}
                placeholder={meta.placeholder}
                value={formData[fieldId]}
                onChange={handleChange}
                icon={meta.icon}
              />
            );
          })}
        </div>
      </>
    );
  };

  // ── Render ────────────────────────────────────────────────────────────────
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

      {/* OTP Verification Modal */}
      <Dialog
        open={openVerificationModal}
        onClose={handleVerificationClose}
        PaperProps={{
          style: { borderRadius: 12, padding: "8px", minWidth: 360 },
        }}
      >
        <DialogContent>
          <Typography variant="h6" fontWeight={700} mb={1}>
            Verify Phone Number
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            An OTP has been sent to <strong>+91 {formData.phone}</strong>
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Enter OTP"
              variant="outlined"
              fullWidth
              value={otp}
              onChange={handleOtpChange}
              inputProps={{ maxLength: 6, inputMode: "numeric" }}
              placeholder="6-digit OTP"
              disabled={isVerified}
            />
            {isVerified ? (
              <Alert severity="success">Phone verified successfully! ✓</Alert>
            ) : (
              <Button
                variant="contained"
                fullWidth
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6}
                sx={{
                  backgroundColor: "#0033a1",
                  "&:hover": { backgroundColor: "#002280" },
                  borderRadius: 2,
                  py: 1.2,
                  fontWeight: 700,
                }}
              >
                Verify OTP
              </Button>
            )}
            <Button
              variant="text"
              size="small"
              onClick={handleVerificationClose}
              sx={{ color: "text.secondary" }}
            >
              Cancel
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <motion.div
        className="auth-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* LEFT PANEL */}
        <motion.div className="image-section" variants={leftPanelVariants}>
          <div className="floating-shapes">
            <div className="shape"></div>
            <div className="shape"></div>
            <div className="shape"></div>
          </div>
          <div className="image-overlay">
            <motion.div
              className="auth-logo"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="auth-logo-icon">
                <FaCarAlt />
              </div>
              <h2>Carpooling</h2>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
              Create Your Account &amp; Start Riding
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.6 }}
            >
              Join our ride-sharing platform and unlock a smarter way to travel.
              Book rides, connect with trusted drivers, and enjoy safe journeys
              anytime, anywhere.
            </motion.p>
          </div>
          <Link to="/" className="back-btn">
            <FaArrowLeft /> Back
          </Link>
        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div className="form-section" variants={rightPanelVariants}>
          <motion.div
            className="signup-wrapper"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Link to="/" className="auth-back-btn">
              <FaArrowLeft />
            </Link>
            <div className="logo-section">
              <div className="logo-icon">
                <FaUserAlt />
              </div>
            </div>

            <h2 className="signup-title">Create Account</h2>

            {isDriver && step > 0 ? (
              <p className="signup-desc" style={{ fontWeight: 600 }}>
                {DRIVER_STEPS[step - 1].title}
              </p>
            ) : (
              <p className="signup-desc">
                Join us and start your journey today
              </p>
            )}

            {isDriver && <StepDots total={totalSteps} current={step} />}

            <form className="registration-form" onSubmit={handleSubmit}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>

              {isFinalStep && (
                <motion.div
                  className="terms-section"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      id="terms"
                      className="checkbox-input"
                      required
                      checked={formData.terms}
                      onChange={handleChange}
                    />
                    <span className="checkbox-text">
                      I agree to the{" "}
                      <a href="#terms" className="terms-link">
                        Terms &amp; Conditions
                      </a>
                    </span>
                  </label>
                </motion.div>
              )}

              <div style={{ display: "flex", gap: "12px" }}>
                {step > 0 && (
                  <motion.button
                    type="button"
                    className="register-btn"
                    style={{
                      flex: "0 0 auto",
                      width: "auto",
                      paddingLeft: "24px",
                      paddingRight: "24px",
                      background: "transparent",
                      border: "1.5px solid #0033a1",
                      opacity: 0.75,
                      color: "#0033a1",
                      fontWeight: 700,
                    }}
                    onClick={handleBack}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                  >
                    Back
                  </motion.button>
                )}
                <motion.button
                  type="submit"
                  className="register-btn"
                  style={{ flex: 1, opacity: loading ? 0.75 : 1 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  disabled={loading}
                >
                  {isFinalStep ? "Sign Up" : "Next"}
                </motion.button>
              </div>
            </form>

            <div className="login-redirect">
              Already have an account?{" "}
              <Link to="/login" className="redirect-link">
                Login
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
