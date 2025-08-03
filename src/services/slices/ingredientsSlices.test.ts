import {
  beforeEach,
  expect,
  test,
  describe,
  jest
} from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice, {
  getIngredients,
  initialIngredientsState as initialState
} from './ingredientsSlices';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../../utils/burger-api';

const mockIngredients: TIngredient[]= [
  {
    _id: "643d69a5c3f7b9001cfa0941",
    name: "Биокотлета из марсианской Магнолии",
    type: "main",
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
  },
  {
    _id: "643d69a5c3f7b9001cfa093c",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  },
  {
    _id: "643d69a5c3f7b9001cfa0945",
    name: "Соус с шипами Антарианского плоскоходца",
    type: "sauce",
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: "https://code.s3.yandex.net/react/code/sauce-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-01-large.png",
  },
];

jest.mock('../../utils/burger-api');

const { reducer } = ingredientsSlice;

describe('Test of ingredientsSlice', () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        ingredients: ingredientsSlice.reducer
      }
    })
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('Initial state', () => {
    expect(store.getState().ingredients).toEqual(initialState);
  });

  test('Get ingredients (fulfilled)', async () => {
    (getIngredientsApi as jest.Mock).mockImplementation(() => Promise.resolve(mockIngredients));
    await store.dispatch(getIngredients());
    expect(store.getState().ingredients.loading).toBe(false);
    expect(store.getState().ingredients.error).toBeNull();
    expect(store.getState().ingredients.ingredients).toEqual(mockIngredients);
  })

  test('Get ingredients (Pending)', () => {
    const action = {type: getIngredients.pending.type};
    const newState = reducer(initialState, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  })

  test('Get ingredients (rejected)', () => {
    const action = {type: getIngredients.rejected.type, error: { message: 'error' }};
    const newState = reducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).not.toBeNull();
  })
});