import React from 'react'
import { CardHeader,Avatar,Button,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { findProducts} from "../../State/Product/Action";
import { Card } from "@mui/material";


const ProductTableView = () => {

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  console.log("products", products);

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
    <div className='p-5'>

      <Card className="mt-2">
        <CardHeader title="Recent Products" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Quantity</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
               {products?.slice(0, 5).map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">
                    <Avatar src={item.imageUrl} />
                  </TableCell>
                  <TableCell align="left" scope="row">
                    {item.title}
                  </TableCell>
                  <TableCell align="left">{item.category.name}</TableCell>
                  <TableCell align="left">{item.price}</TableCell>
                  <TableCell align="left">{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  )
}

export default ProductTableView