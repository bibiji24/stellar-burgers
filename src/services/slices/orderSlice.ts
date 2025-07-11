import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { TConstructorState } from './constructorSlice';
import { orderBurgerApi } from '@api';

export type TOrderState = {
  order: TOrder | null;
  ingredients: string[];
  error: string | null;
  orderRequest: boolean;
};

const orderInitialState: TOrderState = {
  order: null,
  ingredients: [],
  error: null,
  orderRequest: false
};

export const orderBurger = createAsyncThunk(
  'constructor/order',
  async (data: string[]) => orderBurgerApi(data)
);

export const orderSlice = createSlice({
  name: 'order',
  initialState: orderInitialState,
  reducers: {
    createOrder: (state, action: PayloadAction<TConstructorState>) => {
      state.ingredients = action.payload.ingredients.map((item) => item._id);
      if (action.payload.bun) {
        state.ingredients.push(action.payload.bun._id);
        state.ingredients.unshift(action.payload.bun._id);
      }
    },
    clearOrder: (state) => {
      state.order = null;
      state.ingredients = [];
      state.error = null;
      state.orderRequest = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message!;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload.order;
      });
  }
});

export const { createOrder, clearOrder } = orderSlice.actions;
