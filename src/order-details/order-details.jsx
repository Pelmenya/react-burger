import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Flex } from '../components/flex/flex';
import { Done } from '../components/done/done';

import orderDetails from './order-details.module.css';

export const OrderDetails = ({ order }) => (
  <Flex flexDirection={'column'} className={orderDetails.wrapper}>
    <p className={cn('text text_type_digits-large', orderDetails.order)}>{order}</p>
    <p className={cn('text text_type_main-medium mt-8 mb-15', orderDetails.order)}>
      идентификатор заказа
    </p>
    <Done />
    <p className={cn('text text_type_main-default mt-15 mb-2', orderDetails.order)}>
      Ваш заказ начали готовить
    </p>
    <p className={cn('text text_type_main-default mb-15', orderDetails.order, orderDetails.order_color)}>
      Дождитесь готовности на орбитальной станции
    </p>
  </Flex>
);

OrderDetails.propTypes = {
  order: PropTypes.string.isRequired,
};
