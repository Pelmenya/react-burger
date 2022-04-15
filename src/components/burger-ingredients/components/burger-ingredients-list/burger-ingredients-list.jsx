import React from 'react';
import cn from 'classnames';

import { Title } from '../../../title/title';
import { Flex } from '../../../flex/flex';

import burgerIngredientsList from './burger-ingredients-list.module.css';
import { BurgerIngridientsCard } from '../burger-ingredients-card/burger-ingredients-card';

export const BurgerIngredientsList = ({ title, listIngredients }) => (
  <Flex flexDirection={'column'}>
    <Title type={'h3'}>{title}</Title>
    <Flex className={cn('pt-6 pl-4 pr-4 pb-10', burgerIngredientsList.container)}>
      {listIngredients &&
        listIngredients.map((ingredient, index) => (
          <BurgerIngridientsCard
            key={`burgerIngredients-${index}`}
            data={ingredient}
            count={index === 1 ? index : undefined}
          />
        ))}
    </Flex>
  </Flex>
);
