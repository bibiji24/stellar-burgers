import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

export type TConstructorState = {
  ingredients: TConstructorIngredient[];
  bun: TConstructorIngredient | null;
};

const constructorInitialState: TConstructorState = {
  ingredients: [],
  bun: null
};

type changePositionDirection = 1 | -1;

const changePosition = (
  list: TConstructorIngredient[],
  ingredient: TConstructorIngredient,
  direction: changePositionDirection
): TConstructorIngredient[] => {
  const ingredientIndex = list.findIndex((item) => item.id === ingredient.id);
  list[ingredientIndex] = list[ingredientIndex + direction];
  list[ingredientIndex + direction] = ingredient;
  return list;
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: constructorInitialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else [state.ingredients.push(action.payload)];
    },
    moveConstructorItemDown: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      changePosition(state.ingredients, action.payload, 1);
    },
    moveConstructorItemtUp: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      changePosition(state.ingredients, action.payload, -1);
    },
    deleteConstructorItem: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    }
  }
});

export const {
  addIngredient,
  moveConstructorItemDown,
  moveConstructorItemtUp,
  deleteConstructorItem
} = constructorSlice.actions;

export default constructorSlice;
