import React, { useContext } from 'react';
import cn from 'classnames';

import { Flex } from '../flex/flex';
import { Done } from '../done/done';

import orderDetails from './order-details.module.css';
import { BurgerContext } from '../../services/burger-context';

const formatOrderNumber = (num) => {
  let arrNumbers = num.split('');
  while (arrNumbers.length < 6) {
    arrNumbers.unshift('0')
  }
  return arrNumbers.join('');  
}

export const OrderDetails = () => {
  const { burgerState } = useContext(BurgerContext);
  return (
    <Flex flexDirection={'column'} className={orderDetails.wrapper}>
      <p className={cn('text text_type_digits-large', orderDetails.order)}>
        {formatOrderNumber(String(burgerState.order))}
      </p>
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
