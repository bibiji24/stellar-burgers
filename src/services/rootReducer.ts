import { combineSlices } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlices';
import constructorSlice from './slices/constructorSlice';
import feedsSlice from './slices/feedsSlice';
import { userSlice } from './slices/userSlice';
import { orderSlice } from './slices/orderSlice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  constructorSlice,
  feedsSlice,
  userSlice,
  orderSlice
);
