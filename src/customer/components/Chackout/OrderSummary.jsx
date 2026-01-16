import React, { useEffect } from 'react';
import { AddressCard } from '../AddressCard/AddressCard';
import { Button } from '@mui/material'
import CartItems from '../Cart/CartItems';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../../State/Order/Action';
import { createPayment } from '../../../State/Payment/Action';

const OrderSummary = () => {

  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { order } = useSelector((state) => state.order);

  const handleChackOut = () => {
    dispatch(createPayment(orderId));
  };

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [dispatch, orderId]);

  const totalPrice = order?.orderItems?.reduce((sum, item) => sum + item.price, 0) || 0;
  const totalDiscount = order?.orderItems?.reduce((sum, item) => sum + (item.price - item.discountedPrice), 0) || 0;
  const totalDiscountedPrice = totalPrice - totalDiscount;

  const handleRemoveCartItem = () => {
    dispatch(removeItemToCart(item?.id, userId));
  }

  return (

    <div>
      <div className='p-4 shadow-lg rounded-s-md'>
        {order?.shippingAddress && <AddressCard address={order.shippingAddress} />}

      </div>
      <div>
        <div className='lg:grid grid-cols-3 relative mt-2'>
          <div className="col-span-2">
            {order?.orderItems?.map((item) => (
              <CartItems key={item.id} item={item} />
            ))}

          </div>

          <div className='px-4 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
            <div className='p-5 shadow-lg  rounded-md'>
              <p className='uppercase font-bold opacity-60 pb-4'>Price Details</p>
              <hr />
              <div className='space-y-3 font-semibold'  >
                <div className='flex justify-between pt-3 text-black'>
                  <span>Price</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className='flex justify-between pt-3'>
                  <span>Disccount</span>
                  <span className=' text-green-600'>{totalDiscount}</span>
                </div>
                <div className='flex justify-between pt-3 '>
                  <span>Delivery Charges</span>
                  <span className=' text-green-600'>Free</span>
                </div>
                <div className='flex justify-between pt-3 '>
                  <span>Total Amount</span>
                  <span className=' text-green-600'>{totalDiscountedPrice}</span>
                </div>
              </div>
              <Button
                variant="contained" className='w-full mt-5'
                sx={{ px: "2.5rem", py: '0.7rem', bgcolor: '#9155fd', mt: '1rem' }}
                onClick={handleChackOut}
              >
                Payment 
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

