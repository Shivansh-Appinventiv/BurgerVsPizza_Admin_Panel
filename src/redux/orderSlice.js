import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    orderStatus: null,
    ordersError: null,
  },
  reducers: {
    setOrders: (state, action) => {
      //console.log(action.payload,"orderSlice");
      state.orders = [...action.payload?.orders];
      state.orderStatus = "success";
    },
    setError: (state, action) => {
      state.orderStatus = "failed";
      state.ordersError = "No Orders Available";
    },
  },
});

export const { setOrders, setError } = orderSlice.actions;

export default orderSlice.reducer;
