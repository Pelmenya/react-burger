import React from 'react';
import cn from 'classnames';

import burgerConstructor from './burger-constructor.module.css';
import { Flex } from '../flex/flex';
import { BurgerConstructorCard } from './components/burger-constructor-card/burger-constructor-card';

import { data } from '../../utils/data';
import { BurgerConstructorToppngsList } from './components/burger-constructor-toppings-list/burger-constructor-toppings-list';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerConstructor = () => (
  <section className={burgerConstructor.constructor}>
    <Flex flexDirection='column' className={cn('mt-25', burgerConstructor.constructor__container)}>
      <BurgerConstructorCard
        data={data.find((item) => item.name === 'Краторная булка N-200i')}
        type={'top'}
        isLocked={true}
      />
	  <BurgerConstructorToppngsList data={data.filter(item => item.type !== 'bun')}/>
	  <BurgerConstructorCard
        data={data.find((item) => item.name === 'Краторная булка N-200i')}
        type={'bottom'}
        isLocked={true}
      />
    </Flex>
    <Flex flexDirection='column' className={cn('mb-10 mr-4', burgerConstructor.constructor__container)}>
	<div className='constructor-element__price mt-2 mb-2'>
        {data.price}
        <CurrencyIcon type='primary' />
      </div>
    </Flex>
  </section>
);
