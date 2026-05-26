import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  Button,
  Stepper,
  Step,
  StepLabel,
  Alert,
  LinearProgress,
  Chip,
} from "@mui/material";
import {
  FaCar,
  FaMotorcycle,
  FaTaxi,
  FaFileUpload,
  FaCheckCircle,
  FaTimesCircle,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Header from "../../components/Nav";
import Footer from "../../components/Footer";

const VehicleDetails = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  // Form Data State
  const [vehicleData, setVehicleData] = useState({
    // Basic Info
    vehicleType: "",
    brand: "",
    model: "",
    color: "",
    registrationNumber: "",

    // Registration & Documents
    rcNumber: "",
    rcExpiryDate: "",
    rcDocument: null,

    // Insurance
    insuranceProvider: "",
    policyNumber: "",
    insuranceExpiryDate: "",
    insuranceDocument: null,

    // Capacity & Features
    numberOfSeats: "",
    fuelType: "",
    acAvailable: "",
    music: false,
    petsAllowed: false,
    smokingAllowed: false,
    luggageSpace: false,

    // Photos
    frontPhoto: null,
    backPhoto: null,
    sidePhoto: null,
    numberPlatePhoto: null,
  });

  const [filePreview, setFilePreview] = useState({});
  const [errors, setErrors] = useState({});

  const steps = [
    "Basic Information",
    "Registration & Documents",
    "Insurance Details",
    "Vehicle Features & Photos",
  ];

  const carBrands = [
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

  const colors = [
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
  const fuelTypes = ["Petrol", "Diesel", "CNG", "Electric (EV)", "Hybrid"];
  const seatOptions = ["2", "3", "4", "5", "6", "7", "8+"];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVehicleData({
      ...vehicleData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          [fieldName]: "File size should not exceed 5MB",
        });
        return;
      }

      setVehicleData({
        ...vehicleData,
        [fieldName]: file,
      });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview({
          ...filePreview,
          [fieldName]: reader.result,
        });
      };
      reader.readAsDataURL(file);

      // Clear error
      if (errors[fieldName]) {
        setErrors({ ...errors, [fieldName]: "" });
      }
    }
  };

  const handleRemoveFile = (fieldName) => {
    setVehicleData({
      ...vehicleData,
      [fieldName]: null,
    });
    setFilePreview({
      ...filePreview,
      [fieldName]: null,
    });
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0) {
      if (!vehicleData.brand) newErrors.brand = "Please select brand";
      if (!vehicleData.model) newErrors.model = "Please enter model";
      if (!vehicleData.color) newErrors.color = "Please select color";
      if (!vehicleData.registrationNumber)
        newErrors.registrationNumber = "Please enter registration number";
    }

    if (step === 1) {
      if (!vehicleData.rcNumber) newErrors.rcNumber = "Please enter RC number";
      if (!vehicleData.rcExpiryDate)
        newErrors.rcExpiryDate = "Please select RC expiry date";
      if (!vehicleData.rcDocument)
        newErrors.rcDocument = "Please upload RC document";
    }

    if (step === 2) {
      if (!vehicleData.insuranceProvider)
        newErrors.insuranceProvider = "Please enter insurance provider";
      if (!vehicleData.policyNumber)
        newErrors.policyNumber = "Please enter policy number";
      if (!vehicleData.insuranceExpiryDate)
        newErrors.insuranceExpiryDate = "Please select insurance expiry date";
      if (!vehicleData.insuranceDocument)
        newErrors.insuranceDocument = "Please upload insurance document";
    }

    if (step === 3) {
      if (!vehicleData.numberOfSeats)
        newErrors.numberOfSeats = "Please select number of seats";
      if (!vehicleData.fuelType) newErrors.fuelType = "Please select fuel type";
      if (!vehicleData.acAvailable)
        newErrors.acAvailable = "Please select AC availability";
      if (!vehicleData.frontPhoto)
        newErrors.frontPhoto = "Please upload front photo";
      if (!vehicleData.backPhoto)
        newErrors.backPhoto = "Please upload back photo";
      if (!vehicleData.sidePhoto)
        newErrors.sidePhoto = "Please upload side photo";
      if (!vehicleData.numberPlatePhoto)
        newErrors.numberPlatePhoto = "Please upload number plate photo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setCompletedSteps([...completedSteps, activeStep]);
      setActiveStep((prevStep) => prevStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = () => {
    if (validateStep(activeStep)) {
      console.log("Vehicle Data:", vehicleData);
      alert("Vehicle details submitted successfully!");
      // Here you would typically send data to backend
    }
  };

  const getBrandOptions = () => {
    return carBrands;
  };
  return (
    <>
      <Header />
      <div className="vehicledetails-page">
        <div className="vehicledetails-container">
          {/* Header */}
          <div className="vehicledetails-header">
            <h1 className="vehicledetails-title">Vehicle Registration</h1>
            <p className="vehicledetails-subtitle">
              Complete your vehicle details to start earning with us
            </p>
          </div>

          {/* Stepper */}
          <div className="vehicledetails-stepper-wrapper">
            <Stepper activeStep={activeStep} className="vehicledetails-stepper">
              {steps.map((label, index) => (
                <Step key={label} completed={completedSteps.includes(index)}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <LinearProgress
              variant="determinate"
              value={(activeStep / (steps.length - 1)) * 100}
              className="vehicledetails-progress"
            />
          </div>

          {/* Form Content */}
          <div className="vehicledetails-content">
            {/* Step 1: Basic Information */}
            {activeStep === 0 && (
              <div className="vehicledetails-section">
                <h2 className="vehicledetails-section-title">
                  <FaCar className="vehicledetails-section-icon" />
                  Basic Vehicle Information
                </h2>

                {/* Brand & Model */}
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
                    {carBrands.map((brand) => (
                      <MenuItem key={brand} value={brand}>
                        {brand}
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

                {/* Color & Registration */}
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
                    {colors.map((color) => (
                      <MenuItem key={color} value={color}>
                        {color}
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

            {/* Step 2: Registration & Documents */}
            {activeStep === 1 && (
              <div className="vehicledetails-section">
                <h2 className="vehicledetails-section-title">
                  Registration & Documents
                </h2>

                <Alert severity="info" className="vehicledetails-alert">
                  Please ensure all documents are clear and valid. Maximum file
                  size: 5MB
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

                {/* RC Document Upload */}
                <div className="vehicledetails-upload-section">
                  <FormLabel className="vehicledetails-label">
                    Upload RC Document *
                  </FormLabel>
                  {!vehicleData.rcDocument ? (
                    <div
                      className={`vehicledetails-upload-box ${errors.rcDocument ? "error" : ""}`}
                    >
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(e, "rcDocument")}
                        className="vehicledetails-file-input"
                        id="rcDocument"
                      />
                      <label
                        htmlFor="rcDocument"
                        className="vehicledetails-upload-label"
                      >
                        <FaCloudUploadAlt className="vehicledetails-upload-icon" />
                        <span className="vehicledetails-upload-text">
                          Click to upload or drag and drop
                        </span>
                        <span className="vehicledetails-upload-hint">
                          PNG, JPG, PDF (max. 5MB)
                        </span>
                      </label>
                    </div>
                  ) : (
                    <div className="vehicledetails-file-preview">
                      {filePreview.rcDocument &&
                      filePreview.rcDocument.startsWith("data:image") ? (
                        <img
                          src={filePreview.rcDocument}
                          alt="RC"
                          className="vehicledetails-preview-image"
                          loading="eager"
                        />
                      ) : (
                        <div className="vehicledetails-file-info">
                          <FaFileUpload className="vehicledetails-file-icon" />
                          <span>{vehicleData.rcDocument.name}</span>
                        </div>
                      )}
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<MdDelete />}
                        onClick={() => handleRemoveFile("rcDocument")}
                        className="vehicledetails-remove-btn"
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                  {errors.rcDocument && (
                    <span className="vehicledetails-error">
                      {errors.rcDocument}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Insurance Details */}
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
                </div>

                {/* Insurance Document Upload */}
                <div className="vehicledetails-upload-section">
                  <FormLabel className="vehicledetails-label">
                    Upload Insurance Document *
                  </FormLabel>
                  {!vehicleData.insuranceDocument ? (
                    <div
                      className={`vehicledetails-upload-box ${errors.insuranceDocument ? "error" : ""}`}
                    >
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) =>
                          handleFileChange(e, "insuranceDocument")
                        }
                        className="vehicledetails-file-input"
                        id="insuranceDocument"
                      />
                      <label
                        htmlFor="insuranceDocument"
                        className="vehicledetails-upload-label"
                      >
                        <FaCloudUploadAlt className="vehicledetails-upload-icon" />
                        <span className="vehicledetails-upload-text">
                          Click to upload or drag and drop
                        </span>
                        <span className="vehicledetails-upload-hint">
                          PNG, JPG, PDF (max. 5MB)
                        </span>
                      </label>
                    </div>
                  ) : (
                    <div className="vehicledetails-file-preview">
                      {filePreview.insuranceDocument &&
                      filePreview.insuranceDocument.startsWith("data:image") ? (
                        <img
                          src={filePreview.insuranceDocument}
                          alt="Insurance"
                          className="vehicledetails-preview-image"
                          loading="eager"
                        />
                      ) : (
                        <div className="vehicledetails-file-info">
                          <FaFileUpload className="vehicledetails-file-icon" />
                          <span>{vehicleData.insuranceDocument.name}</span>
                        </div>
                      )}
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<MdDelete />}
                        onClick={() => handleRemoveFile("insuranceDocument")}
                        className="vehicledetails-remove-btn"
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                  {errors.insuranceDocument && (
                    <span className="vehicledetails-error">
                      {errors.insuranceDocument}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Vehicle Features & Photos */}
            {activeStep === 3 && (
              <div className="vehicledetails-section">
                <h2 className="vehicledetails-section-title">
                  Vehicle Capacity & Features
                </h2>

                {/* Capacity & Fuel */}
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
                    {seatOptions.map((seat) => (
                      <MenuItem key={seat} value={seat}>
                        {seat} Seats
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
                    {fuelTypes.map((fuel) => (
                      <MenuItem key={fuel} value={fuel}>
                        {fuel}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>

                {/* Vehicle Photos */}
                <div className="vehicledetails-photos-section">
                  <h3 className="vehicledetails-subsection-title">
                    Vehicle Photos *
                  </h3>
                  <Alert severity="info" className="vehicledetails-alert">
                    Upload clear photos of your vehicle from all angles
                  </Alert>

                  <div className="vehicledetails-photo-grid">
                    {/* Front Photo */}
                    <div className="vehicledetails-photo-item">
                      <FormLabel className="vehicledetails-label">
                        Front View *
                      </FormLabel>
                      {!vehicleData.frontPhoto ? (
                        <div
                          className={`vehicledetails-photo-box ${errors.frontPhoto ? "error" : ""}`}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, "frontPhoto")}
                            className="vehicledetails-file-input"
                            id="frontPhoto"
                          />
                          <label
                            htmlFor="frontPhoto"
                            className="vehicledetails-photo-label"
                          >
                            <FaCloudUploadAlt />
                            <span>Upload</span>
                          </label>
                        </div>
                      ) : (
                        <div className="vehicledetails-photo-preview">
                          <img
                            src={filePreview.frontPhoto}
                            alt="Front"
                            loading="eager"
                          />
                          <button
                            className="vehicledetails-photo-remove"
                            onClick={() => handleRemoveFile("frontPhoto")}
                          >
                            <MdDelete />
                          </button>
                        </div>
                      )}
                      {errors.frontPhoto && (
                        <span className="vehicledetails-error">
                          {errors.frontPhoto}
                        </span>
                      )}
                    </div>

                    {/* Back Photo */}
                    <div className="vehicledetails-photo-item">
                      <FormLabel className="vehicledetails-label">
                        Back View *
                      </FormLabel>
                      {!vehicleData.backPhoto ? (
                        <div
                          className={`vehicledetails-photo-box ${errors.backPhoto ? "error" : ""}`}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, "backPhoto")}
                            className="vehicledetails-file-input"
                            id="backPhoto"
                          />
                          <label
                            htmlFor="backPhoto"
                            className="vehicledetails-photo-label"
                          >
                            <FaCloudUploadAlt />
                            <span>Upload</span>
                          </label>
                        </div>
                      ) : (
                        <div className="vehicledetails-photo-preview">
                          <img
                            src={filePreview.backPhoto}
                            alt="Back"
                            loading="eager"
                          />
                          <button
                            className="vehicledetails-photo-remove"
                            onClick={() => handleRemoveFile("backPhoto")}
                          >
                            <MdDelete />
                          </button>
                        </div>
                      )}
                      {errors.backPhoto && (
                        <span className="vehicledetails-error">
                          {errors.backPhoto}
                        </span>
                      )}
                    </div>

                    {/* Side Photo */}
                    <div className="vehicledetails-photo-item">
                      <FormLabel className="vehicledetails-label">
                        Side View *
                      </FormLabel>
                      {!vehicleData.sidePhoto ? (
                        <div
                          className={`vehicledetails-photo-box ${errors.sidePhoto ? "error" : ""}`}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, "sidePhoto")}
                            className="vehicledetails-file-input"
                            id="sidePhoto"
                          />
                          <label
                            htmlFor="sidePhoto"
                            className="vehicledetails-photo-label"
                          >
                            <FaCloudUploadAlt />
                            <span>Upload</span>
                          </label>
                        </div>
                      ) : (
                        <div className="vehicledetails-photo-preview">
                          <img
                            src={filePreview.sidePhoto}
                            alt="Side"
                            loading="eager"
                          />
                          <button
                            className="vehicledetails-photo-remove"
                            onClick={() => handleRemoveFile("sidePhoto")}
                          >
                            <MdDelete />
                          </button>
                        </div>
                      )}
                      {errors.sidePhoto && (
                        <span className="vehicledetails-error">
                          {errors.sidePhoto}
                        </span>
                      )}
                    </div>

                    {/* Number Plate Photo */}
                    <div className="vehicledetails-photo-item">
                      <FormLabel className="vehicledetails-label">
                        Number Plate *
                      </FormLabel>
                      {!vehicleData.numberPlatePhoto ? (
                        <div
                          className={`vehicledetails-photo-box ${errors.numberPlatePhoto ? "error" : ""}`}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileChange(e, "numberPlatePhoto")
                            }
                            className="vehicledetails-file-input"
                            id="numberPlatePhoto"
                          />
                          <label
                            htmlFor="numberPlatePhoto"
                            className="vehicledetails-photo-label"
                          >
                            <FaCloudUploadAlt />
                            <span>Upload</span>
                          </label>
                        </div>
                      ) : (
                        <div className="vehicledetails-photo-preview">
                          <img
                            src={filePreview.numberPlatePhoto}
                            alt="Number Plate"
                            loading="eager"
                          />
                          <button
                            className="vehicledetails-photo-remove"
                            onClick={() => handleRemoveFile("numberPlatePhoto")}
                          >
                            <MdDelete />
                          </button>
                        </div>
                      )}
                      {errors.numberPlatePhoto && (
                        <span className="vehicledetails-error">
                          {errors.numberPlatePhoto}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="vehicledetails-actions">
              {activeStep > 0 && (
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  className="vehicledetails-btn-back"
                >
                  Back
                </Button>
              )}
              <div className="vehicledetails-actions-right">
                {activeStep < steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    className="vehicledetails-btn-next"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    className="vehicledetails-btn-submit"
                  >
                    Submit for Verification
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VehicleDetails;
