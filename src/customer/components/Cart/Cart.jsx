import React, { useEffect } from 'react'
import CartItems from './CartItems'
import { Button, Divider } from '@mui/material' // Divider add kiya clean look ke liye
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../../../State/Cart/Action'

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const handleCheckout = () => {
    navigate("/checkout?step=2")
  }

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <div className='bg-gray-50/30 min-h-screen pb-20'> {/* Background color change */}
      <div className='lg:grid grid-cols-3 lg:px-16 px-4 relative pt-10 gap-8'>
        
        {/* Left Section: Items List */}
        <div className="col-span-2 space-y-4">
          {cart?.cartItems?.length > 0 ? (
            cart?.cartItems?.map((item) => (
              <CartItems key={item.id} item={item} />
            ))
          ) : (
            <div className="bg-white p-10 text-center rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-500 italic">Your cart is empty!</h2>
              <Button onClick={() => navigate("/")} sx={{ mt: 2, color: "#9155fd" }}>Shop Now</Button>
            </div>
          )}
        </div>

        {/* Right Section: Price Details */}
        <div className='px-5 sticky top-24 h-fit mt-10 lg:mt-0'>
          <div className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm'>
            <p className='uppercase font-black text-gray-800 opacity-60 pb-4 tracking-widest text-xs'>
              Price Details
            </p>
            <Divider />
            
            <div className='space-y-4 font-medium mt-5'>
              <div className='flex justify-between text-gray-700'>
                <span>Price ({cart?.totalItem} items)</span>
                <span>₹{cart?.totalPrice}</span>
              </div>
              <div className='flex justify-between'>
                <span>Discount</span>
                <span className='text-green-600 font-bold'>- ₹{cart?.discount}</span>
              </div>
              <div className='flex justify-between'>
                <span>Delivery Charges</span>
                <span className='text-green-600 font-bold'>Free</span>
              </div>
              
              <Divider sx={{ borderStyle: 'dashed', my: 2 }} />
              
              <div className='flex justify-between text-lg font-black text-gray-900'>
                <span>Total Amount</span>
                <span className='text-green-700'>₹{cart?.totalDiscountedPrice}</span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              variant="contained"
              fullWidth
              sx={{ 
                px: "2.5rem", 
                py: '0.8rem', 
                bgcolor: '#9155fd', 
                mt: '2rem',
                borderRadius: '12px',
                fontWeight: 'bold',
                boxShadow: '0 10px 15px -3px rgba(145, 85, 253, 0.3)',
                '&:hover': { bgcolor: '#7a45d4' }
              }}
            >
              Checkout
            </Button>
            
            <p className='text-green-600 font-bold text-xs text-center mt-4 tracking-tight italic'>
              You will save ₹{cart?.discount} on this order
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}