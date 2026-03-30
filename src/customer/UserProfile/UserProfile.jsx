import React, { useState, useEffect } from 'react'; // Added useEffect
import { 
  Box, Container, Grid, Typography, Avatar, 
  List, ListItem, ListItemIcon, ListItemText, 
  Divider, Button, Paper, useTheme 
} from '@mui/material';
import {
  ShoppingBag, Favorite, LocationOn, 
  Person, ExitToApp, Security
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Added for navigation

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  // 1. Fetch user data if not present but JWT exists
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt && !auth.user) {
      dispatch(getUser(jwt));
    }
  }, [auth.user, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Redirect to home/login after logout
  };

  const menuItems = [
    { text: "Profile", icon: <Person />, color: "#9155FD" },
    { text: "My Orders", icon: <ShoppingBag />, color: "#22c55e" },
    { text: "Wishlist", icon: <Favorite />, color: "#ef4444" },
    { text: "Saved Addresses", icon: <LocationOn />, color: "#3b82f6" },
    { text: "Account Security", icon: <Security />, color: "#6b7280" },
  ];

  // Safety check to handle initials
  const userInitial = auth.user?.firstName?.[0]?.toUpperCase() || "U";

  return (
    <Container maxWidth="xl" sx={{ py: 10 }}>
      <Grid container spacing={4}>
        
        {/* Left Sidebar - Menu */}
        <Grid item xs={12} md={3}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #f3f4f6' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 6 }}>
              <Avatar 
                sx={{ 
                  width: 100, height: 100, mb: 2, // Fixed height prop
                  bgcolor: theme.palette.primary.main,
                  fontSize: '2rem', fontWeight: 'bold'
                }}
              >
                {userInitial}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                {auth.user?.firstName} {auth.user?.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {auth.user?.email}
              </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <List disablePadding>
              {menuItems.map((item) => (
                <ListItem 
                  button 
                  key={item.text}
                  onClick={() => setActiveTab(item.text)}
                  sx={{
                    borderRadius: '12px',
                    mb: 1,
                    bgcolor: activeTab === item.text ? `${item.color}10` : 'transparent',
                    color: activeTab === item.text ? item.color : 'inherit',
                    '&:hover': { bgcolor: `${item.color}05` }
                  }}
                >
                  <ListItemIcon sx={{ color: activeTab === item.text ? item.color : '#9ca3af', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 600 }} />
                </ListItem>
              ))}
              
              <ListItem 
                button 
                onClick={handleLogout}
                sx={{ borderRadius: '12px', mt: 2, color: '#ef4444', '&:hover': { bgcolor: '#fee2e2' } }}
              >
                <ListItemIcon sx={{ color: '#ef4444', minWidth: 40 }}>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 600 }} />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Right Side - Content Area */}
        <Grid item xs={12} md={9}>
          <Paper elevation={0} sx={{ p: 4, minHeight: '60vh', borderRadius: '16px', border: '1px solid #f3f4f6' }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>
              {activeTab}
            </Typography>

            {activeTab === "Profile" && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>First Name</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>{auth.user?.firstName || "N/A"}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Last Name</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>{auth.user?.lastName || "N/A"}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Email Address</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>{auth.user?.email}</Typography>
                  </Grid>
                </Grid>
                <Box sx={{ pt: 4 }}>
                  <Button variant="contained" sx={{ bgcolor: '#9155FD', borderRadius: '10px', px: 4, py: 1.5, '&:hover': {bgcolor: '#7a45d1'} }}>
                    Edit Profile
                  </Button>
                </Box>
              </Box>
            )}

            {activeTab === "My Orders" && (
               <Box sx={{ textAlign: 'center', py: 10 }}>
                  <ShoppingBag sx={{ fontSize: 60, color: '#e5e7eb', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">No orders found.</Typography>
                  <Button onClick={() => navigate("/products")} variant="text" sx={{ mt: 2, color: '#9155FD' }}>Start Shopping</Button>
               </Box>
            )}
            
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;