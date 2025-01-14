import { Grid, styled } from "@mui/material";
import React from "react";
import Achievements from "./Achievements";
import MonthlyOverview from "./MonthlyOverview";

const Dashboard = () => {
  return (
    <div className="p-10">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Achievements />
        </Grid>
        <Grid item xs={12} md={8}>
          <MonthlyOverview />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
