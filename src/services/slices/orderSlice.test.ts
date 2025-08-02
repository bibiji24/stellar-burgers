import {
  expect,
  test,
  describe
} from '@jest/globals';
import { clearOrder, createOrder, orderBurger, orderSlice, TOrderState } from './orderSlice';
import { TConstructorIngredient } from '@utils-types';
import { TConstructorState } from './constructorSlice';

const { reducer } = orderSlice;

const mockIngredients: TConstructorIngredient[] = [
  {
    id: '1',
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
    id: '3',
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

const mockBun = {
  id: '2',
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
};

const initialState: TOrderState = {
  order: null,
  ingredients: [],
  error: null,
  orderRequest: false
};

const mockOrder = {
  _id: '123',
  status: 'string',
  name: 'string',
  createdAt: 'string',
  updatedAt: 'string',
  number: 1,
  ingredients: ['string'],
}

const mockConstructorState: TConstructorState = {
  ingredients: mockIngredients,
  bun: mockBun
}

const mockOrderIngredients = [
  "643d69a5c3f7b9001cfa093c",
  "643d69a5c3f7b9001cfa0941",
  "643d69a5c3f7b9001cfa0945",
  "643d69a5c3f7b9001cfa093c"
]

const mockOrderState: TOrderState = {
  order: mockOrder,
  ingredients: mockOrderIngredients,
  error: null,
  orderRequest: false
}

describe('Test of orderSlice', () => {
  test('Test of createOrder', () => {
    const action = {type: createOrder.type, payload: mockConstructorState};
    const newState = reducer(initialState, action);
    expect(newState.ingredients).toEqual(mockOrderIngredients);
  });

  test('Test of clearOrder', () => {
    const action = {type: clearOrder.type};
    const newState = reducer(mockOrderState, action);
    expect(newState).toEqual(initialState);
  });

  describe('Test of orderBurger', () => {
    test('Pending', () => {
      const action = {type: orderBurger.pending.type};
      const newState = reducer(initialState, action);
      expect(newState.orderRequest).toBe(true);
    });
    test('Rejected', () => {
      const action = { type: orderBurger.rejected.type, error: { message: 'Error' } };
      const newState = reducer(initialState, action);
      expect(newState.orderRequest).toBe(false);
      expect(newState.error).not.toBeNull();
    });
    test('Fulfilled', () => {
      const action = { type: orderBurger.fulfilled.type, payload: {order: mockOrder} };
      const newState = reducer(initialState, action);
      expect(newState.order).toEqual(mockOrder);
    })
  })
})