import cn from 'classnames';
import ordersList from './orders-list.module.css';
import { OrdersCard } from '../orders-card/orders-card';
import { Flex } from '../../flex/flex';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { getOrdersState } from '../../../services/redux/selectors/orders';
import {feedRegExp, profileRegExp } from '../../../utils/regexp';
import { Loader } from '../../loader/loader';

export const OrdersList = () => {
  const location = useLocation();
  const isFeed = feedRegExp.test(location.pathname);
  const isProfile = profileRegExp.test(location.pathname)

  const { ordersData, socket } = useSelector(getOrdersState);
  

  return (
    <Flex
      flexDirection='column'
      gap={24}
      className={cn(ordersList.list, isProfile && ordersList.list_profile)}>
      { isFeed && socket === 'all-orders' ? (
        ordersData?.orders.map((order) => <OrdersCard key={order._id} {...order} />)
      ) : isProfile && socket === 'user-orders' ? (
        ordersData?.orders.map((order) => <OrdersCard key={order._id} {...order} />)
      ): <Loader />}
    </Flex>
  );
};
