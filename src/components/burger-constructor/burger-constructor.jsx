import React, { useState } from 'react';
import cn from 'classnames';

import burgerConstructor from './burger-constructor.module.css';
import { Flex } from '../flex/flex';
import { BurgerConstructorCard } from './components/burger-constructor-card/burger-constructor-card';
import { BurgerConstructorToppingsList } from './components/burger-constructor-toppings-list/burger-constructor-toppings-list';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { dataType } from '../../utils/prop-types/data-types';
import { Title } from '../title/title';
import { Modal } from '../modal/modal';

export const BurgerConstructor = ({ data }) => {
  const [
    isOpenModalIngredient,
    setIsOpenModalIngredient,
  ] = useState(false);

  const handlerOnCloseModal = () => setIsOpenModalIngredient(false);
  const handlerOnOpenModal =() => setIsOpenModalIngredient(true);

  return (
    <section className={burgerConstructor.section}>
      <Title type={'h2'} className={burgerConstructor.title}>
        Конструктор бургера
      </Title>
      <div className={cn('custom-scroll', burgerConstructor.constructor)}>
        <Flex flexDirection='column' className={burgerConstructor.constructor__container}>
          <BurgerConstructorCard
            data={data.find((item) => item.name === 'Краторная булка N-200i')}
            type={'top'}
            isLocked={true}
          />
          <BurgerConstructorToppingsList data={data.filter((item) => item.type !== 'bun')} />
          <BurgerConstructorCard
            data={data.find((item) => item.name === 'Краторная булка N-200i')}
            type={'bottom'}
            isLocked={true}
          />
        </Flex>
        <Flex
          flexDirection='column'
          className={cn('pt-5 pb-5 pr-3', burgerConstructor.constructor__container)}>
          <Flex>
            <div className='constructor-element__price text_type_digits-medium mr-10'>
              {data.reduce((acc, item) => acc + item.price, 0)}
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
      {isOpenModalIngredient && <Modal handlerOnClose={handlerOnCloseModal} />}
    </section>
  );
};

BurgerConstructor.propTypes = dataType;
