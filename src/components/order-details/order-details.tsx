import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { Flex } from '../flex/flex';
import { Done } from '../done/done';

import orderDetails from './order-details.module.css';
import { getOrderState } from '../../services/redux/selectors/order';
import { Loader } from '../loader/loader';
import { BadRequest } from '../bad-request/bad-request';
import { DispatchType } from '../../utils/types/dispatch-type';
import { resetBurgerConstructor } from '../../services/redux/slices/burger-constructor';
import { resetCountIngredients } from '../../services/redux/slices/burger-ingredients';
import { formatOrderNumber } from '../../utils/functions/formatOrderNumber';

export const OrderDetails = () => {
  const { num, error, loading } = useSelector(getOrderState);
  const dispatch = useDispatch<DispatchType>();

  useEffect(() => {
    if (loading === 'succeeded') { 
      dispatch(resetBurgerConstructor());
      dispatch(resetCountIngredients());
    }
  }, [loading, dispatch]);

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
