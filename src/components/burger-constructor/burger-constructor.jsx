import React, { useCallback, useContext, useMemo, useState } from 'react';
import cn from 'classnames';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Flex } from '../flex/flex';
import { BurgerConstructorCard } from './components/burger-constructor-card/burger-constructor-card';
import { BurgerConstructorToppingsList } from './components/burger-constructor-toppings-list/burger-constructor-toppings-list';
import { Title } from '../title/title';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { BurgerConstructorContext } from '../../services/burger-constructor-context';
import { ordersAPI } from '../../api/orders-api';

import burgerConstructor from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const { burgerConstructorState, burgerConstructorDispatcher } = useContext(
    BurgerConstructorContext,
  );

  const [
    isOpenModalOrder,
    setIsOpenModalOrder,
  ] = useState(false);

  const getBody = useMemo(
    () => {
      let body = { ingredients: [] };
      if (burgerConstructorState.bun) {
        body.ingredients.push(burgerConstructorState.bun._id);
        if (burgerConstructorState.toppings.length) {
          body.ingredients = [
            ...body.ingredients,
            ...burgerConstructorState.toppings.map((topping) => topping._id),
          ];
        }
        body.ingredients.push(burgerConstructorState.bun._id);
      } else {
        if (burgerConstructorState.toppings.length) {
          body.ingredients = [
            ...body.ingredients,
            ...burgerConstructorState.toppings.map((topping) => topping._id),
          ];
        }
      }
      return body;
    },
    [
      burgerConstructorState.bun,
      burgerConstructorState.toppings,
    ],
  );

  const handlerOnCloseModal = () => setIsOpenModalOrder(false);
  const handlerOnOpenModal = useCallback(
    () => {
      ordersAPI
        .postOrders(getBody)
        .then((data) =>
          burgerConstructorDispatcher({ type: 'SET_ORDER', payload: data.order.number }),
        )
        .then(() => setIsOpenModalOrder(true));
    },
    [
      getBody,
      burgerConstructorDispatcher,
    ],
  );

  return (
    <section className={burgerConstructor.section}>
      <Title type='h2' className={burgerConstructor.title}>
        Конструктор бургера
      </Title>
      <div className={burgerConstructor.constructor}>
        <Flex flexDirection='column' className={burgerConstructor.constructor__container}>
          {burgerConstructorState.bun && (
            <BurgerConstructorCard
              ingredient={burgerConstructorState.bun}
              type='top'
              isLocked={true}
            />
          )}
          <BurgerConstructorToppingsList ingredients={burgerConstructorState.toppings} />
          {burgerConstructorState.bun && (
            <BurgerConstructorCard
              ingredient={burgerConstructorState.bun}
              type='bottom'
              isLocked={true}
            />
          )}
        </Flex>
        <Flex
          flexDirection='column'
          className={cn('pt-10 pr-3', burgerConstructor.constructor__container)}>
          <Flex>
            <div className='constructor-element__price text_type_digits-medium mr-10'>
              {burgerConstructorState.total}
              <div className={burgerConstructor.currency}>
                <CurrencyIcon type='primary' />
              </div>
            </div>
            <Button
              type='primary'
              size='large'
              onClick={handlerOnOpenModal}
              disabled={!burgerConstructorState.bun && !burgerConstructorState.toppings.length}>
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