import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../../State/Order/Action';
import { CartItems } from '../Cart/CartItems';
import { AddressCard } from '../AddressCard/AddressCard';
import { Divider, Button } from '@mui/material';
const OrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  const { order, loading } = useSelector(state => state.order); // loading state add karein

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [orderId, dispatch]);

  // Agar order loading mein hai ya null hai
  if (!order && loading) return <div className="p-20 text-center">Loading Summary...</div>;

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="p-5 shadow-sm border border-gray-100 rounded-2xl bg-white">
        <h3 className="text-sm font-black uppercase text-gray-400 mb-4 tracking-widest">Delivery Address</h3>
        {/* Check if address exists */}
        <AddressCard address={order?.shippingAddress || order?.address} />
      </div>

      <div className="lg:grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-3">
          {/* orderItems exists check */}
          {order?.orderItems?.length > 0 ? (
            order.orderItems.map((item) => (
              <CartItems key={item.id} item={item} />
            ))
          ) : (
             <div className="p-10 text-center bg-white rounded-xl">No items found</div>
          )}
        </div>

        <div className="sticky top-24 h-fit">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="font-black text-gray-800 opacity-60 pb-4 uppercase text-xs tracking-widest">Order Summary</p>
            <Divider />
            <div className="space-y-4 mt-5 font-medium">
              <div className="flex justify-between text-gray-600">
                <span>Total Price</span>
                <span>₹{order?.totalPrice}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{order?.discount}</span>
              </div>
              <Divider sx={{ borderStyle: 'dashed' }} />
              <div className="flex justify-between text-lg font-black text-gray-900">
                <span>Total Amount</span>
                <span className="text-indigo-600">₹{order?.totalDiscountedPrice}</span>
              </div>
            </div>

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 4, py: 1.5, bgcolor: '#9155fd', borderRadius: '12px', fontWeight: 'bold' }}
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;