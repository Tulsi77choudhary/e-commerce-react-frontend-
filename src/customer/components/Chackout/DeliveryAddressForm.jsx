import React from 'react';
import { Grid, Button, Box, TextField, Typography } from "@mui/material";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../../State/Order/Action';
import { AddressCard } from '../AddressCard/AddressCard';

export const DeliveryAddressForm = ({ onNext }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zip"),
      mobile: data.get("phoneNumber"),
    };

    dispatch(createOrder({ address, navigate }))
      .then(() => onNext())
      .catch((error) => console.error("Order creation failed:", error));
  };

  return (
    <div className="max-w-7xl mx-auto py-10">
      <Grid container spacing={4}>
        
        {/* Left Side: Saved Addresses */}
        <Grid item xs={12} lg={5}>
          <Box className="border border-gray-100 rounded-2xl shadow-sm bg-white overflow-y-auto h-[32rem] custom-scrollbar">
            <div className="p-6 border-b border-gray-50 bg-gray-50/50 sticky top-0 z-10">
              <Typography variant="h6" sx={{ fontWeight: "800", color: "#1a1a1a" }}>
                Saved Addresses
              </Typography>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Aap yahan map function laga sakte hain agar multiple saved addresses hon */}
              <div className="p-5 border border-gray-100 rounded-xl hover:border-[#9155FD] transition-all bg-white shadow-sm">
                <AddressCard />
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ 
                    mt: 3, 
                    bgcolor: "#9155FD", 
                    borderRadius: "10px",
                    fontWeight: "bold",
                    "&:hover": { bgcolor: "#7a45d4" }
                  }}
                >
                  Deliver Here
                </Button>
              </div>
            </div>
          </Box>
        </Grid>

        {/* Right Side: New Address Form */}
        <Grid item xs={12} lg={7}>
          <Box className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
            <Typography variant="h6" sx={{ fontWeight: "800", mb: 4, color: "#1a1a1a" }}>
              Add New Address
            </Typography>
            
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField required id="firstName" name="firstName" label="First Name" fullWidth variant="standard" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required id="lastName" name="lastName" label="Last Name" fullWidth variant="standard" />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Street Address"
                    fullWidth
                    multiline
                    rows={3}
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField required id="city" name="city" label="City" fullWidth variant="standard" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required id="state" name="state" label="State" fullWidth variant="standard" />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField required id="zip" name="zip" label="Zip Code" fullWidth variant="standard" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required id="phoneNumber" name="phoneNumber" label="Phone Number" fullWidth variant="standard" />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disableElevation
                    sx={{ 
                      mt: 4, 
                      py: 1.8, 
                      bgcolor: "#9155FD", 
                      borderRadius: "12px",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      "&:hover": { bgcolor: "#7a45d4" }
                    }}
                  >
                    SAVE AND DELIVER HERE
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddressForm;