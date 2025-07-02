import { getFeedsApi, getOrdersApi } from '@api';
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
export const getAllOrders = createAsyncThunk(
  'feeds/getAllOrders',
  getOrdersApi
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState: feedsInitialState,
  reducers: {
    chooseOrder: (state, action: PayloadAction<TOrder>) => {
      state.choosedOrder = action.payload;
    }
  },
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
      });
  }
});

export default feedsSlice;
