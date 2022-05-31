import cn from 'classnames';
import { Flex } from '../flex/flex';
import { Title } from '../title/title';
import ordersStatistics from './orders-statistics.module.css';

export const normalizeTotalCount = (count: number): string => {
  const arr = String(count).split('').reverse();
  const arrResult: string[] = [];
  arr.forEach((item, index) => {
    if (!((index + 1) % 3)) {
      arrResult.push(item);
      arrResult.push(' ');
    } else arrResult.push(item);
  });
  return arrResult.reverse().join('');
};

export const OrdersStatistics = () => {
  return (
    <section className={ordersStatistics.container}>
      <Title className={ordersStatistics.title} type={'h2'}>
        Статистика заказов
      </Title>
      <Flex className={ordersStatistics.wrapper}>
        <Flex flexDirection='column' className={cn('mr-9', ordersStatistics.feed)}>
          <p className='text text_type_main-medium mb-6'>Готовы: </p>
          <Flex flexDirection='column' gap={8}>
            <p
              className={cn(
                'text text_type_digits-default',
                ordersStatistics.text_color_interface,
              )}>
              {'034538'}
            </p>
          </Flex>
        </Flex>
        <Flex flexDirection='column' className={ordersStatistics.feed}>
          <p className='text text_type_main-medium mb-6'>В работе:</p>
          <Flex flexDirection='column' gap={8}>
            <p className='text text_type_digits-default'>{'034538'}</p>
            <p className='text text_type_digits-default'>{'034538'}</p>
            <p className='text text_type_digits-default'>{'034538'}</p>
            <p className='text text_type_digits-default'>{'034538'}</p>
            <p className='text text_type_digits-default'>{'034538'}</p>
          </Flex>
        </Flex>
      </Flex>
      <Flex flexDirection='column' className={ordersStatistics.wrapper}>
        <p className='text text_type_main-medium'>Выполнено за все время:</p>
        <p className='text text_type_digits-large'>{normalizeTotalCount(99225)}</p>
      </Flex>
      <Flex flexDirection='column' className={ordersStatistics.wrapper}>
        <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
        <p className='text text_type_digits-large'>{normalizeTotalCount(1125)}</p>
      </Flex>
    </section>
  );
};
