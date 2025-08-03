import {
  expect,
  test,
  describe
} from '@jest/globals';
import feedsSlice, { feedsInitialState as initialState, getAllFeeds, getAllOrders, getOrderById, TFeedsState } from './feedsSlice';
import { TOrder } from '@utils-types';

const { reducer } = feedsSlice;

const mockOrders: TOrder[] = [{
  _id: '123',
  status: 'string',
  name: 'string',
  createdAt: 'string',
  updatedAt: 'string',
  number: 1,
  ingredients: ['string'],
}]

const mockChoosedOrder = {
  _id: '123',
    status: 'string',
    name: 'string',
    createdAt: 'string',
    updatedAt: 'string',
    number: 'number',
    ingredients: ['string'],
}

describe('Test of feedsSlice', () => {
  describe('Test of getAllFeeds', () => {
    test('Pendig', () => {
      const action = { type: getAllFeeds.pending.type };
      const newState = reducer(initialState, action);
      expect(newState).toEqual(initialState);
    })

    test('Rejected', () => {
      const action = {
        type: getAllFeeds.rejected.type,
        error: { message: 'Error' }
      };
      const newState = reducer(initialState, action);
      expect(newState.error).toBe('Error');
    })

    test('Fulfilled', () => {
      const action = {
        type: getAllFeeds.fulfilled.type,
        payload: {
          orders: mockOrders,
          total: 1,
          totalToday: 1
        }
      }
      const newState = reducer(initialState, action);
      expect(newState.feeds).toEqual(mockOrders);
      expect(newState.total).toBe(1);
      expect(newState.totalToday).toBe(1);
      expect(newState.error).toBeNull();
    })
  })

  describe('Test of getOrderById', () => {
    test('Pending', () => {
      const action = { type: getOrderById.pending.type };
      const newState = reducer(initialState, action);
      expect(newState.choosedOrder).toBeNull();
    });

    test('Rejected', () => {
      const action = { type: getOrderById.rejected.type, error: { message: 'Error' } };
      const newState = reducer(initialState, action);
      expect(newState.choosedOrder).toBeNull();
      expect(newState.error).not.toBeNull();
    })

    test('Fulfilled', () => {
      const action = {
        type: getOrderById.fulfilled.type,
        payload: { orders: mockOrders } 
      };
      const newState = reducer(initialState, action);
      expect(newState.choosedOrder).toEqual(mockOrders[0]);
      expect(newState.error).toBeNull();
    })
  })

  describe('Test of getAllOrders', () => {
    test('Pending', () => {
      const action = { type: getAllOrders.pending.type };
      const newState = reducer(initialState, action);
      expect(newState.orders).toEqual([]);
    });

    test('Rejected', () => {
      const action = { type: getAllOrders.rejected.type, error: { message: 'Error' } };
      const newState = reducer(initialState, action);
      expect(newState.orders).toEqual([]);
      expect(newState.error).not.toBeNull();
    })

    test('Fulfilled', () => {
      const action = {
        type: getAllOrders.fulfilled.type,
        payload: mockOrders
      };
      const newState = reducer(initialState, action);
      expect(newState.orders).toEqual(mockOrders);
      expect(newState.error).toBeNull();
    })
  })
})