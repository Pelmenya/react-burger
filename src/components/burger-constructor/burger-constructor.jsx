import React, { useState } from 'react';
import cn from 'classnames';

import burgerConstructor from './burger-constructor.module.css';
import { Flex } from '../flex/flex';
import { BurgerConstructorCard } from './components/burger-constructor-card/burger-constructor-card';
import { BurgerConstructorToppingsList } from './components/burger-constructor-toppings-list/burger-constructor-toppings-list';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsType } from '../../utils/prop-types/ingredients-types';
import { Title } from '../title/title';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../../order-details/order-details';

export const BurgerConstructor = ({ ingredients }) => {
  const [
    isOpenModalOrder,
    setIsOpenModalOrder,
  ] = useState(false);

  const handlerOnCloseModal = () => setIsOpenModalOrder(false);
  const handlerOnOpenModal = () => setIsOpenModalOrder(true);

  return (
    <section className={burgerConstructor.section}>
      <Title type={'h2'} className={burgerConstructor.title}>
        Конструктор бургера
      </Title>
      <div className={cn('custom-scroll', burgerConstructor.constructor)}>
        <Flex flexDirection='column' className={burgerConstructor.constructor__container}>
          <BurgerConstructorCard
            ingredient={ingredients.find((item) => item._id === '60d3b41abdacab0026a733c6')}
            type={'top'}
            isLocked={true}
          />
          <BurgerConstructorToppingsList ingredients={ingredients.filter((item) => item.type !== 'bun')} />
          <BurgerConstructorCard
            ingredient={ingredients.find((item) => item._id === '60d3b41abdacab0026a733c6')}
            type={'bottom'}
            isLocked={true}
          />
        </Flex>
        <Flex
          flexDirection='column'
          className={cn('pt-10 pb-15 pr-3', burgerConstructor.constructor__container)}>
          <Flex>
            <div className='constructor-element__price text_type_digits-medium mr-10'>
              {ingredients.reduce((acc, item) => acc + item.price, 0)}
              <div className={burgerConstructor.currency}>
                <CurrencyIcon type='primary' />
              </div>
            </div>
            <Button type='primary' size='large' onClick={handlerOnOpenModal}>
              Оформить заказ
            </Button>
          </Flex>
        </Flex>
      </div>
      {isOpenModalOrder && (
        <Modal handlerOnClose={handlerOnCloseModal}>
          <OrderDetails order={'034536'}/>
        </Modal>
      )}
    </section>
  );
};

BurgerConstructor.propTypes = ingredientsType;
