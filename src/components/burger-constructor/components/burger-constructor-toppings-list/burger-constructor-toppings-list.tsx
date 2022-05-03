import React from 'react';
import cn from 'classnames';

import { Flex } from '../../../flex/flex';
import { BurgerConstructorCard } from '../burger-constructor-card/burger-constructor-card';

import burgerConstructorToppngsList from './burger-constructor-toppings-list.module.css';
import { useSelector } from 'react-redux';
import { getBurgerConstructorState } from '../../../../services/redux/selectors/burger-constructor';

export const BurgerConstructorToppingsList = () => {
  const { toppings } = useSelector(getBurgerConstructorState);

  return (
    <Flex
      flexDirection={'column'}
      gap={16}
      className={cn('pt-4 pb-4', burgerConstructorToppngsList.toppings)}>
      {toppings.map((topping) => (
        <BurgerConstructorCard key={topping.innerId} ingredient={topping} />
      ))}
    </Flex>
  );
};
