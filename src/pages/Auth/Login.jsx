
import { useRef, useState, useEffect } from "react";
import { FaCarAlt, FaUserAlt } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import ArcLoader from "../../components/Loader";
import { Input } from "antd";

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
      <ArcLoader />
    </div>
  );
}

// ── Password Field ────────────────────────────────────────────────────────────
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

// ── Tab Toggle ────────────────────────────────────────────────────────────────
function LoginTabToggle({ activeTab, onSwitch }) {
  return (
    <div className="tabs-grp">
      {["email", "mobile"].map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onSwitch(tab)}
          className={`login-tab ${activeTab === tab ? "login-tab--active" : ""}`}
        >
          {tab === "email" ? "Email & Password" : "Mobile OTP"}
        </button>
      ))}
    </div>
  );
}

// ── Login Component ───────────────────────────────────────────────────────────
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const alertTimerRef = useRef(null);
  const otpTimerRef = useRef(null);

  const [activeTab, setActiveTab] = useState("mobile");

  // Email login state
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

  // Mobile OTP state
  const [mobileNumber, setMobileNumber] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // Shared state
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const savedUser = localStorage.getItem("rememberedUser");
    if (savedUser) {
      setFormData((prev) => ({ ...prev, identifier: savedUser }));
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(alertTimerRef.current);
      clearInterval(otpTimerRef.current);
    };
  }, []);

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

  // ── Tab switch ────────────────────────────────────────────────────────────
  const handleTabSwitch = (tab) => {
    clearAlert();
    setActiveTab(tab);
    setOtpSent(false);
    setEnteredOtp("");
    setGeneratedOtp("");
    setMobileNumber("");
    setResendTimer(0);
    clearInterval(otpTimerRef.current);
  };

  // ── Email login ───────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { id, value } = e.target;
    clearAlert();
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleEmailSubmit = async (e) => {
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

      if (rememberMe)
        localStorage.setItem("rememberedUser", formData.identifier);
      else localStorage.removeItem("rememberedUser");

      const response = await axios.post(`${API_BASE_URL}login`, payload);
      const { status, message = "Login successful!", token } = response.data;

      localStorage.setItem("user", JSON.stringify(response.data.user));
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
      showAlert(error?.response?.data?.severity || "error", apiMessage);
    } finally {
      setLoading(false);
    }
  };

  // ── Mobile OTP ────────────────────────────────────────────────────────────
  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobileNumber(value);
    clearAlert();
    if (otpSent) {
      setOtpSent(false);
      setEnteredOtp("");
      setGeneratedOtp("");
      clearInterval(otpTimerRef.current);
      setResendTimer(0);
    }
  };

  const startResendTimer = () => {
    setResendTimer(30);
    clearInterval(otpTimerRef.current);
    otpTimerRef.current = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(otpTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = () => {
    if (!PHONE_RE.test(mobileNumber)) {
      showAlert("error", "Enter a valid 10-digit mobile number.");
      return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setOtpSent(true);
    setEnteredOtp("");
    startResendTimer();
    clearAlert();
    console.log("OTP:", otp);
    showAlert("success", `OTP sent to +91 ${mobileNumber}`);
  };

  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    if (!otpSent) {
      handleSendOtp();
      return;
    }

    if (enteredOtp.length !== 6) {
      showAlert("error", "Please enter the 6-digit OTP.");
      return;
    }
    if (enteredOtp !== generatedOtp) {
      showAlert("error", "Invalid OTP. Please try again.");
      return;
    }

    setLoading(true);
    clearAlert();

    try {
      const response = await axios.post(`${API_BASE_URL}login`, {
        phone: mobileNumber,
      });
      const { status, message = "Login successful!", token } = response.data;

      localStorage.setItem("user", JSON.stringify(response.data.user));
      if (token) localStorage.setItem("token", token);

      const role = String(response.data.user.role);
      if (role === "1") localStorage.setItem("role", "admin");
      else if (role === "2") localStorage.setItem("role", "driver");
      else if (role === "3") localStorage.setItem("role", "passenger");
      else localStorage.removeItem("role");

      showAlert(status === "success" ? "success" : "info", message);
      if (status === "success") {
        setTimeout(() => navigate(from, { replace: true }), 500);
      }
    } catch (error) {
      const apiMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong. Please try again.";
      showAlert(error?.response?.data?.severity || "error", apiMessage);
    } finally {
      setLoading(false);
    }
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

      <div className="auth-container">
        {/* LEFT PANEL */}
        <div className="image-section">
          <div className="floating-shapes">
            <div className="shape" />
            <div className="shape" />
            <div className="shape" />
          </div>
          <div className="image-overlay">
            <div className="auth-logo">
              <div className="auth-logo-icon">
                <FaCarAlt />
              </div>
              <h2>Carpooling</h2>
            </div>
            <h1>Your Journey Starts Here</h1>
            <p>
              Experience seamless travel with our premium ride booking service.
              Safe, reliable, and always on time.
            </p>
          </div>
          <Link to="/" className="back-btn">
            <FaArrowLeft /> Back
          </Link>
        </div>

        {/* RIGHT PANEL */}
        <div className="form-section">
          <div className="form-container">
            <Link to="/" className="auth-back-btn">
              <FaArrowLeft />
            </Link>

            <div className="logo-section">
              <div className="logo-icon">
                <FaUserAlt />
              </div>
            </div>

            <h2>Welcome Back</h2>
            <p className="subtitle">Sign in to continue your journey</p>

            <LoginTabToggle activeTab={activeTab} onSwitch={handleTabSwitch} />

            {/* ── EMAIL & PASSWORD TAB ── */}
            {activeTab === "email" && (
              <form onSubmit={handleEmailSubmit}>
                <div className="form-group">
                  <label htmlFor="identifier">Email</label>
                  <div className="input-wrapper">
                    <span className="input-icon">{icons.email}</span>
                    <input
                      type="text"
                      id="identifier"
                      placeholder="Enter your email or phone number"
                      required
                      value={formData.identifier}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <PasswordField
                  value={formData.password}
                  onChange={handleChange}
                />

                <div className="forgot-password">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="checkbox-input"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <span className="checkbox-text">Remember me</span>
                  </label>
                  <a href="#forgot">Forgot Password?</a>
                </div>

                <button
                  type="submit"
                  className="auth-login-btn"
                  disabled={loading}
                  style={{ opacity: loading ? 0.75 : 1 }}
                >
                  Sign In
                </button>
              </form>
            )}

            {/* ── MOBILE OTP TAB ── */}
            {activeTab === "mobile" && (
              <form onSubmit={handleMobileSubmit}>
                {/* Mobile number */}
                <div className="form-group">
                  <label htmlFor="mobileNumber">Mobile Number</label>
                  <div
                    className="input-wrapper"
                    style={{ position: "relative" }}
                  >
                    <span className="input-icon">{icons.phone}</span>
                    <input
                      type="tel"
                      id="mobileNumber"
                      placeholder="Enter your 10-digit mobile number"
                      required
                      value={mobileNumber}
                      onChange={handleMobileChange}
                      className="field-input"
                      maxLength={10}
                      style={{ paddingRight: otpSent ? "10px" : "90px" }}
                    />
                  </div>
                </div>

                {/* OTP Input — Ant Design OTP boxes */}
                {otpSent && (
                  <div className="form-group">
                    <label>
                      <span>Enter OTP</span>
                    </label>

                    {/* Ant Design OTP input */}
                    <div className="otp-input-wrap">
                      <Input.OTP
                        length={6}
                        value={enteredOtp}
                        onChange={(val) => setEnteredOtp(val)}
                      />
                    </div>

                    {/* Resend */}
                    <div
                      className="resend-otp"
                      style={{
                        marginTop: "10px",
                        fontSize: "12px",
                        color: "#6b7280",
                      }}
                    >
                      {resendTimer > 0 ? (
                        <span>
                          Resend OTP in{" "}
                          <strong style={{ color: "#0033a1" }}>
                            {resendTimer}s
                          </strong>
                        </span>
                      ) : (
                        <span>
                          Didn&apos;t receive it?{" "}
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              color: "#0033a1",
                              fontWeight: 700,
                              fontSize: "12px",
                              padding: 0,
                            }}
                          >
                            Resend OTP
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="auth-login-btn"
                  disabled={loading}
                  style={{ opacity: loading ? 0.75 : 1, marginTop: "8px" }}
                >
                  {otpSent ? "Verify & Sign In" : "Get OTP"}
                </button>
              </form>
            )}

            <div className="signup-link">
              Don&apos;t have an account?{" "}
              <Link to="/signup">Create your account</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
