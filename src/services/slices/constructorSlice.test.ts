import {
  beforeEach,
  expect,
  test,
  describe,
  jest
} from '@jest/globals';
import constructorSlice, { constructorInitialState as initialState, TConstructorState } from './constructorSlice';
import { TConstructorIngredient } from '@utils-types';

const { reducer } = constructorSlice;
const {
  addIngredient,
  moveConstructorItemDown,
  moveConstructorItemtUp,
  deleteConstructorItem,
  clearConstructor,
} = constructorSlice.actions;

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

beforeEach(() => {
  jest.clearAllMocks();
})

describe('Test of constructorSlice', () => {
  describe('Test of addIngredient', () => {
    test('should add bun correctly', () => {
      const newState = reducer(initialState, addIngredient(mockIngredients[1]));
      expect(newState.bun).toEqual(mockIngredients[1]);
      expect(newState.ingredients).toEqual([]);
    });

    test('should add ingredient to ingredients array', () => {
      const newState = reducer(initialState, addIngredient(mockIngredients[0]));
      expect(newState.bun).toBeNull();
      expect(newState.ingredients).toEqual([mockIngredients[0]]);
    });
  });

  describe('Test of removing ingredients', () => {
    test('Test of deleteConstructorItem', () => {
      const stateWithIngredients: TConstructorState = {
        ...initialState,
        ingredients: mockIngredients
      }

      const ingredientForDelete = mockIngredients[0]

      const newState = reducer(stateWithIngredients, deleteConstructorItem(ingredientForDelete));
      expect(newState.ingredients).toEqual([
        mockIngredients[1],
        mockIngredients[2]
      ])
    });

    test('Test of clearConstructor', () => {
      const stateWithIngredients: TConstructorState = {
        ...initialState,
        ingredients: mockIngredients
      }

      const newState = reducer(stateWithIngredients, clearConstructor());
      expect(newState).toEqual(initialState);
    });
  });

  describe('Test of moving ingredients in constructor', () => {
    const stateWithIngredients: TConstructorState = {
      ...initialState,
      ingredients: mockIngredients
    }

    test('Test of moveConstructorItemDown', () => {
      const itemToMove = mockIngredients[0];
      const newState = reducer(stateWithIngredients, moveConstructorItemDown(itemToMove));
      expect(newState.ingredients).toEqual([
        mockIngredients[1],
        mockIngredients[0],
        mockIngredients[2]
      ]);
    });

    test('Test of moveConstructorItemtUp', () => {
      const itemToMove = mockIngredients[2];
      const newState = reducer(stateWithIngredients, moveConstructorItemtUp(itemToMove));
      expect(newState.ingredients).toEqual([
        mockIngredients[0],
        mockIngredients[2],
        mockIngredients[1]
      ]);
    });
  });
});