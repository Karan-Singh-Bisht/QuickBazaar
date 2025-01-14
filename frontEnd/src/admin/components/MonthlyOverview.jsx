import React from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PhonelinkIcon from "@mui/icons-material/Phonelink";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

const salesData = [
  {
    stats: "245K",
    title: "Sales",
    color: "violet",
    icon: <TrendingUpIcon sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "12.5K",
    title: "Customers",
    color: "green",
    icon: <AccountBoxIcon sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "1.54K",
    title: "Products",
    color: "red",
    icon: <PhonelinkIcon sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "88K",
    title: "Revenue",
    color: "blue",
    icon: <CurrencyRupeeIcon sx={{ fontSize: "1.75rem" }} />,
  },
];

const renderStats = () => {
  return salesData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          variant="rounded"
          sx={{
            mr: 3,
            width: 44,
            height: 52,
            boxShadow: 3,
            color: "white",
            backgroundColor: `${item.color}`,
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption">{item.title}</Typography>
          <Typography variant="caption">{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ));
};

const MonthlyOverview = () => {
  return (
    <Card sx={{ bgcolor: "#242B2E", color: "white" }}>
      <CardHeader
        title="Monthly Overview"
        action={
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        }
        subheader={
          <Typography variant="body2">
            <Box component="span" sx={{ fontWeight: 600, color: "white" }}>
              Total 48.5% growth
            </Box>{" "}
            this month
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: "2rem !important",
            letterSpacing: ".15px !important",
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)}!important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MonthlyOverview;
