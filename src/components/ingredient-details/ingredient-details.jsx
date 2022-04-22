import React from 'react';
import cn from 'classnames';

import { Flex } from '../flex/flex';
import { Title } from '../title/title';

import ingredientDetails from './ingredient-details.module.css';
import { ingredientType } from '../../utils/prop-types/ingredients-types';

const replacePoint = (num) => String(num).split('.').join(',')

export const  IngredientDetails = ({ ingredient }) => (
  <Flex flexDirection={'column'} className={ingredientDetails.wrapper}>
    <img src={ingredient.image} alt={ingredient.name} className={ingredientDetails.image} />
    <Title type={'h3'} className={'mt-4 mb-8'}>
      {ingredient.name}
    </Title>
    <Flex className={ingredientDetails.description}>
      <Flex flexDirection={'column'} className={cn(ingredientDetails.ingredient, 'mr-5')}>
        <Title>Калории,ккал</Title>
        <span className='text_type_digits-default'>{replacePoint(ingredient.calories)}</span>
      </Flex>
      <Flex flexDirection={'column'} className={cn(ingredientDetails.ingredient, 'mr-5')}>
        <Title>Белки, г</Title>
        <span className='text_type_digits-default'>{replacePoint(ingredient.proteins)}</span>
      </Flex>
      <Flex flexDirection={'column'} className={cn(ingredientDetails.ingredient, 'mr-5')}>
        <Title> Жиры, г</Title>
        <span className='text_type_digits-default'>{replacePoint(ingredient.fat)}</span>
      </Flex>
      <Flex flexDirection={'column'} className={ingredientDetails.ingredient}>
        <Title>Углеводы, г</Title>
        <span className='text_type_digits-default'>{replacePoint(ingredient.carbohydrates)}</span>
      </Flex>
    </Flex>
  </Flex>
);

 IngredientDetails.propTypes = { ingredients: ingredientType };
