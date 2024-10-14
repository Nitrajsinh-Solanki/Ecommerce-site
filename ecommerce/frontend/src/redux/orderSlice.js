import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Action to place an order and save it to the backend
export const placeOrder = createAsyncThunk('orders/placeOrder', async (orderData) => {
  const response = await axios.post('http://localhost:5000/api/orders/place', orderData);
  return response.data;
});

// Order slice for managing orders state
const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],   
    status: null,
    error: null,  
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload); 
        state.status = 'succeeded';        
        state.error = null;                
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = 'failed';           
        state.error = action.error.message; 
      });
  },
});

export default orderSlice.reducer;
