import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrder, getOrders } from '../../State/Admin/Order/Action'
import { CardHeader, Avatar, AvatarGroup, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Card } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';



const OrdersTable = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch()
  const { orders } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(getOrders())
  }, [adminOrder,confirmed,adminOrder.shipped,delivered])

  const handleShipedOrder = (orderId) => {
    dispatch(shipOrder(orderId))
    handleClose()
  }

  const handleConfirmedOrder = (orderId) => {
    dispatch(confirmOrder(orderId))
    handleClose()
  }

  const handleDeliveredOrder = (orderId) => {
    dispatch(DeliveredOrder(orderId))
    handleClose()
  }

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId))
    handleClose()
  }
  return (
    <div className='p-10'>
      <Card className="mt-2">
        <CardHeader title="All Products" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Update</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders?.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">
                    <AvatarGroup sx={{ justifyContent: 'start' }}>
                      {order.orderItems?.map((orderItem) => <Avatar src={orderItem.product.imageUrl}></Avatar>)}
                    </AvatarGroup>
                  </TableCell>

                  <TableCell align="left" scope="row">
                    {order.orderItems?.map((orderItem) => <p> {orderItem.product.title}</p>)}
                  </TableCell>


                  <TableCell align="left">{order.id}</TableCell>
                  <TableCell align="left">{order.totalPrice}</TableCell>
                  <TableCell align="left">
                    <span
                      className={`text-white px-5 py-2 rounded-full ${order.orderStatus === "CONFIRMED" ? "bg-[#369236]" :
                        order.orderStatus === "SHIPPED" ? "bg-[#4141ff]" :
                          order.orderStatus === "PLACED" ? "bg-[#028290]" :
                            order.orderStatus === "PENDING" ? "bg-[gray]" :
                              "bg-[#025720]"}`}
                    >
                      {order.orderStatus}
                    </span>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                    >
                      status
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      slotProps={{
                        list: {
                          'aria-labelledby': 'basic-button',
                        },
                      }}
                    >
                      <MenuItem onClick={() => handleConfirmedOrder(order.id)}>Confirmed Order</MenuItem>
                      <MenuItem onClick={() => handleShipedOrder(order.id)}>Shipped Order</MenuItem>
                      <MenuItem onClick={() => handleDeliveredOrder(order.id)}>Delivered Order</MenuItem>
                    </Menu>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={()=>handleDeleteOrder(order.id)}
                      variant="outlined"
                      color="error">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div >
  )
}

export default OrdersTable