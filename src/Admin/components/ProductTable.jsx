import React, { useEffect } from 'react';
import { 
  CardHeader, Avatar, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Card, Typography, Box 
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { findProducts, deleteProduct } from "../../State/Product/Action";

const ProductTable = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  useEffect(() => {
    const data = {
      category: null,
      color: [],
      size: [],
      minPrice: null,
      maxPrice: null,
      minDiscount: 0,
      sort: "price_low",
      pageNumber: 0,
      pageSize: 5,
      stock: "",
    };
    dispatch(findProducts(data));
  }, [dispatch]);

  return (
    <Box className='p-5'>
      {/* Container Card with subtle shadow and rounded corners */}
      <Card sx={{ 
        mt: 2, 
        borderRadius: '12px', 
        boxShadow: '0px 4px 20px rgba(0,0,0,0.05)',
        overflow: 'hidden' 
      }}>
        <CardHeader 
          title={<Typography variant="h5" sx={{ fontWeight: 800 }}>All Products</Typography>} 
          sx={{ borderBottom: '1px solid #f0f0f0', p: 3, bgcolor: '#ffffff' }}
        />
        
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650 }} aria-label="premium product table">
            <TableHead sx={{ bgcolor: "#F9FAFB" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: '#374151' }}>Image</TableCell>
                <TableCell align="left" sx={{ fontWeight: 700, color: '#374151' }}>Title</TableCell>
                <TableCell align="left" sx={{ fontWeight: 700, color: '#374151' }}>Category</TableCell>
                <TableCell align="left" sx={{ fontWeight: 700, color: '#374151' }}>Price</TableCell>
                <TableCell align="left" sx={{ fontWeight: 700, color: '#374151' }}>Quantity</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: '#374151' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {products?.map((item) => (
                <TableRow
                  key={item.id} // Replaced item.name with item.id for uniqueness
                  hover
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    transition: '0.3s',
                    '&:hover': { bgcolor: '#fcfaff !important' } 
                  }}
                >
                  <TableCell align="left">
                    <Avatar 
                      src={item.imageUrl} 
                      variant="rounded" 
                      sx={{ width: 50, height: 50, border: '1px solid #eee' }} 
                    />
                  </TableCell>
                  
                  <TableCell align="left" sx={{ fontWeight: 600, color: '#111827' }}>
                    {item.title}
                  </TableCell>
                  
                  <TableCell align="left">
                    <Typography variant="body2" sx={{ color: '#6B7280' }}>
                      {item.category?.name}
                    </Typography>
                  </TableCell>
                  
                  <TableCell align="left" sx={{ fontWeight: 700 }}>
                    ₹{item.price}
                  </TableCell>
                  
                  <TableCell align="left">
                    <Box sx={{ 
                      color: item.quantity < 10 ? '#ef4444' : '#10b981',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      {item.quantity}
                    </Box>
                  </TableCell>
                  
                  <TableCell align="center">
                    <Button 
                      onClick={() => handleProductDelete(item.id)} 
                      variant="contained" 
                      color="error"
                      disableElevation
                      sx={{ 
                        textTransform: 'none', 
                        borderRadius: '8px',
                        fontWeight: 600,
                        px: 3
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}

export default ProductTable;