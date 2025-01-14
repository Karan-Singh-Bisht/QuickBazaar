import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Dashboard from "./components/Dashboard";
import ProductForm from "./components/ProductForm";
import CustomerTable from "./components/CustomerTable";
import OrderTable from "./components/OrderTable";
import ProductTable from "./components/ProductTable";

const menu = [
  { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
  {
    name: "Products",
    path: "/admin/products",
    icon: <InventoryIcon />,
  },
  { name: "Customers", path: "/admin/customers", icon: <SupportAgentIcon /> },
  { name: "Orders", path: "/admin/orders", icon: <ShoppingCartIcon /> },
  {
    name: "AddProduct",
    path: "/admin/product/create",
    icon: <AddShoppingCartIcon />,
  },
];

const Admin = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const navigate = useNavigate();

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      {/* {isLargeScreen && <Toolbar />} */}
      <List>
        {menu.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => navigate(item.path)}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText>Account</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {/* <Box sx={{ display: `${isLargeScreen}?"flex":"block"` }}> */}
      <div className="flex ">
        <CssBaseline />
        <div className="border border-r-gray-300 w-[13%] mr-5">{drawer}</div>
        <div className="w-[87%]">
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/product/create" element={<ProductForm />} />
            <Route exact path="/customers" element={<CustomerTable />} />
            <Route exact path="/orders" element={<OrderTable />} />
            <Route exact path="/products" element={<ProductTable />} />
          </Routes>
        </div>
      </div>
      {/* </Box> */}
    </div>
  );
};

export default Admin;
