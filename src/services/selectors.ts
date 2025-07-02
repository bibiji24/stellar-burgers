import { RootState } from './store';
//Ingredients
export const getIngredientsSelector = (state: RootState) =>
  state.ingredients.ingredients;

//burgerConstructor
export const getConstructorStateSelector = (state: RootState) =>
  state.burgerConstructor;

//feeds
export const getFeedsOrdersSelector = (state: RootState) => state.feeds.feeds;

export const getFeedsTotalSelector = (state: RootState) => state.feeds.total;

export const getFeedsTotalTodaySelector = (state: RootState) =>
  state.feeds.totalToday;

export const getOrdersSelector = (state: RootState) => state.feeds.orders;

export const getFeedsState = (state: RootState) => state.feeds;

export const getChoosedOrderSelector = (state: RootState) =>
  state.feeds.choosedOrder;
