import React, { useCallback, useContext, useMemo, useState } from 'react';
import cn from 'classnames';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Flex } from '../flex/flex';
import { BurgerConstructorCard } from './components/burger-constructor-card/burger-constructor-card';
import { BurgerConstructorToppingsList } from './components/burger-constructor-toppings-list/burger-constructor-toppings-list';
import { Title } from '../title/title';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { BurgerContext } from '../../services/burger-context';
import { ordersAPI } from '../../api/orders-api';

import burgerConstructor from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const { burgerState, burgerDispatcher } = useContext(BurgerContext);

  const [
    isOpenModalOrder,
    setIsOpenModalOrder,
  ] = useState(false);

  const getBody = useMemo(
    () => {
      let body = { ingredients: [] };
      if (burgerState.bun) {
        body.ingredients.push(burgerState.bun._id);
        if (burgerState.toppings.length) {
          body.ingredients = [
            ...body.ingredients,
            ...burgerState.toppings.map((topping) => topping._id),
          ];
        }
        body.ingredients.push(burgerState.bun._id);
      } else {
        if (burgerState.toppings.length) {
          body.ingredients = [
            ...body.ingredients,
            ...burgerState.toppings.map((topping) => topping._id),
          ];
        }
      }
      return body;
    },
    [
      burgerState.bun,
      burgerState.toppings,
    ],
  );

  const handlerOnCloseModal = () => setIsOpenModalOrder(false);
  const handlerOnOpenModal = useCallback(
    () => {
      ordersAPI
        .postOrders(getBody)
        .then((data) => burgerDispatcher({ type: 'SET_ORDER', payload: data.order.number }))
        .then(() => setIsOpenModalOrder(true))
        .catch((err) => console.log(err));
    },
    [
      getBody,
      burgerDispatcher,
    ],
  );

  return (
    <section className={burgerConstructor.section}>
      <Title type='h2' className={burgerConstructor.title}>
        Конструктор бургера
      </Title>
      <div className={burgerConstructor.constructor}>
        <Flex flexDirection='column' className={burgerConstructor.constructor__container}>
          {burgerState.bun && (
            <BurgerConstructorCard ingredient={burgerState.bun} type='top' isLocked={true} />
          )}
          <BurgerConstructorToppingsList ingredients={burgerState.toppings} />
          {burgerState.bun && (
            <BurgerConstructorCard ingredient={burgerState.bun} type='bottom' isLocked={true} />
          )}
        </Flex>
        <Flex
          flexDirection='column'
          className={cn('pt-10 pr-3', burgerConstructor.constructor__container)}>
          <Flex>
            <div className='constructor-element__price text_type_digits-medium mr-10'>
              {burgerState.total}
              <div className={burgerConstructor.currency}>
                <CurrencyIcon type='primary' />
              </div>
            </div>
            <Button
              type='primary'
              size='large'
              onClick={handlerOnOpenModal}
              disabled={!burgerState.bun && !burgerState.toppings.length}>
              Оформить заказ
            </Button>
          </Flex>
        </Flex>
      </div>
      {isOpenModalOrder && (
        <Modal handlerOnClose={handlerOnCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
