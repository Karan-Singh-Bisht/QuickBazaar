import { Grid, styled } from "@mui/material";
import React from "react";
import Achievements from "./Achievements";

const Dashboard = () => {
  return (
    <div className="px-10">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Achievements />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
