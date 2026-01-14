import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CardHeader,
  Avatar,
  AvatarGroup,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  Menu,
  MenuItem
} from '@mui/material'

import {
  getOrders,
  deleteOrder,
  shipOrder,
  confirmOrder,
  deliverOrder
} from '../../State/Admin/Order/Action'

const OrdersTable = () => {

  const dispatch = useDispatch()
  const { orders } = useSelector((state) => state.adminOrder)

  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedOrderId, setSelectedOrderId] = useState(null)

  const open = Boolean(anchorEl)

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch,deleteOrder])

  const handleClick = (event, orderId) => {
    setAnchorEl(event.currentTarget)
    setSelectedOrderId(orderId)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSelectedOrderId(null)
  }

  const handleShipedOrder = () => {
    dispatch(shipOrder(selectedOrderId))
    handleClose()
  }

  const handleConfirmedOrder = () => {
    dispatch(confirmOrder(selectedOrderId))
    handleClose()
  }

  const handleDeliveredOrder = () => {
    dispatch(deliverOrder(selectedOrderId))
    handleClose()
  }

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId))
  }

  return (
    <div className='p-10'>
      <Card className="mt-2">
        <CardHeader title="All Orders" />

        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders?.map((order) => (
                <TableRow key={order.id}>
                  
                  <TableCell>
                    <AvatarGroup sx={{ justifyContent: 'start' }}>
                      {order.orderItems?.map((item) => (
                        <Avatar
                          key={item.id}
                          src={item.product.imageUrl}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>

                  <TableCell>
                    {order.orderItems?.map((item) => (
                      <p key={item.id}>{item.product.title}</p>
                    ))}
                  </TableCell>

                  <TableCell>{order.id}</TableCell>
                  <TableCell>₹{order.totalPrice}</TableCell>

                  <TableCell>
                    <span className={`text-white px-5 py-2 rounded-full
                      ${order.orderStatus === "CONFIRMED" ? "bg-[#369236]" :
                        order.orderStatus === "SHIPPED" ? "bg-[#4141ff]" :
                        order.orderStatus === "PLACED" ? "bg-[#028290]" :
                        order.orderStatus === "PENDING" ? "bg-gray-500" :
                        "bg-[#025720]"}`}
                    >
                      {order.orderStatus}
                    </span>
                  </TableCell>

                  <TableCell>
                    <Button
                      onClick={(e) => handleClick(e, order.id)}
                      variant="contained"
                    >
                      Status
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button
                      onClick={() => handleDeleteOrder(order.id)}
                      variant="outlined"
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

       
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleConfirmedOrder}>Confirmed</MenuItem>
          <MenuItem onClick={handleShipedOrder}>Shipped</MenuItem>
          <MenuItem onClick={handleDeliveredOrder}>Delivered</MenuItem>
        </Menu>

      </Card>
    </div>
  )
}

export default OrdersTable
