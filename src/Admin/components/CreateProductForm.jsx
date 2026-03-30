import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../State/Product/Action';
import { 
  Grid, TextField, Typography, FormControl, InputLabel, 
  Select, MenuItem, Button, Box, Paper, Divider 
} from '@mui/material';

const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
  { name: "XL", quantity: 0 },
  { name: "XXL", quantity: 0 }
];

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    name === "size_quantity" ? name = "quantity" : name = e.target.name;

    const sizes = [...productData.size];
    sizes[index][name] = value;
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData));
    console.log("Product Data:", productData);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, bgcolor: "#f5f5f7", minHeight: "100vh" }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: "16px", border: "1px solid #e0e0e0" }}>
        
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 4, color: "#333" }}>
          Create New Product
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            
            {/* --- Basic Information --- */}
            <Grid item xs={12}>
              <TextField
                fullWidth label="Product Image URL" name="imageUrl"
                variant="outlined" value={productData.imageUrl} onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Brand Name" name="brand" value={productData.brand} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Product Title" name="title" value={productData.title} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Primary Color" name="color" value={productData.color} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth type="number" label="Total Quantity" name="quantity" value={productData.quantity} onChange={handleChange} />
            </Grid>

            {/* --- Pricing --- */}
            <Grid item xs={12} sm={4}>
              <TextField fullWidth type="number" label="Original Price" name="price" value={productData.price} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField fullWidth type="number" label="Discounted Price" name="discountedPrice" value={productData.discountedPrice} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField fullWidth type="number" label="Discount %" name="discountPersent" value={productData.discountPersent} onChange={handleChange} />
            </Grid>

            {/* --- Categories --- */}
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Top Level Category</InputLabel>
                <Select name="topLavelCategory" value={productData.topLavelCategory} label="Top Level Category" onChange={handleChange}>
                  <MenuItem value="men">Men</MenuItem>
                  <MenuItem value="women">Women</MenuItem>
                  <MenuItem value="kids">Kids</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Second Level</InputLabel>
                <Select name="secondLavelCategory" value={productData.secondLavelCategory} label="Second Level" onChange={handleChange}>
                  <MenuItem value="clothing">Clothing</MenuItem>
                  <MenuItem value="accessories">Accessories</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Third Level</InputLabel>
                <Select name="thirdLavelCategory" value={productData.thirdLavelCategory} label="Third Level" onChange={handleChange}>
                  <MenuItem value="mens_kurta">Kurta</MenuItem>
                  <MenuItem value="shirt">Shirt</MenuItem>
                  <MenuItem value="jeans">Jeans</MenuItem>
                  <MenuItem value="shoes">Shoes</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth multiline rows={3} label="Product Description" name="description" value={productData.description} onChange={handleChange} />
            </Grid>

            {/* --- Sizes Section --- */}
            <Grid item xs={12}>
              <Box sx={{ mt: 3, p: 3, bgcolor: "#fafafa", borderRadius: "12px", border: "1px dashed #ccc" }}>
                <Typography variant="h6" sx={{ mb: 2, fontSize: "1rem", fontWeight: 700 }}>
                  Manage Stock per Size
                </Typography>
                <Grid container spacing={2}>
                  {productData.size.map((size, index) => (
                    <React.Fragment key={index}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label={`Size (${size.name})`} name="name" value={size.name}
                          fullWidth size="small" onChange={(e) => handleSizeChange(e, index)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Available Stock" name='size_quantity' type='number'
                          fullWidth size="small" onChange={(e) => handleSizeChange(e, index)}
                        />
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              </Box>
            </Grid>

            {/* --- Submit Button --- */}
            <Grid item xs={12} sx={{ mt: 4 }}>
              <Button
                fullWidth size="large" type="submit" variant="contained"
                sx={{ 
                  py: 1.8, bgcolor: "#9155FD", borderRadius: "10px", fontWeight: "bold",
                  "&:hover": { bgcolor: "#7a45d1" } 
                }}
              >
                Publish Product
              </Button>
            </Grid>

          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateProductForm;