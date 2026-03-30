import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../../State/Order/Action';
import { updatePayment } from '../../../State/Payment/Action'; // Zaroori Import
import OrderTraker from '../Order/OrderTraker';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Grid, Box, CircularProgress } from '@mui/material';
import { AddressCard } from '../AddressCard/AddressCard';

function PaymentSuccess() {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { order, loading } = useSelector((state) => state.order);

  const paymentId = searchParams.get('razorpay_payment_id');
  const paymentStatus = searchParams.get('razorpay_payment_link_status');

  // PaymentSuccess.jsx ke useEffect mein
useEffect(() => {
  if (orderId && paymentId) {
    // reqData object jo action accept karega
    const reqData = { 
        orderId: orderId, 
        paymentId: paymentId 
    };
    
    dispatch(getOrderById(orderId));
    dispatch(updatePayment(reqData)); 
  }
}, [orderId, paymentId]);

  // Loading State taaki page khali na dikhe
  if (loading || !order) {
    return (
      <Box className="h-screen flex justify-center items-center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="px-5 lg:px-36 py-10 bg-gray-50 min-h-screen">
      <div className="flex flex-col justify-center items-center mb-10">
        <Alert severity="success" variant="filled" sx={{ width: 'fit-content', borderRadius: "12px" }}>
          <AlertTitle>Payment Successful</AlertTitle>
          🎉 Aapka order successfully place ho gaya hai!
        </Alert>
      </div>

      <OrderTraker activeStep={3} />

      <div className="mt-10 space-y-6">
        <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Order Summary</h2>
        
        {order?.orderItems?.map((item) => (
          <Grid container key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 items-center justify-between mb-4">
            <Grid item xs={12} md={6}>
              <div className="flex items-center">
                <img
                  className="w-24 h-24 object-cover object-top rounded-lg shadow-sm"
                  src={item.product?.imageUrl}
                  alt={item.product?.title}
                />
                <div className="ml-6 space-y-1">
                  <p className="font-bold text-lg text-gray-900">{item.product?.title}</p>
                  <div className="text-sm text-gray-500 font-medium space-x-4">
                    <span>Color: {item.color}</span>
                    <span>Size: {item.size}</span>
                  </div>
                  <p className="text-gray-700 font-semibold">₹{item.price}</p>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} md={4} className="mt-5 md:mt-0 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
               <p className="font-bold text-indigo-900 mb-2 text-sm uppercase">Delivery Address</p>
               <AddressCard address={order?.shippingAddress} />
            </Grid>
          </Grid>
        ))}
      </div>
    </div>
  );
}

export default PaymentSuccess;