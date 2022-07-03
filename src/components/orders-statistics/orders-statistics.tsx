import cn from 'classnames';
import { useSelector } from 'react-redux';
import { getOrdersState } from '../../services/redux/selectors/orders';
import { maxCountOrdersInFeed } from '../../utils/constants';
import { normalizeTotalCount } from '../../utils/functions/normalizeTotalCount';
import { Flex } from '../flex/flex';
import { Title } from '../title/title';
import ordersStatistics from './orders-statistics.module.css';

export const OrdersStatistics = () => {
  const { ordersData } = useSelector(getOrdersState);

  return (
    <section className={ordersStatistics.container}>
      <Title className={ordersStatistics.title} type={'h2'}>
        Статистика заказов
      </Title>
      <Flex className={ordersStatistics.wrapper}>
        <Flex flexDirection='column' className={cn('mr-9', ordersStatistics.feed)}>
          <p className='text text_type_main-medium mb-6'>Готовы: </p>
          <Flex className={ordersStatistics.orders} flexDirection='column' gap={8}>
            {ordersData?.orders
              .filter((order) => order.status === 'done')
              .splice(0, maxCountOrdersInFeed)
              .map((order) => (
                <p key={order._id} className={'text text_type_digits-default text_color_interface'}>
                  {order.number}
                </p>
              ))}
          </Flex>
        </Flex>
        <Flex flexDirection='column' className={ordersStatistics.feed}>
          <p className='text text_type_main-medium mb-6'>В работе:</p>
          <Flex className={ordersStatistics.orders} flexDirection='column' gap={8}>
            {ordersData?.orders
              .filter((order) => order.status !== 'done')
              .splice(0, maxCountOrdersInFeed)
              .map((order) => (
                <p key={order._id} className={'text text_type_digits-default'}>
                  {order.number}
                </p>
              ))}
          </Flex>
        </Flex>
      </Flex>
      <Flex flexDirection='column' className={ordersStatistics.wrapper}>
        <p className='text text_type_main-medium'>Выполнено за все время:</p>
        <p className='text text_type_digits-large'>{normalizeTotalCount(ordersData?.total)}</p>
      </Flex>
      <Flex flexDirection='column' className={ordersStatistics.wrapper}>
        <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
        <p className='text text_type_digits-large'>{normalizeTotalCount(ordersData?.totalToday)}</p>
      </Flex>
    </section>
  );
};
