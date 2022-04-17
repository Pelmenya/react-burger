import React from 'react';
import cn from 'classnames';

import burgerConstructor from './burger-constructor.module.css';
import { Flex } from '../flex/flex';
import { BurgerConstructorCard } from './components/burger-constructor-card/burger-constructor-card';

import { data } from '../../utils/data';
import { BurgerConstructorToppngsList } from './components/burger-constructor-toppings-list/burger-constructor-toppings-list';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Spacer } from '../spacer/spacer';

export const BurgerConstructor = () => (
  <section>
    <Spacer spaceHeight={100}/>
    <div className={cn('custom-scroll', burgerConstructor.constructor)}>
      <Flex
        flexDirection='column'
        className={burgerConstructor.constructor__container}>
        <BurgerConstructorCard
          data={data.find((item) => item.name === 'Краторная булка N-200i')}
          type={'top'}
          isLocked={true}
        />
        <BurgerConstructorToppngsList data={data.filter((item) => item.type !== 'bun')} />
        <BurgerConstructorCard
          data={data.find((item) => item.name === 'Краторная булка N-200i')}
          type={'bottom'}
          isLocked={true}
        />
      </Flex>
      <Flex
        flexDirection='column'
        className={cn('mt-5 mb-10 mr-10', burgerConstructor.constructor__container)}>
        <Flex>
          <div className='constructor-element__price text_type_digits-medium mt-2 mb-2 mr-10'>
            {data.reduce((acc, item) => acc + item.price, 0)}
            <div className={burgerConstructor.currency}>
              <CurrencyIcon type='primary' />
            </div>
          </div>
          <Button type='primary' size='large'>
            Оформить заказ
          </Button>
        </Flex>
      </Flex>
    </div>
  </section>
);
