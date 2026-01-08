import { useState } from "react";
import {
  Box,
  ListItemText,
  ListItemButton,
  ListItem,
  List,
  ListItemIcon,
  Toolbar,
  CssBaseline,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/Inbox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";

import AdminDashboard from "./components/AdminDashboard";
import ProductTable from "./components/ProductTable";
import CustomersTable from "./components/CustomersTable";
import OrdersTable from "./components/OrdersTable";
import CreateProductForm from "./components/CreateProductForm";

const menu = [
  { name: "Dashboard", path: "/admin", Icon: <DashboardIcon /> },
  { name: "Products", path: "/admin/products", Icon: <InboxIcon /> },
  { name: "Customers", path: "/admin/customers", Icon: <MailIcon /> },
  { name: "Orders", path: "/admin/orders", Icon: <InboxIcon /> },
  { name: "AddProduct", path: "/admin/product/create", Icon: <InboxIcon /> },
];

function Admin() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();
  const location = useLocation();

  const drawer = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "space-between",
        
      }}
    >
      {isLargeScreen && <Toolbar />}
      <List>
        {menu.map((item,index) => (
          <ListItem key={item.name} disablePadding onClick={() => navigate(item.path)}>
            <ListItemButton selected={location.pathname === item.path}>
              <ListItemIcon>
                {item.Icon}
              </ListItemIcon>
              <ListItemText>
              {item.name}
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
    <div className="flex h-[100vh]">
      <CssBaseline />
      {/* <div className="flex-shrink-0 w-60 border-r border-gray-300">
        {drawer}
      </div> */}
      <div
      >
        {drawer}
      </div>
      <div className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<AdminDashboard />}></Route>
          <Route path="product/create" element={<CreateProductForm />}></Route>
          <Route path="products" element={<ProductTable />}></Route>
          <Route path="orders" element={<OrdersTable />}></Route>
          <Route path="customers" element={<CustomersTable />} ></Route>
        </Routes>
      </div>
    </div>
    </div>
  );
}

export default Admin;
