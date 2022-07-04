import cn from 'classnames';
import { useEffect } from 'react';
import { OrdersStatistics } from '../../components/orders-statistics/orders-statistics';
import { Orders } from '../../components/orders/orders';
import { Title } from '../../components/title/title';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useNavHeader } from '../../hooks/use-nav-header';
import { getOrdersState } from '../../services/redux/selectors/orders';
import { wsInitAllOrders } from '../../services/redux/slices/orders';
import ordersPage from '../main-page/main-page.module.css';

export const OrdersPage = () => {
  const { setActive } = useNavHeader();
  const { socketAll } = useAppSelector(getOrdersState);

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
      if (!socketAll) dispatch(wsInitAllOrders());
    },
    [
      dispatch,
      socketAll,
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
