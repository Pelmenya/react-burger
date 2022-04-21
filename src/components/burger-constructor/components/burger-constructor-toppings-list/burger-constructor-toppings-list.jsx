import React from 'react';
import cn from 'classnames';
import shortId from 'shortid';

import { Flex } from '../../../flex/flex';
import { BurgerConstructorCard } from '../burger-constructor-card/burger-constructor-card';

import burgerConstructorToppngsList from './burger-constructor-toppings-list.module.css';
import { ingredientsType } from '../../../../utils/prop-types/ingredients-types';

export const BurgerConstructorToppingsList = ({ ingredients = [] }) => (
  <Flex
    flexDirection={'column'}
    gap={16}
    className={cn('custom-scroll mt-4 mb-4', burgerConstructorToppngsList.toppings)}>
    {ingredients.map((topping) => <BurgerConstructorCard key={shortId.generate()} ingredient={topping} />)}
  </Flex>
);

BurgerConstructorToppingsList.propTypes = ingredientsType;
