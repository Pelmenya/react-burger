import cn from 'classnames';
import ordersList from './orders-list.module.css';
import { OrdersCard } from '../orders-card/orders-card';
import { useLocation } from 'react-router';
import { getOrdersState } from '../../../services/redux/selectors/orders';
import { feedRegExp, profileRegExp } from '../../../utils/regexp';
import { Loader } from '../../loader/loader';
import { useAppSelector } from '../../../hooks/use-app-selector';
import { useEffect, useState } from 'react';
import { Nullable } from '../../../utils/types/nullable';
import { OrdersType } from '../../../utils/types/orders';
export const OrdersList = () => {
  const location = useLocation();
  const isFeed = feedRegExp.test(location.pathname);
  const isProfile = profileRegExp.test(location.pathname);
  const { ordersData } = useAppSelector(getOrdersState);

  const [
    profileOrdersData,
    setProfileOrdersData,
  ] = useState<Nullable<OrdersType>>(null);
  useEffect(
    () => {
      if (isProfile) {
        if (ordersData?.orders) {
          const reversOrders = [
            ...ordersData.orders,
          ];
          setProfileOrdersData({ ...ordersData, orders: reversOrders.reverse() });
        }
      }
    },
    [
      isProfile,
      ordersData,
      profileOrdersData,
    ],
  );

  return (
    <div className={cn(ordersList.list, isProfile && ordersList.list_profile)}>
      {ordersData?.orders && isFeed ? (
        ordersData.orders.map((order) => <OrdersCard key={order._id} {...order} />)
      ) : profileOrdersData && isProfile ? (
        profileOrdersData.orders.map((order) => <OrdersCard key={order._id} {...order} />)
      ) : (
        <Loader />
      )}
    </div>
  );
};
