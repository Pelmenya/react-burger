import React, { useCallback, useEffect } from 'react';
import cn from 'classnames';

import burgerConstructorTotal from './burger-constructor-total.module.css';
import { Flex } from '../../../flex/flex';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  postOrders,
  setIngredientsIds,
  setOpenOrderModal,
  setOrderTotal,
} from '../../../../services/redux/slices/order';
import { getOrderState } from '../../../../services/redux/selectors/order';
import { useTotalCostOrder } from '../../../../hooks/use-total-cost-order';
import { useIngredientsIds } from '../../../../hooks/use-ingredients-ids';
import { ButtonWithChildren } from '../../../button-with-children/button-with-children';
import { getProfileState } from '../../../../services/redux/selectors/profile';
import { useLocation, useNavigate } from 'react-router';
import { useAppDispatch } from '../../../../hooks/use-app-dispatch';
import { useAppSelector } from '../../../../hooks/use-app-selector';

export const BurgerConstructorTotal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { total, loading } = useAppSelector(getOrderState);
  const { user } = useAppSelector(getProfileState);

  const accessToken = localStorage.getItem('accessToken');
  const location = useLocation();

  const { totalCost } = useTotalCostOrder();
  const { orderIngredientsIds } = useIngredientsIds();

  const handlerOnOpenModal = useCallback(
    () => {
      if (user) {
        dispatch(setOpenOrderModal(true));
        dispatch(setIngredientsIds([...orderIngredientsIds]));
        if (accessToken) {
          dispatch(
            postOrders({
              ingredientsIds: [...orderIngredientsIds],
              token: accessToken,
            }),
          );
        }
      } else navigate('login', { state: { from: location } });
    },
    [
      user,
      orderIngredientsIds,
      navigate,
      dispatch,
      location,
      accessToken,
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
        <ButtonWithChildren
          type='primary'
          size='large'
          onClick={handlerOnOpenModal}
          loading={loading === 'pending'}
          disabled={!total}>
          <span>Оформить заказ</span>
        </ButtonWithChildren>
      </Flex>
    </Flex>
  );
};
