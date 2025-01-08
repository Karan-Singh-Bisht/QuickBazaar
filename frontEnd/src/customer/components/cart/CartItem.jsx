import { Button, Icon, IconButton } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const CartItem = ({ item }) => {
  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top"
            src={item.product.imageUrl}
            alt={item.product.brand}
          />
        </div>
        <div></div>
        <div className="ml-5 space-y-1">
          <p className="font-semibold">{item.product?.title}</p>
          <p className="opacity-70">
            Size:{item?.size},{item.product?.color}
          </p>
          <p className="opacity-70 mt-2">Seller: {item.product?.brand}</p>
          <div className="flex space-x-5 items-center pt-6 lg:text-xl text-gray-900 mt-6">
            <p className="font-semibold">
              &#8377;
              {item.discountedPrice}
            </p>
            <p className="opacity-50 line-through">
              &#8377;
              {item.price}
            </p>
            <p className=" text-green-500 font-semibold">
              {item.product.discountPersent}%
            </p>
          </div>
        </div>
      </div>
      <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div className="flex items-center space-x-2">
          <IconButton>
            <RemoveCircleOutlineIcon />
          </IconButton>
          <span className="py-1 px-7 border rounded-sm">{item.quantity}</span>
          <IconButton sx={{ color: "RGB(145 85 253)" }}>
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
        <div>
          <Button sx={{ color: "RGB(145 85 253)" }}>remove</Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
