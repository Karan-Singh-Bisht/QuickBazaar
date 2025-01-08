import React from "react";
import "../product/ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/product/${data._id}`)}
      className="productCard w-[15rem] m-3 rounded-md transition-all cursor-pointer"
    >
      <div className="h-[20rem]">
        <img
          className="w-full h-full object-cover rounded-md object-left-top"
          src={data.imageUrl}
          alt="Women dress"
        />
      </div>
      <div className="textPart bg-white p-3">
        <div>
          <h3 className="text-xl font-bold opacity-60">{data.brand}</h3>
          <p>{data.title}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-semibold">&#8377;{data.discountedPrice}</p>
          <p className="line-through opacity-60">&#8377;{data.price}</p>
          <p className="text-green-600 font-semibold">
            {data.discountPersent}% off
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
