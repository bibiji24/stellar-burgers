import { getFeedsOrdersSelector } from '@selectors';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getAllFeeds } from '../../services/slices/feedsSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(getFeedsOrdersSelector);
  const dispatch = useDispatch();

  const getFeeds = () => {
    dispatch(getAllFeeds());
  };

  useEffect(() => {
    getFeeds();
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={getFeeds} />;
};
