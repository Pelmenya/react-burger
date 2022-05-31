import { mock } from './mock';
import ordersList from './orders-list.module.css';
import { OrdersCard } from '../orders-card/orders-card';
import { Flex } from '../../flex/flex';

export const OrdersList = () => {
  return (
    <Flex flexDirection='column' gap={24}className={ordersList.list}>
      {mock.map((order) => <OrdersCard key={order._id} order={order}/>)}
    </Flex>
  );
};
