import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    CardHeader, Avatar, AvatarGroup, Button, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Paper, Card, Menu, MenuItem, 
    Chip, Typography, Box
} from '@mui/material';
import {
    getOrders, shipOrder, confirmOrder, deliverOrder
} from '../../State/Admin/Order/Action';

const OrdersTable = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.adminOrder);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    const handleClick = (event, orderId) => {
        setAnchorEl(event.currentTarget);
        setSelectedOrderId(orderId);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedOrderId(null);
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case "CONFIRMED": return { color: "success", label: "Confirmed", bg: "#e8f5e9" };
            case "SHIPPED": return { color: "primary", label: "Shipped", bg: "#e3f2fd" };
            case "PLACED": return { color: "info", label: "Placed", bg: "#e0f7fa" };
            case "DELIVERED": return { color: "secondary", label: "Delivered", bg: "#f3e5f5" };
            default: return { color: "default", label: status, bg: "#eeeeee" };
        }
    };

    return (
        // Responsive Padding: xs for mobile, md for desktop
        <Box sx={{ p: { xs: 1, sm: 2, md: 4 }, bgcolor: "#f9fafb", minHeight: "100vh" }}>
            <Card sx={{ 
                borderRadius: { xs: '12px', md: '20px' }, 
                boxShadow: '0 10px 40px rgba(0,0,0,0.04)', 
                border: '1px solid #eff0f2',
                overflow: 'hidden'
            }}>
                <CardHeader 
                    title={
                        <Typography variant="h6" sx={{ fontWeight: 800, color: "#1a202c", fontSize: { xs: '1rem', md: '1.25rem' } }}>
                            Order Fulfillment
                        </Typography>
                    } 
                    sx={{ 
                        borderBottom: '1px solid #f1f2f4', 
                        bgcolor: '#ffffff',
                        px: { xs: 2, md: 3 },
                        py: 2.5
                    }}
                />

                {/* TableContainer enables horizontal scrolling on small screens */}
                <TableContainer component={Paper} elevation={0} sx={{ overflowX: "auto" }}>
                    <Table sx={{ minWidth: 850 }}>
                        <TableHead sx={{ bgcolor: "#f8f9fc" }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700, color: "#4a5568", py: 2 }}>Products</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: "#4a5568" }}>Title</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: "#4a5568" }}>Reference</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: "#4a5568" }}>Amount</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: "#4a5568" }} align="center">Status</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: "#4a5568" }} align="center">Control</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody sx={{ bgcolor: "#ffffff" }}>
                            {orders?.map((order) => {
                                const status = getStatusStyles(order.orderStatus);
                                return (
                                    <TableRow 
                                        key={order.id} 
                                        hover 
                                        sx={{ 
                                            transition: 'all 0.3s ease',
                                            '&:hover': { bgcolor: '#f1f5f9 !important' }
                                        }}
                                    >
                                        <TableCell sx={{ py: 2.5 }}>
                                            <AvatarGroup max={3} sx={{ justifyContent: 'start' }}>
                                                {order.orderItems?.map((item) => (
                                                    <Avatar 
                                                        key={item.id} 
                                                        src={item.product?.imageUrl} 
                                                        sx={{ 
                                                            width: { xs: 36, md: 44 }, 
                                                            height: { xs: 36, md: 44 }, 
                                                            border: '3px solid #fff',
                                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                                        }}
                                                    />
                                                ))}
                                            </AvatarGroup>
                                        </TableCell>

                                        <TableCell sx={{ maxWidth: 200 }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                {order.orderItems?.map((item, index) => (
                                                    <Typography 
                                                        key={item.id} 
                                                        variant="caption" 
                                                        sx={{ fontWeight: 600, color: '#2d3748', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                                    >
                                                        {item.product?.title}{index < order.orderItems.length - 1 ? ' • ' : ''}
                                                    </Typography>
                                                ))}
                                            </Box>
                                        </TableCell>

                                        <TableCell>
                                            <Typography variant="caption" sx={{ 
                                                fontFamily: '"Roboto Mono", monospace', 
                                                bgcolor: "#f1f5f9",
                                                px: 1,
                                                py: 0.5,
                                                borderRadius: '6px',
                                                color: '#64748b',
                                                fontSize: '0.65rem'
                                            }}>
                                                ORD-{order.id}
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography sx={{ fontWeight: 800, color: '#1a202c', fontSize: { xs: '0.85rem', md: '1rem' } }}>
                                                ₹{order.totalPrice.toLocaleString()}
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="center">
                                            <Chip 
                                                label={status.label} 
                                                variant="filled"
                                                size="small" 
                                                sx={{ 
                                                    fontWeight: 700, 
                                                    px: { xs: 0.5, md: 1.5 },
                                                    borderRadius: '8px',
                                                    fontSize: '0.65rem',
                                                    bgcolor: status.bg,
                                                    color: `${status.color}.main`
                                                }}
                                            />
                                        </TableCell>

                                        <TableCell align="center">
                                            <Button
                                                size="small"
                                                variant="contained"
                                                disableElevation
                                                onClick={(e) => handleClick(e, order.id)}
                                                sx={{ 
                                                    textTransform: 'none', 
                                                    borderRadius: '8px',
                                                    fontWeight: 600,
                                                    fontSize: '0.75rem',
                                                    bgcolor: "#9155FD",
                                                    '&:hover': { bgcolor: "#7a45d1" }
                                                }}
                                            >
                                                Manage
                                            </Button>
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
                    elevation={4}
                    PaperProps={{ 
                        sx: { 
                            width: '180px', 
                            borderRadius: '15px', 
                            mt: 1.5, 
                            p: 1,
                            border: '1px solid #f1f2f4'
                        } 
                    }}
                >
                    <MenuItem onClick={() => { dispatch(confirmOrder(selectedOrderId)); handleClose(); }} sx={{ borderRadius: '8px', fontSize: '14px', py: 1 }}>Confirm Order</MenuItem>
                    <MenuItem onClick={() => { dispatch(shipOrder(selectedOrderId)); handleClose(); }} sx={{ borderRadius: '8px', fontSize: '14px', py: 1 }}>Mark Shipped</MenuItem>
                    <MenuItem onClick={() => { dispatch(deliverOrder(selectedOrderId)); handleClose(); }} sx={{ borderRadius: '8px', fontSize: '14px', py: 1 }}>Mark Delivered</MenuItem>
                </Menu>
            </Card>
        </Box>
    );
};

export default OrdersTable;