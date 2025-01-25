import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  submitRating,
  fetchRatings,
  resetSuccess,
  resetRatings,
} from "../../../state/rating/ratingSlice";
import { toast } from "sonner";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Rating,
} from "@mui/material";

const RatingComponent = ({ productId }) => {
  const dispatch = useDispatch();
  const { ratings, loading, error, success } = useSelector(
    (state) => state.rating
  );

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    if (success) {
      dispatch(resetSuccess());
    }
  }, [success, dispatch]);

  const handleSubmit = () => {
    if (rating === 0) return toast.error("Please provide a rating!");
    dispatch(submitRating({ productId, rating, review }));
    toast.success("Rating submitted successfully!");
    setRating(0);
    setReview("");
  };

  return (
    <Card sx={{ maxWidth: 1500, mt: 4, p: 2, boxShadow: 3 }}>
      <CardContent>
        {loading && (
          <Box display="flex" justifyContent="center" mb={2}>
            <CircularProgress />
          </Box>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        <Typography
          variant="h6"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          Leave a Rating
        </Typography>

        <Box display="flex" flexDirection="column" alignItems="center">
          <Rating
            name="controlled-rating"
            value={rating || 0}
            size="large"
            onChange={(event, newValue) => setRating(newValue)}
          />
        </Box>

        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          placeholder="Write a review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          sx={{ mt: 2 }}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </CardContent>
    </Card>
  );
};

export default RatingComponent;
