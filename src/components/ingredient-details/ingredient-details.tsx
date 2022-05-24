import React, { useCallback, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { Flex } from '../flex/flex';
import { Title } from '../title/title';

import ingredientDetails from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import { getCurrentIngredientState } from '../../services/redux/selectors/current-ingredient';
import { useParams } from 'react-router';
import { getBurgerIngredientsState } from '../../services/redux/selectors/burger-ingredients';
import { BurgerIngredientType } from '../../utils/types/burger-ingredient'

export const IngredientDetails = () => {
  const { ingredient : currentIngredient }  = useSelector(getCurrentIngredientState);

  const { ingredients } = useSelector(getBurgerIngredientsState);
  const [ingredient, setIngredient] = useState<BurgerIngredientType>();

  let { id } = useParams();

  useEffect(() => {
    if (id && ingredients) {
      const item = ingredients.find(item => item._id === id)
      setIngredient(item);
    }
    if (currentIngredient) {
      setIngredient(currentIngredient);
    }        

  }, [id, ingredients, currentIngredient])
  
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
    <Flex flexDirection={'column'} className={cn(ingredientDetails.wrapper, !currentIngredient && 'mt-30')}>
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