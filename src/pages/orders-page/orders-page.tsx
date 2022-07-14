import cn from 'classnames';
import { useEffect } from 'react';
import { OrdersStatistics } from '../../components/orders-statistics/orders-statistics';
import { Orders } from '../../components/orders/orders';
import { Title } from '../../components/title/title';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useNavHeader } from '../../hooks/use-nav-header';
import { wsClose, wsInit } from '../../services/redux/slices/orders/orders';
import { ALL_ORDERS, SOCKET } from '../../utils/api-constants/ws';
import ordersPage from '../main-page/main-page.module.css';

export const OrdersPage = () => {
  const { setActive } = useNavHeader();
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      setActive('feed');
    },
    [
      setActive,
    ],
  );

  useEffect(
    () => {
        dispatch(wsInit(`${SOCKET}${ALL_ORDERS}`));
        return () => {
          dispatch(wsClose());
      }
    },
    [
      dispatch,
    ],
  );

  return (
    <main className={ordersPage.main}>
      <Title type={'h1'} className={cn('pt-10 pb-5', ordersPage.title)}>
        Лента заказов
      </Title>
      <aside className={ordersPage.main__content}>
        <Orders />
        <OrdersStatistics />
      </aside>
    </main>
  );
};
