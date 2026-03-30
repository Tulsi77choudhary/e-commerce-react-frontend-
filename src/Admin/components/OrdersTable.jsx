import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CardHeader, Avatar, AvatarGroup, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Card, Menu, MenuItem, Chip, Typography, Box
} from '@mui/material';
import {
  getOrders, deleteOrder, shipOrder, confirmOrder, deliverOrder
} from '../../State/Admin/Order/Action';

const OrdersTable = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.adminOrder);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]); // deleteOrder ko dependency se hatayein, dispatch function is enough

  const handleClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  // Helper function for status colors
  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRMED": return { bg: "#e8f5e9", text: "#2e7d32" };
      case "SHIPPED": return { bg: "#e3f2fd", text: "#1976d2" };
      case "PLACED": return { bg: "#fff3e0", text: "#ef6c00" };
      case "DELIVERED": return { bg: "#f3e5f5", text: "#7b1fa2" };
      default: return { bg: "#f5f5f5", text: "#616161" };
    }
  };

  return (
    <Box className='p-10'>
      <Card sx={{ borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.08)' }}>
        <CardHeader 
          title={<Typography variant="h5" fontWeight={800}>Order Management</Typography>} 
          sx={{ bgcolor: '#fafafa', borderBottom: '1px solid #eee' }}
        />

        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead sx={{ bgcolor: "#fcfcfc" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Products</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Details</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Total Price</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders?.map((order) => {
                const statusStyle = getStatusColor(order.orderStatus);
                return (
                  <TableRow key={order.id} hover sx={{ transition: '0.2s' }}>
                    <TableCell>
                      <AvatarGroup max={3} sx={{ justifyContent: 'start' }}>
                        {order.orderItems?.map((item) => (
                          <Avatar 
                            key={item.id} 
                            src={item.product?.imageUrl} 
                            sx={{ width: 45, height: 45, border: '2px solid white' }}
                          />
                        ))}
                      </AvatarGroup>
                    </TableCell>

                    <TableCell>
                      {order.orderItems?.map((item, index) => (
                        <Typography key={item.id} variant="body2" sx={{ fontWeight: 500, color: '#444' }}>
                          {item.product?.title}{index !== order.orderItems.length - 1 && ","}
                        </Typography>
                      ))}
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace', color: '#888' }}>
                        #{order.id}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ fontWeight: 700, color: '#2c3e50' }}>
                        ₹{order.totalPrice}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip 
                        label={order.orderStatus} 
                        sx={{ 
                          bgcolor: statusStyle.bg, 
                          color: statusStyle.text, 
                          fontWeight: 700,
                          fontSize: '0.75rem'
                        }} 
                      />
                    </TableCell>

                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <Button
                          size="small"
                          onClick={(e) => handleClick(e, order.id)}
                          variant="contained"
                          disableElevation
                          sx={{ textTransform: 'none', borderRadius: '8px' }}
                        >
                          Status
                        </Button>
                        <Button
                          size="small"
                          onClick={() => dispatch(deleteOrder(order.id))}
                          variant="outlined"
                          color="error"
                          sx={{ textTransform: 'none', borderRadius: '8px' }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Menu 
          anchorEl={anchorEl} 
          open={open} 
          onClose={handleClose}
          PaperProps={{ sx: { width: '150px', borderRadius: '10px', mt: 1 } }}
        >
          <MenuItem onClick={() => { dispatch(confirmOrder(selectedOrderId)); handleClose(); }}>Confirm</MenuItem>
          <MenuItem onClick={() => { dispatch(shipOrder(selectedOrderId)); handleClose(); }}>Ship</MenuItem>
          <MenuItem onClick={() => { dispatch(deliverOrder(selectedOrderId)); handleClose(); }}>Deliver</MenuItem>
        </Menu>
      </Card>
    </Box>
  );
};

export default OrdersTable;