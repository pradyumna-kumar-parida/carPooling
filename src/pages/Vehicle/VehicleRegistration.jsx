import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  FormLabel,
  Button,
  Stepper,
  Step,
  StepLabel,
  Alert,
  LinearProgress,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import {
  FaCar,
  FaFileUpload,
  FaCheckCircle,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Header from "../../components/Nav";
import Footer from "../../components/Footer";
import { API_BASE_URL } from "../../utils/api";
import axios from "axios";
import { FaHourglassHalf } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import sucessBedge from "../../assets/Images/sucess-bedge.png";
import ArcLoader from "../../components/Loader";

const STEPS = [
  "Basic Information",
  "Registration & Documents",
  "Insurance Details",
  "Vehicle Features & Photos",
];

const CAR_BRANDS = [
  "Maruti Suzuki",
  "Hyundai",
  "Tata",
  "Honda",
  "Toyota",
  "Mahindra",
  "Kia",
  "MG",
  "Others",
];

const COLORS = [
  "White",
  "Black",
  "Silver",
  "Red",
  "Blue",
  "Grey",
  "Green",
  "Yellow",
  "Orange",
  "Others",
];

const FUEL_TYPES = ["Petrol", "Diesel", "CNG", "Electric (EV)", "Hybrid"];
const SEAT_OPTIONS = ["2", "3", "4", "5", "6", "7", "8"];

const CURRENT_YEAR = new Date().getFullYear();
const MANUFACTURE_YEARS = Array.from(
  { length: 15 },
  (_, i) => CURRENT_YEAR - i,
);

const PHOTO_FIELDS = [
  { key: "frontPhoto", label: "Front View" },
  { key: "backPhoto", label: "Back View" },
  { key: "sidePhoto", label: "Side View" },
  { key: "numberPlatePhoto", label: "Number Plate" },
];

const INITIAL_VEHICLE_DATA = {
  brand: "",
  model: "",
  color: "",
  registrationNumber: "",
  rcNumber: "",
  rcExpiryDate: "",
  rcDocument: null,
  insuranceProvider: "",
  policyNumber: "",
  insuranceExpiryDate: "",
  manufacturyDate: "",
  insuranceDocument: null,
  numberOfSeats: "",
  fuelType: "",
  frontPhoto: null,
  backPhoto: null,
  sidePhoto: null,
  numberPlatePhoto: null,
};

const FileUploadBox = ({
  fieldName,
  file,
  preview,
  error,
  accept,
  onChange,
  onRemove,
}) => {
  if (file) {
    return (
      <div className="vehicledetails-file-preview">
        {preview?.startsWith("data:image") ? (
          <img
            src={preview}
            alt={fieldName}
            className="vehicledetails-preview-image"
            loading="eager"
          />
        ) : (
          <div className="vehicledetails-file-info">
            <FaFileUpload className="vehicledetails-file-icon" />
            <span>{file.name}</span>
          </div>
        )}
        <Button
          variant="outlined"
          color="error"
          size="small"
          startIcon={<MdDelete />}
          onClick={() => onRemove(fieldName)}
          className="vehicledetails-remove-btn"
        >
          Remove
        </Button>
      </div>
    );
  }

  return (
    <div className={`vehicledetails-upload-box ${error ? "error" : ""}`}>
      <input
        type="file"
        accept={accept}
        onChange={(e) => onChange(e, fieldName)}
        className="vehicledetails-file-input"
        id={fieldName}
      />
      <label htmlFor={fieldName} className="vehicledetails-upload-label">
        <FaCloudUploadAlt className="vehicledetails-upload-icon" />
        <span className="vehicledetails-upload-text">
          Click to upload or drag and drop
        </span>
        <span className="vehicledetails-upload-hint">
          PNG, JPG, PDF (max. 5MB)
        </span>
      </label>
    </div>
  );
};

const PageLoader = () => {
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
};
const PhotoUploadBox = ({
  fieldKey,
  label,
  file,
  preview,
  error,
  onChange,
  onRemove,
}) => {
  if (file) {
    return (
      <div className="vehicledetails-photo-item">
        <FormLabel className="vehicledetails-label">{label} *</FormLabel>
        <div className="vehicledetails-photo-preview">
          <img src={preview} alt={label} loading="eager" />
          <button
            className="vehicledetails-photo-remove"
            onClick={() => onRemove(fieldKey)}
          >
            <MdDelete />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="vehicledetails-photo-item">
      <FormLabel className="vehicledetails-label">{label} *</FormLabel>
      <div className={`vehicledetails-photo-box ${error ? "error" : ""}`}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onChange(e, fieldKey)}
          className="vehicledetails-file-input"
          id={fieldKey}
        />
        <label htmlFor={fieldKey} className="vehicledetails-photo-label">
          <FaCloudUploadAlt />
          <span>Upload</span>
        </label>
      </div>
      {error && <span className="vehicledetails-error">{error}</span>}
    </div>
  );
};

const SuccessScreen = ({ onViewDetails, onGoHome }) => (
  <div className="registration--sucess-box">
    <div className="sucess-status-badge">
      <FaHourglassHalf /> Pending verification
    </div>

    <div className="sucessBedge">
      <img src={sucessBedge} alt="sucess-bedge" height="100%" width="100%" />
    </div>

    <h2 className="sucess-heading">Registration Successful!</h2>
    <p className="sucess-subheading">
      Your vehicle details have been submitted. Our team will review and verify
      your documents within 24–48 hours.
    </p>

    {/* Checklist */}
    <div className="basicDetails-registration">
      {[
        "Basic information saved",
        "RC document uploaded",
        "Insurance document uploaded",
        "Vehicle photos uploaded",
      ].map((item) => (
        <div className="details-Items" key={item}>
          <IoMdCheckmarkCircleOutline
            color="#3b82f6"
            size={14}
            style={{ flexShrink: 0 }}
          />
          {item}
        </div>
      ))}
    </div>

    <div className="fotter-registration-btn">
      <Button
        variant="contained"
        onClick={onViewDetails}
        className="vehicledetails-btn-next"
      >
        View Vehicle Details
      </Button>
      <Button
        variant="outlined"
        onClick={onGoHome}
        className="vehicledetails-btn-back"
      >
        Go to Dashboard
      </Button>
    </div>
  </div>
);

const VehicleDetails = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const [vehicleData, setVehicleData] = useState(INITIAL_VEHICLE_DATA);
  const [filePreview, setFilePreview] = useState({});
  const [errors, setErrors] = useState({});

  const showToast = (message, severity = "error") =>
    setToast({ open: true, message, severity });

  const handleCloseToast = (_, reason) => {
    if (reason === "clickaway") return;
    setToast((prev) => ({ ...prev, open: false }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVehicleData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "File size should not exceed 5MB",
      }));
      return;
    }

    setVehicleData((prev) => ({ ...prev, [fieldName]: file }));

    const reader = new FileReader();
    reader.onloadend = () =>
      setFilePreview((prev) => ({ ...prev, [fieldName]: reader.result }));
    reader.readAsDataURL(file);

    if (errors[fieldName]) setErrors((prev) => ({ ...prev, [fieldName]: "" }));
  };

  const handleRemoveFile = (fieldName) => {
    setVehicleData((prev) => ({ ...prev, [fieldName]: null }));
    setFilePreview((prev) => ({ ...prev, [fieldName]: null }));
  };

  const validateStep = (step) => {
    const e = {};

    if (step === 0) {
      if (!vehicleData.brand) e.brand = "Please select brand";
      if (!vehicleData.model) e.model = "Please enter model";
      if (!vehicleData.color) e.color = "Please select color";
      if (!vehicleData.registrationNumber)
        e.registrationNumber = "Please enter registration number";
    }

    if (step === 1) {
      if (!vehicleData.rcNumber) e.rcNumber = "Please enter RC number";
      if (!vehicleData.rcExpiryDate)
        e.rcExpiryDate = "Please select RC expiry date";
      if (!vehicleData.rcDocument) e.rcDocument = "Please upload RC document";
    }

    if (step === 2) {
      if (!vehicleData.insuranceProvider)
        e.insuranceProvider = "Please enter insurance provider";
      if (!vehicleData.policyNumber)
        e.policyNumber = "Please enter policy number";
      if (!vehicleData.insuranceExpiryDate)
        e.insuranceExpiryDate = "Please select insurance expiry date";
      if (!vehicleData.manufacturyDate)
        e.manufacturyDate = "Please select vehicle manufacture year";
      if (!vehicleData.insuranceDocument)
        e.insuranceDocument = "Please upload insurance document";
    }

    if (step === 3) {
      if (!vehicleData.numberOfSeats)
        e.numberOfSeats = "Please select number of seats";
      if (!vehicleData.fuelType) e.fuelType = "Please select fuel type";
      if (!vehicleData.frontPhoto) e.frontPhoto = "Please upload front photo";
      if (!vehicleData.backPhoto) e.backPhoto = "Please upload back photo";
      if (!vehicleData.sidePhoto) e.sidePhoto = "Please upload side photo";
      if (!vehicleData.numberPlatePhoto)
        e.numberPlatePhoto = "Please upload number plate photo";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setCompletedSteps((prev) => [...prev, activeStep]);
      setActiveStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!validateStep(activeStep)) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user")) || {};

      const formData = new FormData();
      formData.append("user_id", user?.id);
      formData.append("brand", vehicleData.brand || "");
      formData.append("model", vehicleData.model || "");
      formData.append("manufacture_year", vehicleData.manufacturyDate || "");
      formData.append(
        "registration_number",
        vehicleData.registrationNumber || "",
      );
      formData.append("color", vehicleData.color || "");
      formData.append("seats", vehicleData.numberOfSeats || "");
      formData.append("available_seats", vehicleData.numberOfSeats || "");
      formData.append("fuel_type", vehicleData.fuelType || "");
      formData.append("rc_number", vehicleData.rcNumber || "");
      formData.append("rc_expiry_date", vehicleData.rcExpiryDate || "");
      formData.append(
        "insurance_provider",
        vehicleData.insuranceProvider || "",
      );
      formData.append("policy_number", vehicleData.policyNumber || "");
      formData.append("front_image", vehicleData.frontPhoto || "");
      formData.append("back_image", vehicleData.backPhoto || "");
      formData.append("side_image", vehicleData.sidePhoto || "");
      formData.append("number_plate_image", vehicleData.numberPlatePhoto || "");

      // Files
      if (vehicleData.rcDocument) {
        formData.append("rc_file", vehicleData.rcDocument);
      } else {
        formData.append("rc_file", "");
      }

      if (vehicleData.insuranceDocument) {
        formData.append("insurance_file", vehicleData.insuranceDocument);
      } else {
        formData.append("insurance_file", "");
      }

      formData.append(
        "insurance_expiry",
        vehicleData.insuranceExpiryDate || "",
      );

      const response = await axios.post(
        `${API_BASE_URL}store-vehicle-data`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        },
      );

      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === "success"
      ) {
        setIsSuccess(true);

        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        showToast(
          response.data?.message || "Submission failed. Please try again.",
        );
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong. Please try again.";
      showToast(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ zIndex: 9999 }}
      >
        <MuiAlert
          severity={toast.severity}
          variant="filled"
          onClose={handleCloseToast}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </MuiAlert>
      </Snackbar>
      {loading && <PageLoader />}
      <Header />
      <div className="vehicledetails-page">
        <div className="vehicledetails-container">
          {/* Page header */}

          <div className="vehicledetails-header">
            <h1 className="vehicledetails-title">Vehicle Registration</h1>
            <p className="vehicledetails-subtitle">
              Complete your vehicle details to start earning with us
            </p>
          </div>

          {!isSuccess && (
            <div className="vehicledetails-stepper-wrapper">
              <Stepper
                activeStep={isSuccess ? STEPS.length : activeStep}
                className="vehicledetails-stepper"
              >
                {STEPS.map((label, index) => (
                  <Step
                    key={label}
                    completed={isSuccess || completedSteps.includes(index)}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <LinearProgress
                variant="determinate"
                value={
                  isSuccess ? 100 : (activeStep / (STEPS.length - 1)) * 100
                }
                className="vehicledetails-progress"
              />
            </div>
          )}

          <div className="vehicledetails-content">
            {isSuccess ? (
              <SuccessScreen
                onViewDetails={() => (window.location.href = "/my-vehicle")}
                onGoHome={() => (window.location.href = "/")}
              />
            ) : (
              <>
                {activeStep === 0 && (
                  <div className="vehicledetails-section">
                    <h2 className="vehicledetails-section-title">
                      <FaCar className="vehicledetails-section-icon" />
                      Basic Vehicle Information
                    </h2>

                    <div className="vehicledetails-grid-2">
                      <TextField
                        select
                        fullWidth
                        label="Brand *"
                        name="brand"
                        value={vehicleData.brand}
                        onChange={handleInputChange}
                        error={!!errors.brand}
                        helperText={errors.brand}
                      >
                        {CAR_BRANDS.map((b) => (
                          <MenuItem key={b} value={b}>
                            {b}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        fullWidth
                        label="Model *"
                        name="model"
                        value={vehicleData.model}
                        onChange={handleInputChange}
                        placeholder="e.g., Swift, Activa, RE Classic"
                        error={!!errors.model}
                        helperText={errors.model}
                        className="vehicledetails-input"
                      />
                    </div>

                    <div className="vehicledetails-grid-2">
                      <TextField
                        select
                        fullWidth
                        label="Color *"
                        name="color"
                        value={vehicleData.color}
                        onChange={handleInputChange}
                        error={!!errors.color}
                        helperText={errors.color}
                        className="vehicledetails-input"
                      >
                        {COLORS.map((c) => (
                          <MenuItem key={c} value={c}>
                            {c}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        fullWidth
                        label="Registration Number *"
                        name="registrationNumber"
                        value={vehicleData.registrationNumber}
                        onChange={handleInputChange}
                        placeholder="e.g., TS09EA1234"
                        error={!!errors.registrationNumber}
                        helperText={errors.registrationNumber}
                        className="vehicledetails-input"
                        inputProps={{ style: { textTransform: "uppercase" } }}
                      />
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="vehicledetails-section">
                    <h2 className="vehicledetails-section-title">
                      Registration & Documents
                    </h2>

                    <Alert severity="info" className="vehicledetails-alert">
                      Please ensure all documents are clear and valid. Maximum
                      file size: 5MB
                    </Alert>

                    <div className="vehicledetails-grid-2">
                      <TextField
                        fullWidth
                        label="RC Number *"
                        name="rcNumber"
                        value={vehicleData.rcNumber}
                        onChange={handleInputChange}
                        placeholder="e.g., TS09EA1234567890"
                        error={!!errors.rcNumber}
                        helperText={errors.rcNumber}
                        className="vehicledetails-input"
                      />
                      <TextField
                        fullWidth
                        type="date"
                        label="RC Expiry Date *"
                        name="rcExpiryDate"
                        value={vehicleData.rcExpiryDate}
                        onChange={handleInputChange}
                        error={!!errors.rcExpiryDate}
                        helperText={errors.rcExpiryDate}
                        className="vehicledetails-input"
                        InputLabelProps={{ shrink: true }}
                      />
                    </div>

                    <div className="vehicledetails-upload-section">
                      <FormLabel className="vehicledetails-label">
                        Upload RC Document *
                      </FormLabel>
                      <FileUploadBox
                        fieldName="rcDocument"
                        file={vehicleData.rcDocument}
                        preview={filePreview.rcDocument}
                        error={errors.rcDocument}
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        onRemove={handleRemoveFile}
                      />
                      {errors.rcDocument && (
                        <span className="vehicledetails-error">
                          {errors.rcDocument}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="vehicledetails-section">
                    <h2 className="vehicledetails-section-title">
                      Insurance Details
                    </h2>

                    <div className="vehicledetails-grid-2">
                      <TextField
                        fullWidth
                        label="Insurance Provider *"
                        name="insuranceProvider"
                        value={vehicleData.insuranceProvider}
                        onChange={handleInputChange}
                        placeholder="e.g., ICICI Lombard, HDFC ERGO"
                        error={!!errors.insuranceProvider}
                        helperText={errors.insuranceProvider}
                        className="vehicledetails-input"
                      />
                      <TextField
                        fullWidth
                        label="Policy Number *"
                        name="policyNumber"
                        value={vehicleData.policyNumber}
                        onChange={handleInputChange}
                        placeholder="e.g., POL1234567890"
                        error={!!errors.policyNumber}
                        helperText={errors.policyNumber}
                        className="vehicledetails-input"
                      />
                    </div>

                    <div className="vehicledetails-grid-2">
                      <TextField
                        fullWidth
                        type="date"
                        label="Insurance Expiry Date *"
                        name="insuranceExpiryDate"
                        value={vehicleData.insuranceExpiryDate}
                        onChange={handleInputChange}
                        error={!!errors.insuranceExpiryDate}
                        helperText={errors.insuranceExpiryDate}
                        className="vehicledetails-input"
                        InputLabelProps={{ shrink: true }}
                      />
                      <TextField
                        select
                        fullWidth
                        label="Vehicle Manufacture Year *"
                        name="manufacturyDate"
                        value={vehicleData.manufacturyDate}
                        onChange={handleInputChange}
                        error={!!errors.manufacturyDate}
                        helperText={errors.manufacturyDate}
                        className="vehicledetails-input"
                      >
                        {MANUFACTURE_YEARS.map((y) => (
                          <MenuItem key={y} value={y}>
                            {y}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>

                    <div className="vehicledetails-upload-section">
                      <FormLabel className="vehicledetails-label">
                        Upload Insurance Document *
                      </FormLabel>
                      <FileUploadBox
                        fieldName="insuranceDocument"
                        file={vehicleData.insuranceDocument}
                        preview={filePreview.insuranceDocument}
                        error={errors.insuranceDocument}
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        onRemove={handleRemoveFile}
                      />
                      {errors.insuranceDocument && (
                        <span className="vehicledetails-error">
                          {errors.insuranceDocument}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="vehicledetails-section">
                    <h2 className="vehicledetails-section-title">
                      Vehicle Capacity & Features
                    </h2>

                    <div className="vehicledetails-grid-3">
                      <TextField
                        select
                        fullWidth
                        label="Number of Seats *"
                        name="numberOfSeats"
                        value={vehicleData.numberOfSeats}
                        onChange={handleInputChange}
                        error={!!errors.numberOfSeats}
                        helperText={errors.numberOfSeats}
                        className="vehicledetails-input"
                      >
                        {SEAT_OPTIONS.map((s) => (
                          <MenuItem key={s} value={s}>
                            {s} Seats
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        select
                        fullWidth
                        label="Fuel Type *"
                        name="fuelType"
                        value={vehicleData.fuelType}
                        onChange={handleInputChange}
                        error={!!errors.fuelType}
                        helperText={errors.fuelType}
                        className="vehicledetails-input"
                      >
                        {FUEL_TYPES.map((f) => (
                          <MenuItem key={f} value={f}>
                            {f}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>

                    <div className="vehicledetails-photos-section">
                      <h3 className="vehicledetails-subsection-title">
                        Vehicle Photos *
                      </h3>
                      <Alert severity="info" className="vehicledetails-alert">
                        Upload clear photos of your vehicle from all angles
                      </Alert>

                      <div className="vehicledetails-photo-grid">
                        {PHOTO_FIELDS.map(({ key, label }) => (
                          <PhotoUploadBox
                            key={key}
                            fieldKey={key}
                            label={label}
                            file={vehicleData[key]}
                            preview={filePreview[key]}
                            error={errors[key]}
                            onChange={handleFileChange}
                            onRemove={handleRemoveFile}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="vehicledetails-actions">
                  {activeStep > 0 && (
                    <Button
                      variant="outlined"
                      onClick={handleBack}
                      disabled={loading}
                      className="vehicledetails-btn-back"
                    >
                      Back
                    </Button>
                  )}
                  <div className="vehicledetails-actions-right">
                    {activeStep < STEPS.length - 1 ? (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={loading}
                        className="vehicledetails-btn-next"
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="vehicledetails-btn-submit"
                        style={{ opacity: loading ? 0.85 : 1 }}
                      >
                        Submit for Verification
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VehicleDetails;
