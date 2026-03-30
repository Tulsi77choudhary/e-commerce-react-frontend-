import React, { useEffect, useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import { useLocation } from "react-router-dom";
import DeliveryAddressForm from './DeliveryAddressForm';
import OrderSummary from './OrderSummary';

const steps = ['Login', 'Delivery Address', 'Order Summary', 'Payment'];

export default function CheckOut() {
    const location = useLocation();
    const querySearch = new URLSearchParams(location.search);
    
    // Step logic mapping
    const stepFromQuery = (parseInt(querySearch.get("step")) || 1) - 1;
    const [activeStep, setActiveStep] = useState(stepFromQuery);

    useEffect(() => {
        setActiveStep(stepFromQuery);
    }, [stepFromQuery]);

    const handleBack = () => setActiveStep(prev => prev - 1);

    return (
        <div className='max-w-7xl mx-auto px-4 lg:px-20 py-10'>
            {/* Stepper Container */}
            <Box sx={{ width: '100%', mb: 8 }}>
                <Stepper 
                    activeStep={activeStep} 
                    alternativeLabel // Minimal design ke liye icons ke niche text behtar lagta hai
                    sx={{
                        "& .MuiStepIcon-root.Mui-active": { color: "#9155FD" },
                        "& .MuiStepIcon-root.Mui-completed": { color: "#22c55e" }, // Green for success
                        "& .MuiStepLabel-label": { fontSize: '0.8rem', fontWeight: '600', mt: 1 }
                    }}
                >
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>

            {/* Back Button - Ab form ke upar minimalist icon/text form mein */}
            <div className="mb-6">
                {activeStep > 0 && (
                    <Button
                        onClick={handleBack}
                        startIcon={<span>←</span>}
                        sx={{ 
                            color: "#6b7280", 
                            textTransform: "none", 
                            fontWeight: "bold",
                            "&:hover": { color: "#1a1a1a", bgcolor: "transparent" } 
                        }}
                    >
                        Go Back
                    </Button>
                )}
            </div>

            {/* Content Area */}
            <Box className="mt-5 min-h-[50vh]">
                {activeStep >= steps.length ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-50">
                        <Typography variant="h5" sx={{ fontWeight: '800', mb: 2 }}>
                            Thank You! 🎉
                        </Typography>
                        <Typography color="text.secondary">
                            Your order has been placed successfully.
                        </Typography>
                        <Button variant="contained" sx={{ mt: 4, bgcolor: '#9155fd' }}>Track Order</Button>
                    </div>
                ) : (
                    <div className="animate-fade-in transition-all">
                        {activeStep === 1 && <DeliveryAddressForm />}
                        {activeStep === 2 && <OrderSummary />}
                        {/* Payment Step component can be added here */}
                    </div>
                )}
            </Box>
        </div>
    );
}