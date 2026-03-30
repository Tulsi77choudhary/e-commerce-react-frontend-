import { useState } from "react";
import {
  Box, ListItemText, ListItemButton, ListItem, List, ListItemIcon,
  Toolbar, CssBaseline, Drawer, AppBar, IconButton, Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Import Hamburger Icon
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

const drawerWidth = 240; // Standard drawer width

function Admin() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [mobileOpen, setMobileOpen] = useState(false); // Mobile toggle state
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    if (!isLargeScreen) setMobileOpen(false); // Close drawer on mobile after click
  };

  const drawerContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        bgcolor: "background.paper",
      }}
    >
      <Box>
        <div className="p-5 flex justify-center border-b border-gray-100">
          <h1 className="text-xl font-bold text-[#9155FD]">ADMIN</h1>
        </div>
        <List sx={{ pt: 2 }}>
          {menu.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                onClick={() => handleMenuClick(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  mx: 1,
                  borderRadius: "8px",
                  mb: 0.5,
                  "&.Mui-selected": {
                    bgcolor: "#9155FD15",
                    color: "#9155FD",
                    "&:hover": { bgcolor: "#9155FD25" },
                    "& .MuiListItemIcon-root": { color: "#9155FD" }
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 45 }}>{item.Icon}</ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <List sx={{ borderTop: "1px solid #f3f4f6", mb: 2 }}>
        <ListItem disablePadding>
          <ListItemButton sx={{ mx: 1, borderRadius: "8px" }}>
            <ListItemIcon sx={{ minWidth: 45 }}><AccountCircleIcon /></ListItemIcon>
            <ListItemText primary="Admin Profile" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      
      {/* 1. AppBar for Mobile only */}
      {!isLargeScreen && (
        <AppBar position="fixed" sx={{ bgcolor: "white", color: "black", boxShadow: 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 800, color: "#9155FD" }}>
              ADMIN PANEL
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* 2. Responsive Drawer */}
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
      >
        {/* Mobile Drawer (Temporary) */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} // Better open performance on mobile
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop Drawer (Permanent) */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, borderRight: "1px solid #e5e7eb" },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* 3. Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 5 },
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 8, lg: 0 }, // Add margin top on mobile to avoid AppBar overlap
          bgcolor: "gray.50"
        }}
      >
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="products" element={<ProductTable />} />
          <Route path="product/create" element={<CreateProductForm />} />
          <Route path="orders" element={<OrdersTable />} />
          <Route path="customers" element={<CustomersTable />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Admin;