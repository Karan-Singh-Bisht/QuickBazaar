import { Button, Card, CardContent, styled, Typography } from "@mui/material";
import React from "react";

const triangleImage = styled("img")({
  right: 0,
  bottom: 0,
  height: 170,
  position: "absolute",
});

const TrophyImage = styled("img")({
  right: 36,
  bottom: 20,
  height: 98,
  position: "absolute",
});

const Achievements = () => {
  return (
    <Card sx={{ position: "relative", color: "white", bgcolor: "#242B2E" }}>
      <CardContent>
        <Typography variant="h6" sx={{ letterSpacing: ".25px" }}>
          QuickBazaar
        </Typography>
        <Typography variant="body2">Congratulations!!</Typography>
        <Typography variant="h5" sx={{ my: 3.1 }}>
          420.8k
        </Typography>
        <Button size="small" variant="contained">
          View Sales
        </Button>
        <TrophyImage src="../../assets/Trophy.webp" alt="triangle" />
      </CardContent>
    </Card>
  );
};

export default Achievements;
