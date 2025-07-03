import { combineSlices } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlices';
import constructorSlice from './slices/constructorSlice';
import feedsSlice from './slices/feedsSlice';
import { userSlice } from './slices/userSlice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  constructorSlice,
  feedsSlice,
  userSlice
);
