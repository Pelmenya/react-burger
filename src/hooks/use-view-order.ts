import { useEffect } from 'react';
import { getOrdersState } from '../services/redux/selectors/orders';
import { setViewOrder } from '../services/redux/slices/orders';
import { OrderType } from '../utils/types/orders';
import { useAppDispatch } from './use-app-dispatch';
import { useAppSelector } from './use-app-selector';

export const useViewOrder = (id: string | undefined, isFeed: boolean, isProfile: boolean) => {
  const dispatch = useAppDispatch();
  const { ordersData, ordersUserData } = useAppSelector(getOrdersState);

  useEffect(
    () => {
      if (id && (ordersData || ordersUserData)) {
        let order: OrderType | undefined = undefined;
        if (isFeed) {
          order = ordersData?.orders.find((item) => item._id === id);
        }
        if (isProfile) {
          order = ordersUserData?.orders.find((item) => item._id === id);
        }
        if (order) {
          dispatch(setViewOrder(order));
        }
      }
    },
    [
      id,
      ordersData,
      ordersUserData,
      dispatch,
      isFeed,
      isProfile,
    ],
  );
};
