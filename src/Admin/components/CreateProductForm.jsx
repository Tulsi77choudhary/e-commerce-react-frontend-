import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { createProduct } from '../../State/Product/Action';
import { useState } from 'react';
import { Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';

const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
  { name: "XL", quantity: 0 },
  { name: "XXL", quantity: 0 }
]


const CreateProductForm = () => {
  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    color: "",
    discountedPrice: 0,
    price: 0,
    discountPersent: 0,
    size: initialSizes,
    quantity: "",
    topLavelCategory: "",
    secondLavelCategory: "",
    thirdLavelCategory: "",
    description: "",
  });
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    name = "size_quantity" ? name = "quantity" : name = e.target.name;

    const sizes = [...productData.size];
    sizes[index][name] = value;
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData));
  };

  return (
    <div className='p-10'>
      <Typography
        variant="h4"
        sx={{ textAline: "center" }}
        className="py-10 text-center"
      >
        Add New Product
      </Typography>

      <form onSubmit={handleSubmit}
        className='createProductContainer min-h-screen'
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Color"
              name="color"
              value={productData.color}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              type="number"
              value={productData.quantity}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={productData.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discount Price"
              name="discountedPrice"
              type="number"
              value={productData.discountedPrice}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discount Percentage"
              name="discountPersent"
              type="number"
              value={productData.discountPersent}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Top Level Category</InputLabel>
              <Select
                name="topLavelCategory"
                value={productData.topLavelCategory}
                label="Top Level Category"
                onChange={handleChange}
              >
                <MenuItem value="men">Men</MenuItem>
                <MenuItem value="women">Women</MenuItem>
                <MenuItem value="kids">Kids</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Second Level Category</InputLabel>
              <Select
                name="secondLavelCategory"
                value={productData.secondLavelCategory}
                label="Second Level Category"
                onChange={handleChange}
              >
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="accessories">Accessories</MenuItem>
                <MenuItem value="brands">Brands</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Third Level Category</InputLabel>
                <Select
                  name="thirdLavelCategory"
                  value={productData.thirdLavelCategory}
                  label="Third Level Category"
                  onChange={handleChange}
                >
                  <MenuItem value="top">T-Shirt</MenuItem>
                  <MenuItem value="women_dress">Jeans</MenuItem>
                  <MenuItem value="t_shirts">Shirt</MenuItem>
                  <MenuItem value="sares">Shoes</MenuItem>
                  <MenuItem value="lengha_choli">Accessories</MenuItem>
                  <MenuItem value="mens_kurta">mens_kurta</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='outlined-multiline-static'
                label="Description"
                name="description"
                multiline
                rows={3}
                value={productData.description}
                onChange={handleChange}
              />
            </Grid>
            {productData.size.map((size, index) => (
              <Grid container item spacing={3} key={index}>
                <Grid item xs={12} sm={6} >
                  <TextField
                    label="Size Name"
                    name="name"
                    value={size.name}
                    onChange={(e) => handleSizeChange(e, index)}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Quantity"
                    name='size_quantity'
                    type='number'
                    onChange={(e) => handleSizeChange(e, index)}
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12} >
              <Button
                variant="contained"
                type="submit"
                sx={{ p: 1.8 }}
                className="py-20"
                size="large"
              >
                Add New Product
              </Button>
            </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default CreateProductForm