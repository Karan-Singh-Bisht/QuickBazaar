import React from "react";

const ProductCard = ({ product, index }) => {
  return (
    <div
      key={index}
      className="cursor-pointer flex flex-col bg-white rounded-lg shadow-lg overflow-hidden w-[14rem] mx-3 my-3"
    >
      <div className="h-[16rem] w-full p-2">
        <img
          className="transform transition-transform duration-300 ease-in-out hover:scale-110 object-cover object-top rounded-sm w-full h-full"
          src={product.imageUrl}
          alt="t-shirt"
        />
      </div>
      <div className="p-2 bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900">{product.brand}</h3>
        <p className="mt-2 text-sm text-gray-500">{product.title}</p>
      </div>
    </div>
  );
};

export default ProductCard;
