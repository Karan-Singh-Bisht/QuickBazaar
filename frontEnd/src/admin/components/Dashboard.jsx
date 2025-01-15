import { Grid, styled } from "@mui/material";
import React from "react";
import Achievements from "./Achievements";
import MonthlyOverview from "./MonthlyOverview";
import OrderTable from "../view/OrderTableView";
import ProductTable from "../view/ProductTableView";

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
        <Grid
          sx={{ boxShadow: "10", marginTop: "2rem", marginLeft: "1rem" }}
          item
          xs={12}
          md={12}
        >
          <OrderTable />
        </Grid>
        <Grid
          sx={{ boxShadow: "10", marginTop: "2rem", marginLeft: "1rem" }}
          item
          xs={12}
          md={12}
        >
          <ProductTable />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
