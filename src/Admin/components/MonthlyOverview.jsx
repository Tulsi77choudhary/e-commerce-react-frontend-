import React from "react";
import {
  Grid, Box, Avatar, Typography, Card, 
  CardHeader, CardContent, IconButton
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsCellIcon from "@mui/icons-material/SettingsCell";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const salesData = [
  {
    stats: "245k",
    title: "Sales",
    color: "#9155FD", // Theme consistent purple
    icon: <TrendingUpIcon sx={{ fontSize: "1.75rem" }} />
  },
  {
    stats: "12.5k",
    title: "Customers",
    color: "#22CB5C",
    icon: <AccountCircleIcon sx={{ fontSize: "1.75rem" }} />
  },
  {
    stats: "1.54k",
    title: "Products",
    color: "#DE4839",
    icon: <SettingsCellIcon sx={{ fontSize: "1.75rem" }} />
  },
  {
    stats: "₹88k",
    title: "Revenue",
    color: "#12B0E8",
    icon: <AttachMoneyIcon sx={{ fontSize: "1.75rem" }} />
  }
];

const renderStats = () => {
  return salesData.map((item, index) => (
    <Grid item xs={12} sm={6} md={3} key={index}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar 
          variant="rounded" 
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: '0px 3px 10px rgba(0,0,0,0.1)',
            color: "white",
            backgroundColor: item.color
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            {item.title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {item.stats}
          </Typography>
        </Box>
      </Box>
    </Grid>
  ));
};

const MonthlyOverview = () => {
  return (
    <Card sx={{ borderRadius: '15px', position: 'relative', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <CardHeader 
        title={<Typography variant="h5" sx={{ fontWeight: 800 }}>Monthly Overview</Typography>}
        action={
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            <Box component="span" sx={{ fontWeight: 600, color: 'success.main', mr: 0.5 }}>
              Total 48.5% growth
            </Box>
            😎 this month
          </Typography>
        }
      />
      <CardContent sx={{ pt: 4, pb: 4 }}>
        <Grid container spacing={3}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MonthlyOverview;