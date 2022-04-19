import React from 'react';
import cn from 'classnames';
import shortId from 'shortid';

import { Flex } from '../../../flex/flex';
import { BurgerConstructorCard } from '../burger-constructor-card/burger-constructor-card';

import burgerConstructorToppngsList from './burger-constructor-toppings-list.module.css';
import { dataType } from '../../../../utils/prop-types/data-types';

export const BurgerConstructorToppingsList = ({ data = [] }) => (
  <Flex
    flexDirection={'column'}
    gap={16}
    className={cn('custom-scroll mt-4 mb-4', burgerConstructorToppngsList.toppings)}>
    {data.map((topping) => <BurgerConstructorCard key={shortId.generate()} data={topping} />)}
  </Flex>
);

BurgerConstructorToppingsList.propTypes = dataType;
