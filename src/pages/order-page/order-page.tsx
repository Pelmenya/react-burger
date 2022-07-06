import { useEffect } from 'react';
import cn from 'classnames';
import { useLocation, useParams } from 'react-router';
import { Order } from '../../components/order/order';
import { Title } from '../../components/title/title';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useViewOrder } from '../../hooks/use-view-order';
import { getOrdersState } from '../../services/redux/selectors/orders';
import { wsClose, wsInit } from '../../services/redux/slices/orders';
import { feedRegExp, profileRegExp } from '../../utils/regexp';
import orderPage from './order-page.module.css';
import { formatOrderNumber } from '../../utils/functions/format-order-number';
import { ALL_ORDERS, SOCKET } from '../../utils/api-constants/ws';
import { getProfileState } from '../../services/redux/selectors/profile';
import { Loader } from '../../components/loader/loader';

export const OrderPage = () => {
  const { viewOrder } = useAppSelector(getOrdersState);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getProfileState);

  const isFeed = feedRegExp.test(location.pathname);
  const isProfile = profileRegExp.test(location.pathname);
  const { id } = useParams();

  const accessToken = localStorage.getItem('accessToken')?.split(' ')[1];

  useEffect(
    () => {
      if (isFeed) {
        dispatch(wsInit(`${SOCKET}${ALL_ORDERS}`));
        return () => {
          dispatch(wsClose());
        };
      }
    },
    [
      dispatch,
      isFeed,
    ],
  );

  useEffect(
    () => {
      if (user && isProfile) {
        dispatch(wsInit(`${SOCKET}?token=${accessToken}`));
        return () => {
          dispatch(wsClose());
        };
      }
    },
    [
      dispatch,
      accessToken,
      user,
      isProfile,
    ],
  );

  useViewOrder(id);

  return (
    <main className='pt-20'>
      {viewOrder ? (
        <>
          <Title type='h1'>
            <span className={cn('text text_type_digits-default mb-10', orderPage.title)}>
              #{viewOrder && formatOrderNumber(String(viewOrder.number))}
            </span>
          </Title>
          <Order />
        </>
      ) : (
        <Loader />
      )}
    </main>
  );
};
