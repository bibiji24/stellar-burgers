import {
  beforeEach,
  expect,
  test,
  describe,
  jest
} from '@jest/globals';

import { rootReducer } from "./rootReducer";
import { RootState } from './store';
import { initialIngredientsState } from './slices/ingredientsSlices';
import { constructorInitialState } from './slices/constructorSlice';
import { feedsInitialState } from './slices/feedsSlice';
import { userInitialState } from './slices/userSlice';
import { orderInitialState } from './slices/orderSlice';

const initialState: RootState = {
  ingredients: initialIngredientsState,
  burgerConstructor: constructorInitialState,
  feeds: feedsInitialState,
  user: userInitialState,
  order: orderInitialState
}

describe('Test of rootReducer', () => {
  test('Should return correct initial state of the store', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = rootReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });
  
})