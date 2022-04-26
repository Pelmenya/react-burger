import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { Flex } from '../../../flex/flex';
import { BurgerConstructorCard } from '../burger-constructor-card/burger-constructor-card';

import burgerConstructorToppngsList from './burger-constructor-toppings-list.module.css';
import { ingredientsType } from '../../../../utils/prop-types/ingredients-types';

export const BurgerConstructorToppingsList = ({ ingredients = [] }) => (
  <Flex
    flexDirection={'column'}
    gap={16}
    className={cn('mt-4 mb-4', burgerConstructorToppngsList.toppings)}>
    {ingredients.map((topping) => (
      <BurgerConstructorCard key={topping.innerId} ingredient={topping} />
    ))}
  </Flex>
);

BurgerConstructorToppingsList.propTypes = {
  ...ingredientsType,
  innerId: PropTypes.string,
};
