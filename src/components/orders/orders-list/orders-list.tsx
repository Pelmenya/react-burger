import cn from 'classnames';
import ordersList from './orders-list.module.css';
import { OrdersCard } from '../orders-card/orders-card';
import { Flex } from '../../flex/flex';
import { useLocation } from 'react-router';
import { getOrdersState } from '../../../services/redux/selectors/orders';
import { feedRegExp, profileRegExp } from '../../../utils/regexp';
import { Loader } from '../../loader/loader';
import { useAppSelector } from '../../../hooks/use-app-selector';

export const OrdersList = () => {
  const location = useLocation();
  const isFeed = feedRegExp.test(location.pathname);
  const isProfile = profileRegExp.test(location.pathname);
  const { ordersData, ordersUserData } = useAppSelector(getOrdersState);

  return (
    <Flex
      flexDirection='column'
      gap={24}
      className={cn(ordersList.list, isProfile && ordersList.list_profile)}>
      {isFeed && ordersData ? (
        ordersData.orders.map((order) => <OrdersCard key={order._id} {...order} />)
      ) : isProfile && ordersUserData ? (
        ordersUserData.orders.map((order) => <OrdersCard key={order._id} {...order} />)
      ) : (
        <Loader />
      )}
    </Flex>
  );
};
