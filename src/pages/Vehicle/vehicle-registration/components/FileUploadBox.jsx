// src/pages/Vehicle/vehicle-registration/components/FileUploadBox.jsx

import { FaFileUpload, FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete }                        from "react-icons/md";
import { Button }                          from "@mui/material";

export default function FileUploadBox({
  fieldName, file, preview, error, accept, onChange, onRemove,
}) {
  if (file) {
    return (
      <div className="vehicledetails-file-preview">
        {preview?.startsWith("data:image") ? (
          <img src={preview} alt={fieldName} className="vehicledetails-preview-image" loading="lazy" />
        ) : (
          <div className="vehicledetails-file-info">
            <FaFileUpload className="vehicledetails-file-icon" />
            <span>{file.name}</span>
          </div>
        )}
        <Button
          variant="outlined" color="error" size="small"
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
        type="file" accept={accept}
        onChange={(e) => onChange(e, fieldName)}
        className="vehicledetails-file-input"
        id={fieldName}
      />
      <label htmlFor={fieldName} className="vehicledetails-upload-label">
        <FaCloudUploadAlt className="vehicledetails-upload-icon" />
        <span className="vehicledetails-upload-text">Click to upload or drag and drop</span>
        <span className="vehicledetails-upload-hint">PNG, JPG, PDF (max. 5MB)</span>
      </label>
    </div>
  );
}