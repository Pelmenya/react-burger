import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import shortId from 'shortid';

import { Title } from '../../../title/title';
import { Flex } from '../../../flex/flex';

import burgerIngredientsList from './burger-ingredients-list.module.css';
import { BurgerIngredientsCard } from '../burger-ingredients-card/burger-ingredients-card';
import { ingredientsType } from '../../../../utils/prop-types/ingredients-types';

export const BurgerIngredientsList = ({ title, ingredients = [] }) => (
  <Flex flexDirection={'column'}>
    <Title type={'h3'}>{title}</Title>
    <Flex className={cn('pt-6 pl-4 pr-4 pb-10', burgerIngredientsList.container)}>
      {ingredients &&
        ingredients.map((ingredient, index) => (
          <BurgerIngredientsCard
            key={shortId.generate()}
            ingredient={ingredient}
            count={index === 1 ? index : undefined}
          />
        ))}
    </Flex>
  </Flex>
);

BurgerIngredientsList.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: ingredientsType.ingredients,
};
