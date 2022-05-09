import React, { useCallback, useMemo } from 'react';
import cn from 'classnames';

import { Flex } from '../flex/flex';
import { Title } from '../title/title';

import ingredientDetails from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import { getCurrentIngredientState } from '../../services/redux/selectors/current-ingredient';

export const IngredientDetails = () => {
  const { ingredient }  = useSelector(getCurrentIngredientState);
  
  const replacePoint = useCallback((num?: number) => String(num).split('.').join(','), []);
  const calories = useMemo(() => replacePoint(ingredient?.calories), [
    ingredient,
    replacePoint,
  ]);
  const proteins = useMemo(() => replacePoint(ingredient?.proteins), [
    ingredient,
    replacePoint,
  ]);
  const fat = useMemo(() => replacePoint(ingredient?.fat), [
    ingredient,
    replacePoint,
  ]);
  const carbohydrates = useMemo(() => replacePoint(ingredient?.carbohydrates), [
    ingredient,
    replacePoint,
  ]);

  return (
    <Flex flexDirection={'column'} className={ingredientDetails.wrapper}>
      <img src={ingredient?.image} alt={ingredient?.name} className={ingredientDetails.image} />
      <Title type={'h3'} className={'mt-4 mb-8'}>
        {ingredient?.name}
      </Title>
      <Flex className={ingredientDetails.description}>
        <Flex flexDirection={'column'} className={cn(ingredientDetails.ingredient, 'mr-5')}>
          <Title>Калории,ккал</Title>
          <span className='text_type_digits-default'>{calories}</span>
        </Flex>
        <Flex flexDirection={'column'} className={cn(ingredientDetails.ingredient, 'mr-5')}>
          <Title>Белки, г</Title>
          <span className='text_type_digits-default'>{proteins}</span>
        </Flex>
        <Flex flexDirection={'column'} className={cn(ingredientDetails.ingredient, 'mr-5')}>
          <Title> Жиры, г</Title>
          <span className='text_type_digits-default'>{fat}</span>
        </Flex>
        <Flex flexDirection={'column'} className={ingredientDetails.ingredient}>
          <Title>Углеводы, г</Title>
          <span className='text_type_digits-default'>{carbohydrates}</span>
        </Flex>
      </Flex>
    </Flex>
  );
};