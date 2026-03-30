import React, { useEffect } from 'react';
import { 
  CardHeader, Avatar, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Card, Typography, Box 
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { findProducts } from "../../State/Product/Action";

const ProductTableView = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    const queryData = {
      category: "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: "price_low",
      pageNumber: 0,
      pageSize: 5,
      stock: "",
    };
    dispatch(findProducts(queryData));
  }, [dispatch]);

  const productsList = products?.content || products || [];

  return (
    // Box responsive padding ke liye
    <Box sx={{ p: { xs: 1, sm: 2, md: 5 } }}> 
      <Card sx={{ mt: 2, borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <CardHeader 
          title={
            <Typography variant="h6" sx={{ fontWeight: 800, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              Recent Products
            </Typography>
          } 
        />
        
        {/* TableContainer horizontal scroll allow karta hai mobile par */}
        <TableContainer component={Paper} elevation={0} sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 650 }} size="medium">
            <TableHead sx={{ bgcolor: "#f9fafb" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>Title</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>Category</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>Price</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsList.slice(0, 5).map((item) => (
                <TableRow
                  key={item.id || item.title}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">
                    <Avatar 
                      src={item.imageUrl} 
                      variant="rounded" 
                      sx={{ 
                        width: { xs: 40, sm: 50 }, 
                        height: { xs: 40, sm: 50 }, 
                        border: '1px solid #f0f0f0' 
                      }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: 500, fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                    {item.title}
                  </TableCell>
                  <TableCell align="left">
                    <Box 
                      component="span" 
                      sx={{ 
                        display: 'inline-block',
                        bgcolor: '#eff6ff', 
                        color: '#2563eb', 
                        px: 2, 
                        py: 0.5, 
                        borderRadius: '50px', 
                        fontSize: '0.75rem', 
                        fontWeight: 'bold' 
                      }}
                    >
                       {item.category?.name}
                    </Box>
                  </TableCell>
                  <TableCell align="left" sx={{ whiteSpace: 'nowrap' }}>₹{item.price}</TableCell>
                  <TableCell align="left">
                    <Typography 
                      component="span" 
                      sx={{ 
                        color: item.quantity < 10 ? "error.main" : "success.main", 
                        fontWeight: "bold",
                        fontSize: '0.85rem'
                      }}
                    >
                      {item.quantity}
                    </Typography>
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

export default ProductTableView;