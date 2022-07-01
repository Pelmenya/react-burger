import React, { useEffect } from 'react';
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
import { JWT_EXPIRED } from '../../utils/constants';
import { postToken } from '../../services/redux/slices/auth';
import { postOrders } from '../../services/redux/slices/order';
import { getAuthState } from '../../services/redux/selectors/auth';

export const OrderDetails = () => {
  const { num, error, loading, ingredientsIds } = useSelector(getOrderState);
  const { loading: loadingToken } = useSelector(getAuthState);
  const dispatch = useDispatch<DispatchType>();
  const refreshToken = localStorage.getItem('refreshToken')
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    if (loading === 'succeeded') { 
      dispatch(resetBurgerConstructor());
      dispatch(resetCountIngredients());
    }

    if (loading === 'failed') { 
      if  (error === JWT_EXPIRED) {
        dispatch(postToken(refreshToken));
          if (accessToken && loadingToken === 'succeeded') { 
            dispatch(postOrders({ingredientsIds: ingredientsIds, token: accessToken}))
          }
      }
    }

  }, [loading, dispatch, refreshToken, accessToken, error, ingredientsIds, loadingToken]);

  return (
    <Flex flexDirection={'column'} className={orderDetails.wrapper}>
      <>
        {(loading === 'pending' || error === JWT_EXPIRED) && <Loader />}
        {loading === 'succeeded' && (
          <p className={cn('text text_type_digits-large', orderDetails.order)}>
            {formatOrderNumber(String(num))}
          </p>
        )}
        {(loading === 'failed' && error !== JWT_EXPIRED) && <BadRequest error={error} />}
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
