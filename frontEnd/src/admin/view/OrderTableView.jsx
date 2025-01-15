import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  deleteOrder,
  shippedOrder,
  confirmOrder,
  deliverOrder,
} from "../../state/Admin/Order/orderSlice";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const OrderTable = () => {
  const dispatch = useDispatch();
  const adminOrder = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  const handleProductDelete = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  const [anchorEl, setAnchorEl] = React.useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event, index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorEl(newAnchorElArray);
  };
  const handleClose = (index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = null;
    setAnchorEl(newAnchorElArray);
  };

  const handleShippedOrder = (orderId) => {
    dispatch(shippedOrder(orderId));
    handleClose();
  };
  const handleConfirmedOrder = (orderId) => {
    dispatch(confirmOrder(orderId));
    handleClose();
  };
  const handleDeliverOrder = (orderId) => {
    dispatch(deliverOrder(orderId));
    handleClose();
  };

  return (
    <div>
      <Card className="mt-2">
        <CardHeader title="Recent Orders" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Order ID</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrder?.orders?.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="right">
                    <AvatarGroup max={3} sx={{ justifyContent: "start" }}>
                      {item.orderItems?.map((item, index) => (
                        <Avatar
                          key={index}
                          src={item?.product?.imageUrl}
                        ></Avatar>
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="left">
                    {item.orderItems?.map((item, index) => (
                      <p key={index}>{item?.product?.title}</p>
                    ))}
                  </TableCell>
                  <TableCell align="left">{item._id}</TableCell>
                  <TableCell align="left">
                    {item.totalDiscountedPrice}
                  </TableCell>
                  <TableCell align="left">
                    <span
                      className={`text-white px-5 py-2 rounded-full ${
                        item.orderStatus === "Pending"
                          ? "bg-[gray]"
                          : item.orderStatus === "SHIPPED"
                          ? "bg-[blue]"
                          : item.orderStatus === "CONFIRMED"
                          ? "bg-[orange]"
                          : "bg-[green]"
                      }`}
                    >
                      {item.orderStatus}
                    </span>
                  </TableCell>
                  <TableCell align="left">
                    <Menu
                      id={`basic-menu-${item._id}`}
                      anchorEl={anchorEl[index]}
                      open={Boolean(anchorEl[index])}
                      onClose={() => handleClose(index)}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={() => handleConfirmedOrder(item._id)}>
                        Order Confirmed
                      </MenuItem>
                      <MenuItem onClick={() => handleShippedOrder(item._id)}>
                        Order Shipped
                      </MenuItem>
                      <MenuItem onClick={() => handleDeliverOrder(item._id)}>
                        Order Delivered
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default OrderTable;
