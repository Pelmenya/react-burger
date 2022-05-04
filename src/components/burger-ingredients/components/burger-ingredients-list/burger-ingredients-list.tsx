import React, { LegacyRef } from 'react';
import cn from 'classnames';

import { Title } from '../../../title/title';
import { Flex } from '../../../flex/flex';

import burgerIngredientsList from './burger-ingredients-list.module.css';
import { BurgerIngredientsCard } from '../burger-ingredients-card/burger-ingredients-card';
import { BurgerIngredientsType } from '../../../../utils/types/burger-ingredients';

interface BurgerIngredientsListPropsType extends BurgerIngredientsType {
  title: string;
  reference: LegacyRef<HTMLDivElement> | undefined;
}

export const BurgerIngredientsList = (props: BurgerIngredientsListPropsType) => {
  const { title, ingredients, reference } = props;
  return (
    <div ref={reference}>
      <Title type={'h3'}>{title}</Title>
      <Flex className={cn('pt-6 pl-4 pr-4 pb-10', burgerIngredientsList.container)}>
        {ingredients &&
          ingredients.map((ingredient) => (
            <BurgerIngredientsCard
              key={ingredient._id}
              ingredient={ingredient}
            />
          ))}
      </Flex>
    </div>
  );
};