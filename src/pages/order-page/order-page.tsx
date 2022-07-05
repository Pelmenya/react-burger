import { useEffect } from 'react';
import cn from 'classnames';
import { useLocation, useParams } from 'react-router';
import { Order } from '../../components/order/order';
import { Title } from '../../components/title/title';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useViewOrder } from '../../hooks/use-view-order';
import { getOrdersState } from '../../services/redux/selectors/orders';
import { wsInitAllOrders, wsInitUserOrders } from '../../services/redux/slices/orders';
import { feedRegExp, profileRegExp } from '../../utils/regexp';
import orderPage from './order-page.module.css';
import { formatOrderNumber } from '../../utils/functions/format-order-number';

export const OrderPage = () => {
  const { viewOrder } = useAppSelector(getOrdersState);
  const location = useLocation();
  const { socketUser, socketAll } = useAppSelector(getOrdersState);
  const dispatch = useAppDispatch();
  const isFeed = feedRegExp.test(location.pathname);
  const isProfile = profileRegExp.test(location.pathname);
  const { id } = useParams();

  useEffect(
    () => {
      if (!socketUser && isProfile) {
        dispatch(wsInitUserOrders());
      }
    },
    [
      dispatch,
      socketUser,
      isProfile,
    ],
  );

  useEffect(
    () => {
      if (!socketAll && isFeed) {
        dispatch(wsInitAllOrders());
      }
    },
    [
      dispatch,
      socketAll,
      isFeed,
    ],
  );

  useViewOrder(id, isFeed, isProfile);

  return (
    <main className='pt-20'>
      <Title type='h1'>
        <span className={cn('text text_type_digits-default mb-10', orderPage.title)}>
          #{viewOrder && formatOrderNumber(String(viewOrder.number))}
        </span>
      </Title>
      <Order />
    </main>
  );
};
