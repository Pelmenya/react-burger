import React from 'react';
import cn from 'classnames';

import { Flex } from '../../../flex/flex';
import { BurgerConstructorCard } from '../burger-constructor-card/burger-constructor-card';

import burgerConstructorToppngsList from './burger-constructor-toppings-list.module.css';

export const BurgerConstructorToppngsList = ({ data = [] }) => (
  <Flex flexDirection={'column'} gap={16} className={cn('custom-scroll mt-4 mb-4',burgerConstructorToppngsList.toppings)}>
    {data.map((topping, index) => <BurgerConstructorCard key={`${index}-topping`} data={topping} />)}
  </Flex>
);
