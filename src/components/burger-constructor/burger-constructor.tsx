import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getConstructorStateSelector,
  orderIngredientsSelector,
  orderRequestSelector,
  orderSelector,
  userDataSelector
} from '@selectors';
import { useNavigate } from 'react-router-dom';
import {
  clearOrder,
  createOrder,
  orderBurger
} from '../../services/slices/orderSlice';
import { clearConstructor } from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const constructorItems = useSelector(getConstructorStateSelector);
  const orderRequest = useSelector(orderRequestSelector);
  const orderModalData = useSelector(orderSelector);
  const user = useSelector(userDataSelector);
  const navigate = useNavigate();
  const ingredients = useSelector(orderIngredientsSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');
    } else {
      dispatch(createOrder(constructorItems));
    }
  };

  useEffect(() => {
    if (ingredients.length > 0) {
      dispatch(orderBurger(ingredients));
    }
  }, [ingredients, dispatch]);

  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  //return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
