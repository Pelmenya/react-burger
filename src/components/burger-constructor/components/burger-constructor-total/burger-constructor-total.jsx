import React, { useCallback, useEffect } from 'react';
import cn from 'classnames';

import burgerConstructorTotal from './burger-constructor-total.module.css';
import { Flex } from '../../../flex/flex';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  postOrders,
  setIngredientsIds,
  setOpenOrderModal,
  setOrderTotal,
} from '../../../../services/redux/slices/order';
import { getOrderState } from '../../../../services/redux/selectors/order';
import { useTotalCostOrder } from '../../../../hooks/useTotalCostOrder';
import { useIngredientsIds } from '../../../../hooks/useIngredientsIds';

export const BurgerConstructorTotal = () => {
  const dispatch = useDispatch();
  const { total } = useSelector(getOrderState);

  const { totalCost } = useTotalCostOrder();
  const { orderIngredientsIds } = useIngredientsIds();

  const handlerOnOpenModal = useCallback(
    () => {
      dispatch(setOpenOrderModal(true));
      dispatch(setIngredientsIds(orderIngredientsIds));
      dispatch(postOrders({ ingredients: orderIngredientsIds }));
    },
    [
      orderIngredientsIds,
      dispatch,
    ],
  );

	useEffect(
    () => {
      dispatch(setOrderTotal(totalCost));
    },
    [
      totalCost,
      dispatch,
    ],
  );

  return (
    <Flex
      flexDirection='column'
      className={cn('pt-10 pr-3', burgerConstructorTotal.constructor__container)}>
      <Flex>
        <div className='constructor-element__price text_type_digits-medium mr-10'>
          {total}
          <div className={burgerConstructorTotal.currency}>
            <CurrencyIcon type='primary' />
          </div>
        </div>
        <Button type='primary' size='large' onClick={handlerOnOpenModal} disabled={!total}>
          Оформить заказ
        </Button>
      </Flex>
    </Flex>
  );
};
