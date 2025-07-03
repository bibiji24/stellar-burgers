import { getFeedsApi, getOrderByNumberApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TFeedsState = {
  orders: TOrder[];
  feeds: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
  choosedOrder: TOrder | null;
};

const feedsInitialState: TFeedsState = {
  orders: [],
  feeds: [],
  total: 0,
  totalToday: 0,
  error: null,
  choosedOrder: null
};

export const getAllFeeds = createAsyncThunk('feeds/getAll', getFeedsApi);
export const getAllOrders = createAsyncThunk('feeds/getOrders', getOrdersApi);
export const getOrderById = createAsyncThunk(
  'feeds/getOrderById',
  getOrderByNumberApi
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState: feedsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeeds.pending, (state) => {
        state = feedsInitialState;
      })
      .addCase(getAllFeeds.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(getAllFeeds.fulfilled, (state, action) => {
        state.feeds = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.error = null;
      })
      .addCase(getOrderById.pending, (state, action) => {
        state.choosedOrder = null;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.choosedOrder = null;
        state.error = action.error.message!;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.choosedOrder = action.payload.orders[0];
        state.error = null;
      })
      .addCase(getAllOrders.pending, (state, action) => {
        state.orders = [];
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.error = null;
      });
  }
});

export default feedsSlice;
