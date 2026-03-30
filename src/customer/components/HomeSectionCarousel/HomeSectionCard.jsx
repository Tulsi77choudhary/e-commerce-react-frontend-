import React from "react";

const HomeSectionCard = ({ product }) => {
  const fallbackImage = "https://via.placeholder.com/150";

  return (
    <div
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 border border-gray-100 hover:shadow-2xl transition-all duration-300"
    >
      {/* Image Section */}
      <div className="h-[13rem] w-full">
        <img
          className="object-cover object-top w-full h-full"
          src={
            product?.imageUrl ||
            product?.image ||
            product?.imageSrc ||
            product?.img ||
            product?.images?.[0] ||
            fallbackImage
          }
          alt={product?.title || product?.brand || "Product image"}
        />
      </div>

      {/* Content Section */}
      <div className="p-4 w-full">
        <h3 className="text-lg font-bold text-gray-900 truncate">
          {product?.brand || "Unknown Brand"}
        </h3>
        <p className="mt-1 text-sm text-gray-500 truncate">
          {product?.title || "No title available"}
        </p>
        <div className="flex items-center space-x-2 mt-2">
           <p className="font-semibold text-gray-900">
             ₹{product?.discountedPrice || product?.price}
           </p>
           {product?.discountedPrice && (
             <p className="line-through opacity-50 text-sm">₹{product?.price}</p>
           )}
           {product?.discountPersent && (
             <p className="text-green-600 font-semibold text-sm">{product?.discountPersent}% off</p>
           )}
        </div>
      </div>
    </div>
  );
};

export default HomeSectionCard;