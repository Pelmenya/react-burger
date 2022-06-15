import cn from 'classnames'
import { mock } from './mock';
import ordersList from './orders-list.module.css';
import { OrdersCard } from '../orders-card/orders-card';
import { Flex } from '../../flex/flex';
import { useLocation } from 'react-router';

export const OrdersList = () => {
  const location = useLocation();
  return (
    <Flex flexDirection='column' gap={24}className={cn(ordersList.list, location.pathname !=='/feed' && ordersList.list_profile)}>
      {mock.map((order) => <OrdersCard key={order._id} order={order}/>)}
    </Flex>
  );
};
