import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  Button,
  TextField,
  Avatar,
  Rating,
  Divider,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxWidth: "90%",
  bgcolor: "#fff",
  borderRadius: "16px",
  boxShadow: 24,
  p: 4,
};

export default function RatingModal() {
  const [open, setOpen] = useState(true);
  const [rating, setRating] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    const payload = {
      rating,
      feedback,
    };

    console.log("Rating Submitted:", payload);

    // API Call Here

    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="rating-modal-title"
    >
      <Box sx={style}>
        {/* Header */}
        <Typography id="rating-modal-title" variant="h5" fontWeight={700}>
          Rate Your Driver
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, mb: 3 }}
        >
          Your ride has been completed successfully. Please rate your experience
          with the driver.
        </Typography>

        {/* Driver Info */}

        {/* Rating */}
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
          How was your ride experience?
        </Typography>
        <Rating
          name="ride-rating"
          size="large"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          sx={{ mb: 3 }}
        />
        {/* Feedback */}
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Share your feedback (optional)"
          placeholder="Tell us about your trip experience, driver behavior, punctuality, vehicle cleanliness, etc."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mt: 3,
          }}
        >
          <Button variant="outlined" onClick={handleClose}>
            Skip
          </Button>

          <Button variant="contained" onClick={handleSubmit}>
            Submit Rating
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
