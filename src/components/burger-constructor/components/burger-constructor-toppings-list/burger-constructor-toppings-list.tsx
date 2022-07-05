import React from 'react';
import cn from 'classnames';

import { Flex } from '../../../flex/flex';
import { BurgerConstructorCard } from '../burger-constructor-card/burger-constructor-card';

import burgerConstructorToppngsList from './burger-constructor-toppings-list.module.css';
import { getBurgerConstructorState } from '../../../../services/redux/selectors/burger-constructor';
import { useAppSelector } from '../../../../hooks/use-app-selector';

export const BurgerConstructorToppingsList = () => {
  const { toppings } = useAppSelector(getBurgerConstructorState);

  return (
    <Flex
      flexDirection={'column'}
      gap={16}
      className={cn('mt-4 mb-4', burgerConstructorToppngsList.toppings)}>
      {toppings.map((topping) => (
        <BurgerConstructorCard key={topping.innerId} ingredient={topping} />
      ))}
    </Flex>
  );
};
