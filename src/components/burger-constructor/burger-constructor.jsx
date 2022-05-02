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
import { BurgerConstructorEmpty } from './components/burger-constructor-empty/burger-constructor-empty';
import { useDrop } from 'react-dnd';
import shortid from 'shortid';
import { useDispatch, useSelector } from 'react-redux';
import { getBurgerConstructorState } from '../../services/redux/selectors/burger-constructor';
import { setBun, setToppings } from '../../services/redux/slices/burger-constructor';
import { setIngredientsIds, setOrderTotal } from '../../services/redux/slices/order';
import { updateCountIngredient } from '../../services/redux/slices/burger-ingredients';
import { getBurgerIngredientsState } from '../../services/redux/selectors/burger-ingredients';
import { maxCountBuns } from '../../utils/constants';
import { getOrderState } from '../../services/redux/selectors/order';

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(getBurgerIngredientsState);
  const { bun, toppings } = useSelector(getBurgerConstructorState);
  const { total } = useSelector(getOrderState);

  const { burgerState, burgerDispatcher } = useContext(BurgerContext);

  const dropIngredient = (ingredient) => {
    if (ingredient.type === 'bun') {
      if (ingredient._id !== bun?._id) {
        dispatch(setBun({ ...ingredient, innerId: shortid.generate() }));
        dispatch(
          updateCountIngredient(
            ingredients.map((item) => {
              if (item._id === ingredient._id) {
                return { ...item, count: maxCountBuns };
              }
              if (item.type === 'bun') {
                return { ...item, count: 0 };
              }
              return item;
            }),
          ),
        );
        let idsArr = [
          ingredient._id,
        ];
        let totalCost = maxCountBuns * ingredient.price;
        if (toppings.length)
          idsArr = [
            ...idsArr,
            ...toppings.map((item) => {
              totalCost = totalCost + item.price;
              return item._id;
            }),
          ];
        idsArr = [
          ...idsArr,
          ingredient._id,
        ];
        dispatch(setIngredientsIds(idsArr));
        dispatch(setOrderTotal(totalCost));
      }
    } else {
      dispatch(
        setToppings([
          ...toppings,
          { ...ingredient, innerId: shortid.generate() },
        ]),
      );
      dispatch(
        updateCountIngredient(
          ingredients.map((item) => {
            if (item._id === ingredient._id) {
              if (item.count) {
                return { ...item, count: item.count + 1 };
              }
              return { ...item, count: 1 };
            }
            return item;
          }),
        ),
      );
      let idsArr = [];
      let totalCost = ingredient.price;
      if (toppings.length)
        idsArr = [
          ...idsArr,
          ...toppings.map((item) => {
            totalCost = totalCost + item.price;
            return item._id;
          }),
        ];
      if (bun) {
        idsArr.unshift(bun._id);
        idsArr.push(bun._id);
        totalCost = totalCost + maxCountBuns * bun.price;
      }
      dispatch(setIngredientsIds(idsArr));
      dispatch(setOrderTotal(totalCost));
    }
  };

  const [
    { isHover },
    dropRef,
  ] = useDrop({
    accept: 'ingredient',
    drop: dropIngredient,
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

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
      <div
        className={
          isHover ? (
            cn(burgerConstructor.constructor, burgerConstructor.constructor_hover)
          ) : (
            burgerConstructor.constructor
          )
        }
        ref={dropRef}>
        <Flex flexDirection='column' className={burgerConstructor.constructor__container}>
          {!bun && !toppings.length && <BurgerConstructorEmpty />}
          {bun && <BurgerConstructorCard ingredient={bun} type='top' isLocked={true} />}
          {toppings && <BurgerConstructorToppingsList ingredients={toppings} />}
          {bun && <BurgerConstructorCard ingredient={bun} type='bottom' isLocked={true} />}
        </Flex>
        <Flex
          flexDirection='column'
          className={cn('pt-10 pr-3', burgerConstructor.constructor__container)}>
          <Flex>
            <div className='constructor-element__price text_type_digits-medium mr-10'>
              {total}
              <div className={burgerConstructor.currency}>
                <CurrencyIcon type='primary' />
              </div>
            </div>
            <Button
              type='primary'
              size='large'
              onClick={handlerOnOpenModal}
              disabled={!bun && !toppings.length}>
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
