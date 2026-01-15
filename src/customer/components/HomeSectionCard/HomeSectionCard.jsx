import React from "react";

const HomeSectionCard = ({ product }) => {
  const fallbackImage = "https://via.placeholder.com/150";
  //const navigate = useNavigate()
  // const handleClick = () => {
  //   navigate(`/product/${product.id}`);
  // };

  return (
    <div
      // onClick={handleClick}
      className="cursor-pointer flex flex-col items-center justify-center p-3 bg-white shadow-md rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
      {/* Image Section */}
      <div className="h-[15rem] w-[10rem] flex items-center justify-center">
        <img
          className="object-cover object-top w-full h-full rounded-md"
          src={product?.imageUrl ||
            product?.image ||
            product?.imageSrc ||
            product?.img ||
            product?.images?.[0] || fallbackImage}
          alt={product?.title || product?.brand || "Product image"}
        />
      </div>

      {/* Content Section */}
      <div className="p-3 text-center">
        <h3 className="text-lg font-medium text-gray-900">
          {product?.brand || "Unknown Brand"}
        </h3>
        <p className="mt-1 text-sm text-gray-500 truncate max-w-[10rem]">
          {product?.title || "No title available"}
        </p>
        <p className="mt-1 text-gray-500 text-bold">
          ₹{product?.price || "Uncategorized"}
        </p>


      </div>
    </div>
  );
};

export default HomeSectionCard;
