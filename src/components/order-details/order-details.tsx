import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { Flex } from '../flex/flex';
import { Done } from '../done/done';

import orderDetails from './order-details.module.css';
import { getOrderState } from '../../services/redux/selectors/order';
import { Loader } from '../loader/loader';
import { BadRequest } from '../bad-request/bad-request';

export const OrderDetails = () => {
  const { num, error, loading } = useSelector(getOrderState);

  const formatOrderNumber = useCallback((numOrder: string) => {
    let arrNumbers = numOrder.split('');
    while (arrNumbers.length < 6) {
      arrNumbers.unshift('0');
    }
    return arrNumbers.join('');
  }, []);

  return (
    <Flex flexDirection={'column'} className={orderDetails.wrapper}>
      <>
        {loading === 'pending' && <Loader />}
        {loading === 'succeeded' && (
          <p className={cn('text text_type_digits-large', orderDetails.order)}>
            {formatOrderNumber(String(num))}
          </p>
        )}
        {loading === 'failed' && <BadRequest error={error} />}
      </>
      <p className={cn('text text_type_main-medium mt-8 mb-15', orderDetails.order)}>
        идентификатор заказа
      </p>
      <Done />
      <p className={cn('text text_type_main-default mt-15 mb-2', orderDetails.order)}>
        Ваш заказ начали готовить
      </p>
      <p
        className={cn(
          'text text_type_main-default mb-15',
          orderDetails.order,
          orderDetails.order_color,
        )}>
        Дождитесь готовности на орбитальной станции
      </p>
    </Flex>
  );
};
