import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch products from the backend
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('http://localhost:5000/api/products'); // Update this URL to match your backend
  return response.data; // Assuming the backend returns the products in the `data` property
});

// Async thunk to add a new product to the backend
export const addProduct = createAsyncThunk('products/addProduct', async (newProduct) => {
  const response = await axios.post('http://localhost:5000/api/products', newProduct); // Update this URL to match your backend
  return response.data; 
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle', 
    error: null
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload; 
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload); 
      });
  }
});

export const { } = productSlice.actions; 

export default productSlice.reducer;
