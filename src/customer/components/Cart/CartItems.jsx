import React from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { IconButton, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeItemToCart, updateItemToCart } from '../../../State/Cart/Action';

export const CartItems = ({ item }) => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  const handlUpdateCartItem = (newQuantity) => {
    dispatch(updateItemToCart({
      cartItemId: item?.id,
      userId: userId,
      quantity: newQuantity
    }));
  };

  const handleRemoveCartItem = () => {
    dispatch(removeItemToCart(item?.id, userId));
  }

  return (
    <div className='p-5 shadow-sm border border-gray-100 rounded-xl bg-white hover:shadow-md transition-shadow duration-300 mb-4'>
      <div className='flex items-start lg:items-center'>
        {/* Product Image Wrapper */}
        <div className='w-[6rem] h-[6rem] lg:w-[10rem] lg:h-[10rem] flex-shrink-0 overflow-hidden rounded-lg bg-gray-50'>
          <img 
            className='w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500'
            src={item?.product?.imageUrl}
            alt={item?.product?.title} 
          />
        </div>

        {/* Product Details Section */}
        <div className='ml-4 lg:ml-6 flex-1 space-y-1'>
          <p className='text-lg font-bold text-gray-800 truncate lg:max-w-md'>
            {item?.product?.brand}
          </p>
          <p className='text-gray-500 text-sm font-medium'>
            {item?.product?.title}
          </p>
          <p className='text-xs font-semibold text-gray-400 mt-2 flex items-center gap-2'>
            Size: <span className='text-gray-900'>{item?.size}</span> | Seller: <span className='text-gray-900'>{item?.product?.brand}</span>
          </p>

          <div className="pt-4 flex items-baseline space-x-3">
            <p className='text-xl font-black text-gray-900'>₹{item?.discountedPrice || item?.price}</p>
            {item?.price && (
               <p className='text-gray-400 line-through text-sm italic'>₹{item?.price}</p>
            )}
            <p className='text-green-600 text-sm font-bold tracking-tight'>
              {item?.product?.discountPersent || 0}% Off
            </p>
          </div>
        </div>
      </div>

      {/* Control Actions (Quantity & Remove) */}
      <div className='flex flex-wrap items-center justify-between pt-6 border-t border-gray-50 mt-4'>
        <div className='flex items-center gap-1'>
          <IconButton
            onClick={() => handlUpdateCartItem(item?.quantity - 1)}
            disabled={item?.quantity <= 1}
            sx={{ color: "#9155fd" }}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
          
          <span className='py-1 px-5 border-2 border-gray-100 rounded-lg font-bold text-gray-700 bg-gray-50/50 min-w-[50px] text-center'>
            {item?.quantity}
          </span>
          
          <IconButton
            sx={{ color: "#9155fd" }}
            onClick={() => handlUpdateCartItem(item?.quantity + 1)}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </div>

        <div className='mt-2 lg:mt-0'>
          <Button 
            onClick={handleRemoveCartItem} 
            variant="text"
            sx={{ 
              color: "#ef4444", 
              fontWeight: "bold", 
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              "&:hover": { bgcolor: "#fee2e2" }
            }} 
          >
            Remove Item
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartItems;