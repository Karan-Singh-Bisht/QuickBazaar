import { Avatar, Box, Grid, Rating } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteRating, fetchRatings } from "../../../state/rating/ratingSlice";
import { useEffect } from "react";
import { toast } from "sonner";

const ProductReviewCard = ({ item }) => {
  const dispatch = useDispatch();
  const { ratings, error, loading, success } = useSelector(
    (state) => state.rating
  );

  const auth = useSelector((state) => state.auth);

  const handleDeleteRating = (ratingId) => {
    dispatch(deleteRating(ratingId));
    window.location.reload();
    toast.success("Rating deleted successfully!");
  };

  return (
    <div>
      <Grid container spacing={2} gap={3}>
        <Grid item xs={1}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#9155fd" }}
            ></Avatar>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <div className="space-y-2 flex justify-between">
            <div>
              <p className="font-semibold text-lg">{item.user.firstName}</p>
              <p className="opacity-50">{item.createdAt.slice(0, 10)}</p>
            </div>
            {auth?.user?.user?._id == item?.user._id ? (
              <DeleteIcon
                className="hover:cursor-pointer"
                onClick={() => handleDeleteRating(item._id)}
              />
            ) : (
              ""
            )}
          </div>
          <Rating
            name="half-rating-read"
            defaultValue={item.rating || 0}
            precision={0.5}
            readOnly
          />
          <Grid item xs={2}></Grid>
          <p>{item.review}</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReviewCard;
