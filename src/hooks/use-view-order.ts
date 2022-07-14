import { useEffect } from 'react';
import { getOrdersState } from '../services/redux/selectors/orders';
import { setViewOrder } from '../services/redux/slices/orders/orders';
import { useAppDispatch } from './use-app-dispatch';
import { useAppSelector } from './use-app-selector';

export const useViewOrder = (id: string | undefined) => {
  const dispatch = useAppDispatch();
  const { ordersData } = useAppSelector(getOrdersState);

  useEffect(
    () => {
      if (id && ordersData) {
        dispatch(setViewOrder(ordersData.orders.find((item) => item._id === id)));
      }
    },
    [
      id,
      ordersData,
      dispatch,
    ],
  );
};
