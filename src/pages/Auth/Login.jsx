import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCarAlt, FaUserAlt } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar"; // ← NEW
import ArcLoader from "../../components/Loader";

// ── Animation Variants ───────────────────────────────────────────────────────
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

// ── SVG Icons ────────────────────────────────────────────────────────────────
const icons = {
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

// ── Validation ───────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\d{10}$/;

function validateLoginForm({ identifier, password }) {
  if (!identifier.trim()) return "Email or phone number is required.";
  if (!EMAIL_RE.test(identifier) && !PHONE_RE.test(identifier))
    return "Enter a valid email address or 10-digit phone number.";
  if (!password) return "Password is required.";
  return null;
}

// ── Sub-components ───────────────────────────────────────────────────────────
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

function IdentifierField({ value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor="identifier">Email / Phone Number</label>
      <div className="input-wrapper">
        <span className="input-icon">{icons.email}</span>
        <input
          type="text"
          id="identifier"
          placeholder="Enter your email or phone number"
          required
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

function PasswordField({ value, onChange }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <div className="input-wrapper" style={{ position: "relative" }}>
        <span className="input-icon">{icons.lock}</span>
        <input
          type={visible ? "text" : "password"}
          id="password"
          placeholder="Enter your password"
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
            padding: 0,
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

// ── Login Component ──────────────────────────────────────────────────────────
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const alertTimerRef = useRef(null);

  // ── Snackbar state ─────────────────────────────────────────────────────────
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info"); // "success" | "error" | "warning" | "info"

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const savedUser = localStorage.getItem("rememberedUser");
    if (savedUser) {
      setFormData((prev) => ({ ...prev, identifier: savedUser }));
      setRememberMe(true);
    }
  }, []);

  const showAlert = (severity, message) => {
    clearTimeout(alertTimerRef.current);
    setAlertType(severity);
    setAlertMessage(message);
    setOpenAlert(true);
    // autoHideDuration on Snackbar handles auto-close, but keep timer ref
    // in sync so manual clearAlert can cancel it cleanly.
    alertTimerRef.current = setTimeout(() => setOpenAlert(false), 5000);
  };

  const clearAlert = () => {
    clearTimeout(alertTimerRef.current);
    setOpenAlert(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    clearAlert();
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateLoginForm(formData);
    if (validationError) {
      showAlert("error", validationError);
      return;
    }

    setLoading(true);
    clearAlert();

    try {
      const payload = {
        password: formData.password,
        ...(EMAIL_RE.test(formData.identifier)
          ? { email: formData.identifier }
          : { phone: formData.identifier }),
      };

      if (rememberMe) {
        localStorage.setItem("rememberedUser", formData.identifier);
      } else {
        localStorage.removeItem("rememberedUser");
      }

      const response = await axios.post(`${API_BASE_URL}login`, payload);
      const { status, message = "Login successful!", token } = response.data;

      if (token) localStorage.setItem("token", token);
      const role = String(response.data.user.role);

      if (role === "1") localStorage.setItem("role", "admin");
      else if (role === "2") localStorage.setItem("role", "driver");
      else if (role === "3") localStorage.setItem("role", "passenger");
      else localStorage.removeItem("role");

      showAlert(status === "success" ? "success" : "info", message);

      if (status === "success") {
        setFormData({ identifier: "", password: "" });
        setTimeout(() => navigate(from, { replace: true }), 500);
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

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Snackbar (replaces GlobalAlert) ── */}
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

      <motion.div
        className="auth-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ── LEFT PANEL ── */}
        <motion.div className="image-section" variants={leftPanelVariants}>
          <div className="floating-shapes">
            <div className="shape" />
            <div className="shape" />
            <div className="shape" />
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
              Your Journey Starts Here
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.6 }}
            >
              Experience seamless travel with our premium ride booking service.
              Safe, reliable, and always on time.
            </motion.p>
          </div>
          <Link to="/" className="back-btn">
            <FaArrowLeft /> Back
          </Link>
        </motion.div>

        {/* ── RIGHT PANEL ── */}
        <motion.div className="form-section" variants={rightPanelVariants}>
          <motion.div
            className="form-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="logo-section">
              <div className="logo-icon">
                <FaUserAlt />
              </div>
            </div>

            <h2>Welcome Back</h2>
            <p className="subtitle">Sign in to continue your journey</p>

            <form onSubmit={handleSubmit}>
              <IdentifierField
                value={formData.identifier}
                onChange={handleChange}
              />
              <PasswordField
                value={formData.password}
                onChange={handleChange}
              />

              <div className="forgot-password">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    id="terms"
                    className="checkbox-input"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <span className="checkbox-text">Remember me</span>
                </label>
                <a href="#forgot">Forgot Password?</a>
              </div>

              <motion.button
                type="submit"
                className="auth-login-btn"
                whileTap={{ scale: loading ? 1 : 0.98 }}
                disabled={loading}
                style={{ opacity: loading ? 0.75 : 1 }}
              >
                Sign In
              </motion.button>
            </form>

            <div className="signup-link">
              Don't have an account?{" "}
              <Link to="/signup">Create your account</Link>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
