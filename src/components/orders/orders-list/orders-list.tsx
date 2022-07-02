import cn from 'classnames';
import ordersList from './orders-list.module.css';
import { OrdersCard } from '../orders-card/orders-card';
import { Flex } from '../../flex/flex';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { getOrdersState } from '../../../services/redux/selectors/orders';
import { feedRegExp, profileRegExp } from '../../../utils/regexp';

export const OrdersList = () => {
  const location = useLocation();
  const isFeed = feedRegExp.test(location.pathname)
  const isProfile = profileRegExp.test(location.pathname)

  const { ordersData } = useSelector(getOrdersState);

  return (
    <Flex
      flexDirection='column'
      gap={24}
      className={cn(ordersList.list, isProfile && ordersList.list_profile)}>
      {location.pathname === '/feed' ? (
        ordersData?.orders.map((order) => <OrdersCard key={order._id} {...order} />)
      ) : (
        ordersData?.orders.map((order) => <OrdersCard key={order._id} {...order} />)
      )}
    </Flex>
  );
};
