import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { PiBankBold } from "react-icons/pi";
import { IoDocuments } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { MdOutlineSave } from "react-icons/md";
import { RiUserLocationFill } from "react-icons/ri";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  // Initial user data
  const [userData, setUserData] = useState({
    fullname: "Deepak Kumar",
    email: "deepak.kumar@example.com",
    phone: "+91 9876543210",
    usertype: "Driver",
    password: "********",
    confirmPassword: "********",
    terms: true,
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    postalCode: "400001",
    address: "123, Marine Drive, Mumbai",
    bankAccountHolder: "Deepak Kumar",
    bankAccountNumber: "1234567890123456",
    bankIFSC: "SBIN0001234",
    bankBranchName: "Mumbai Main Branch",
    bankBranchCode: "001234",
    driverLicense: null,
    aadhaarCard: null,
    panCard: null,
    passportPhoto: null,
    bankAccountDetails: null,
    profilePicture: "https://i.pravatar.cc/150?img=12",
  });

  const [editData, setEditData] = useState({ ...userData });
  const [filePreview, setFilePreview] = useState({});

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset to original data
      setEditData({ ...userData });
      setFilePreview({});
    }
    setIsEditing(!isEditing);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Here you would make an API call to save the data
    setUserData({ ...editData });
    setIsEditing(false);
    setFilePreview({});
    // Show success message
    alert("Profile updated successfully!");
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData({
      ...editData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setEditData({
        ...editData,
        [fieldName]: file,
      });

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview({
            ...filePreview,
            [fieldName]: reader.result,
          });
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview({
          ...filePreview,
          [fieldName]: file.name,
        });
      }
    }
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: <FiUser /> },
    { id: "address", label: "Address", icon: <RiUserLocationFill /> },
    { id: "banking", label: "Banking", icon: <PiBankBold /> },
    { id: "documents", label: "Documents", icon: <IoDocuments /> },
  ];

  return (
    <>
      <div className="profile-page">
        <div className="container">
          {/* Header Section */}
          <div className="profile-header">
            <div className="profile-header-content">
              <div className="profile-avatar-section">
                <div className="profile-avatar-wrapper">
                  {isEditing ? (
                    <div className="profile-avatar-edit">
                      <img
                        src={
                          filePreview.profilePicture ||
                          editData.profilePicture ||
                          "https://via.placeholder.com/150"
                        }
                        alt="Profile"
                        className="profile-avatar"
                        loading="lazy"
                      />
                      <label
                        htmlFor="profilePicture"
                        className="avatar-upload-btn"
                      >
                        <FiPlus />
                      </label>
                      <input
                        type="file"
                        id="profilePicture"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "profilePicture")}
                        style={{ display: "none" }}
                      />
                    </div>
                  ) : (
                    <img
                      src={
                        userData.profilePicture ||
                        "https://via.placeholder.com/150"
                      }
                      alt="Profile"
                      className="profile-avatar"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="profile-info">
                  <h1 className="profile-name">{userData.fullname}</h1>
                  <p className="profile-email">{userData.email}</p>
                  <span className="profile-badge">{userData.usertype}</span>
                </div>
              </div>

              <div className="profile-actions">
                {!isEditing ? (
                  <button className="btn-edit" onClick={handleEditToggle}>
                    <FaEdit />
                    Edit Profile
                  </button>
                ) : (
                  <div className="edit-actions">
                    <button className="btn-cancel" onClick={handleEditToggle}>
                      Cancel
                    </button>
                    <button className="btn-save" onClick={handleSave}>
                      <MdOutlineSave />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="profile-tabs">
            <div className="tabs-wrapper">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <span className="tab-label">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Section */}
          <div className="profile-content">
            <form onSubmit={handleSave}>
              {/* Personal Information Tab */}
              {activeTab === "personal" && (
                <div className="profile-section">
                  <h2 className="section-title">Personal Information</h2>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="fullname"
                          value={editData.fullname}
                          onChange={handleInputChange}
                          className="form-input"
                          required
                        />
                      ) : (
                        <p className="form-value">{userData.fullname}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={editData.email}
                          onChange={handleInputChange}
                          className="form-input"
                          required
                        />
                      ) : (
                        <p className="form-value">{userData.email}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={editData.phone}
                          onChange={handleInputChange}
                          className="form-input"
                          required
                        />
                      ) : (
                        <p className="form-value">{userData.phone}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">User Type</label>
                      {isEditing ? (
                        <select
                          name="usertype"
                          value={editData.usertype}
                          onChange={handleInputChange}
                          className="form-input"
                          required
                        >
                          <option value="Driver">Driver</option>
                          <option value="Passenger">Passenger</option>
                          <option value="Both">Both</option>
                        </select>
                      ) : (
                        <p className="form-value">{userData.usertype}</p>
                      )}
                    </div>

                    {isEditing && (
                      <>
                        <div className="form-group">
                          <label className="form-label">New Password</label>
                          <input
                            type="password"
                            name="password"
                            value={editData.password}
                            onChange={handleInputChange}
                            className="form-input"
                            placeholder="Leave blank to keep current"
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Confirm Password</label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={editData.confirmPassword}
                            onChange={handleInputChange}
                            className="form-input"
                            placeholder="Leave blank to keep current"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Address Tab */}
              {activeTab === "address" && (
                <div className="profile-section">
                  <h2 className="section-title">Address Information</h2>

                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label className="form-label">Street Address</label>
                      {isEditing ? (
                        <textarea
                          name="address"
                          value={editData.address}
                          onChange={handleInputChange}
                          className="form-input form-textarea"
                          rows="3"
                          required
                        />
                      ) : (
                        <p className="form-value">{userData.address}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">City</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="city"
                          value={editData.city}
                          onChange={handleInputChange}
                          className="form-input"
                          required
                        />
                      ) : (
                        <p className="form-value">{userData.city}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">State</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="state"
                          value={editData.state}
                          onChange={handleInputChange}
                          className="form-input"
                          required
                        />
                      ) : (
                        <p className="form-value">{userData.state}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Postal Code</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="postalCode"
                          value={editData.postalCode}
                          onChange={handleInputChange}
                          className="form-input"
                          required
                        />
                      ) : (
                        <p className="form-value">{userData.postalCode}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Country</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="country"
                          value={editData.country}
                          onChange={handleInputChange}
                          className="form-input"
                          required
                        />
                      ) : (
                        <p className="form-value">{userData.country}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Banking Tab */}
              {activeTab === "banking" && (
                <div className="profile-section">
                  <h2 className="section-title">Banking Information</h2>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Account Holder Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="bankAccountHolder"
                          value={editData.bankAccountHolder}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      ) : (
                        <p className="form-value">
                          {userData.bankAccountHolder || "Not provided"}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Account Number</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="bankAccountNumber"
                          value={editData.bankAccountNumber}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      ) : (
                        <p className="form-value">
                          {userData.bankAccountNumber || "Not provided"}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">IFSC Code</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="bankIFSC"
                          value={editData.bankIFSC}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      ) : (
                        <p className="form-value">
                          {userData.bankIFSC || "Not provided"}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Branch Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="bankBranchName"
                          value={editData.bankBranchName}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      ) : (
                        <p className="form-value">
                          {userData.bankBranchName || "Not provided"}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Branch Code</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="bankBranchCode"
                          value={editData.bankBranchCode}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      ) : (
                        <p className="form-value">
                          {userData.bankBranchCode || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Documents Tab */}
              {activeTab === "documents" && (
                <div className="profile-section">
                  <h2 className="section-title">Documents & Verification</h2>

                  <div className="documents-grid">
                    {/* Driver License */}
                    <div className="document-card">
                      <div className="document-icon">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                        >
                          <rect
                            x="4"
                            y="8"
                            width="24"
                            height="16"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <circle cx="12" cy="14" r="2" fill="currentColor" />
                          <path
                            d="M18 13H24M18 17H24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <h3 className="document-title">Driver License</h3>
                      {isEditing ? (
                        <div className="file-upload">
                          <label
                            htmlFor="driverLicense"
                            className="file-upload-label"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M10 4V12M6 8L10 4L14 8"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M4 16H16"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                            {filePreview.driverLicense || editData.driverLicense
                              ? "Change File"
                              : "Upload File"}
                          </label>
                          <input
                            type="file"
                            id="driverLicense"
                            accept="image/*,.pdf"
                            onChange={(e) =>
                              handleFileChange(e, "driverLicense")
                            }
                            style={{ display: "none" }}
                          />
                          {filePreview.driverLicense && (
                            <div className="file-preview">
                              {typeof filePreview.driverLicense === "string" &&
                                filePreview.driverLicense.startsWith(
                                  "data:image",
                                ) ? (
                                <img
                                  src={filePreview.driverLicense}
                                  alt="Preview"
                                  className="preview-image"
                                  loading="lazy"
                                />
                              ) : (
                                <p className="file-name">
                                  {filePreview.driverLicense}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="document-status">
                          {userData.driverLicense ? (
                            <span className="status-uploaded">✓ Uploaded</span>
                          ) : (
                            <span className="status-pending">Not uploaded</span>
                          )}
                        </p>
                      )}
                    </div>

                    {/* Aadhaar Card */}
                    <div className="document-card">
                      <div className="document-icon">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                        >
                          <rect
                            x="4"
                            y="8"
                            width="24"
                            height="16"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M10 14H22M10 18H18"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <h3 className="document-title">Aadhaar Card</h3>
                      {isEditing ? (
                        <div className="file-upload">
                          <label
                            htmlFor="aadhaarCard"
                            className="file-upload-label"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M10 4V12M6 8L10 4L14 8"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M4 16H16"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                            {filePreview.aadhaarCard || editData.aadhaarCard
                              ? "Change File"
                              : "Upload File"}
                          </label>
                          <input
                            type="file"
                            id="aadhaarCard"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileChange(e, "aadhaarCard")}
                            style={{ display: "none" }}
                          />
                          {filePreview.aadhaarCard && (
                            <div className="file-preview">
                              {typeof filePreview.aadhaarCard === "string" &&
                                filePreview.aadhaarCard.startsWith(
                                  "data:image",
                                ) ? (
                                <img
                                  src={filePreview.aadhaarCard}
                                  alt="Preview"
                                  className="preview-image"
                                  loading="lazy"
                                />
                              ) : (
                                <p className="file-name">
                                  {filePreview.aadhaarCard}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="document-status">
                          {userData.aadhaarCard ? (
                            <span className="status-uploaded">✓ Uploaded</span>
                          ) : (
                            <span className="status-pending">Not uploaded</span>
                          )}
                        </p>
                      )}
                    </div>

                    {/* PAN Card */}
                    <div className="document-card">
                      <div className="document-icon">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                        >
                          <rect
                            x="4"
                            y="8"
                            width="24"
                            height="16"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M8 12H12M8 16H16M8 20H14"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <h3 className="document-title">PAN Card</h3>
                      {isEditing ? (
                        <div className="file-upload">
                          <label
                            htmlFor="panCard"
                            className="file-upload-label"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M10 4V12M6 8L10 4L14 8"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M4 16H16"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                            {filePreview.panCard || editData.panCard
                              ? "Change File"
                              : "Upload File"}
                          </label>
                          <input
                            type="file"
                            id="panCard"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileChange(e, "panCard")}
                            style={{ display: "none" }}
                          />
                          {filePreview.panCard && (
                            <div className="file-preview">
                              {typeof filePreview.panCard === "string" &&
                                filePreview.panCard.startsWith("data:image") ? (
                                <img
                                  src={filePreview.panCard}
                                  alt="Preview"
                                  className="preview-image"
                                  loading="lazy"
                                />
                              ) : (
                                <p className="file-name">
                                  {filePreview.panCard}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="document-status">
                          {userData.panCard ? (
                            <span className="status-uploaded">✓ Uploaded</span>
                          ) : (
                            <span className="status-pending">Not uploaded</span>
                          )}
                        </p>
                      )}
                    </div>

                    {/* Passport Photo */}
                    <div className="document-card">
                      <div className="document-icon">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                        >
                          <circle
                            cx="16"
                            cy="12"
                            r="4"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M8 24C8 20 11 18 16 18C21 18 24 20 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <h3 className="document-title">Passport Photo</h3>
                      {isEditing ? (
                        <div className="file-upload">
                          <label
                            htmlFor="passportPhoto"
                            className="file-upload-label"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M10 4V12M6 8L10 4L14 8"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M4 16H16"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                            {filePreview.passportPhoto || editData.passportPhoto
                              ? "Change File"
                              : "Upload File"}
                          </label>
                          <input
                            type="file"
                            id="passportPhoto"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileChange(e, "passportPhoto")
                            }
                            style={{ display: "none" }}
                          />
                          {filePreview.passportPhoto && (
                            <div className="file-preview">
                              <img
                                src={filePreview.passportPhoto}
                                alt="Preview"
                                className="preview-image"
                                loading="lazy"
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="document-status">
                          {userData.passportPhoto ? (
                            <span className="status-uploaded">✓ Uploaded</span>
                          ) : (
                            <span className="status-pending">Not uploaded</span>
                          )}
                        </p>
                      )}
                    </div>

                    {/* Bank Account Details */}
                    <div className="document-card">
                      <div className="document-icon">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                        >
                          <path
                            d="M4 12L16 4L28 12V26C28 26.5304 27.7893 27.0391 27.4142 27.4142C27.0391 27.7893 26.5304 28 26 28H6C5.46957 28 4.96086 27.7893 4.58579 27.4142C4.21071 27.0391 4 26.5304 4 26V12Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 28V16H20V28"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <h3 className="document-title">Bank Details Document</h3>
                      {isEditing ? (
                        <div className="file-upload">
                          <label
                            htmlFor="bankAccountDetails"
                            className="file-upload-label"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M10 4V12M6 8L10 4L14 8"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M4 16H16"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                            {filePreview.bankAccountDetails ||
                              editData.bankAccountDetails
                              ? "Change File"
                              : "Upload File"}
                          </label>
                          <input
                            type="file"
                            id="bankAccountDetails"
                            accept="image/*,.pdf"
                            onChange={(e) =>
                              handleFileChange(e, "bankAccountDetails")
                            }
                            style={{ display: "none" }}
                          />
                          {filePreview.bankAccountDetails && (
                            <div className="file-preview">
                              {typeof filePreview.bankAccountDetails ===
                                "string" &&
                                filePreview.bankAccountDetails.startsWith(
                                  "data:image",
                                ) ? (
                                <img
                                  src={filePreview.bankAccountDetails}
                                  alt="Preview"
                                  className="preview-image"
                                  loading="lazy"
                                />
                              ) : (
                                <p className="file-name">
                                  {filePreview.bankAccountDetails}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="document-status">
                          {userData.bankAccountDetails ? (
                            <span className="status-uploaded">✓ Uploaded</span>
                          ) : (
                            <span className="status-pending">Not uploaded</span>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
