import React from "react";
import {
  Grid,
  Box,
  Avatar,
  Typography,
  Card,
  CardHeader,
  CardContent,
  IconButton,

} from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsCellIcon from "@mui/icons-material/SettingsCell";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const salesData = [
  {
    state: "245k",
    title: "Sales",
    colors: "#ffd600",
    icon: <TrendingUpIcon sx={{ fontSize: "1.75rem" }} />
  },
  {
    state: "12.5k",
    title: "Customers",
    colors: "#22CB5C",
    icon: <AccountCircleIcon sx={{ fontSize: "1.75rem" }} />
  },
  {
    state: "1.54k",
    title: "Products",
    colors: "#DE4839",
    icon: <SettingsCellIcon sx={{ fontSize: "1.75rem" }} />
  },
  {
    state: "2.5k",
    title: "Sales",
    colors: "#12B0E8",
    icon: <AttachMoneyIcon sx={{ fontSize: "1.75rem" }} />
  }

]

const renderState = () => {
  return salesData.map((item, index) => (
    <Grid item xs={12} sm={6} md={3} key={index}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>

        <Avatar variant="rounded" sx={{
          mr: 3,
          width: 44,
          height: 44,
          boxShadow: 3,
          color: "white",
          backgroundColor: `${item.colors}`
        }}>
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="caption">{item.title}</Typography>
          <Typography variant="h6">{item.state}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}
const MonthlyOverview = () => {
  return (
    <Card className sx={{ position: 'relative' }}>
      <CardHeader title="Monthly Overview" sx={{ fontWeight: 800 }}
        action={
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        }
        subheader={
          <Typography variant="body2">
            <Box component="span" sx={{ fontWeight: 600 }}>
              Total 48.5k groth
            </Box>
            this month
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            nb: 2.5,
            lineHeight: "2rem !important",
            letterSpacing: "0.15px, ! important"
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={5.0}>
          {renderState()}

        </Grid>
      </CardContent>
    </Card>
  )
}

export default MonthlyOverview