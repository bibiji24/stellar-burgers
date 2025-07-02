import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { v4 as randomId } from 'uuid';
import { TConstructorIngredient } from '@utils-types';
import { useDispatch } from '../../services/store';
import { addIngredient } from '../../services/slices/constructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const id = randomId();
    const dispatch = useDispatch();

    const handleAdd = () => {
      const constructorItem = {
        ...ingredient,
        id: id
      } as TConstructorIngredient;
      dispatch(addIngredient(constructorItem));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
