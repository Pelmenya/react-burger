import cn from 'classnames';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { OrdersStatistics } from '../../components/orders-statistics/orders-statistics';
import { Orders } from '../../components/orders/orders';
import { Title } from '../../components/title/title';
import { useNavHeader } from '../../hooks/use-nav-header';
import { wsInitAllOrders } from '../../services/redux/slices/orders';
import ordersPage from '../main-page/main-page.module.css';

export const OrdersPage = () => {
  const { setActive } = useNavHeader();
  const dispatch = useDispatch();
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
      dispatch(wsInitAllOrders('Привет'));
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
