import React from 'react';
import cn from 'classnames';

import { Flex } from '../flex/flex';
import { Title } from '../title/title';

import ingredientDetails from './ingredient-details.module.css';
import { dataItemType } from '../../utils/prop-types/data-types';

const replacePoint = (num) => String(num).split('.').join(',')

export const IngredientDitails = ({ data }) => (
  <Flex flexDirection={'column'} className={ingredientDetails.wrapper}>
    <img src={data.image} alt='data.name' className={ingredientDetails.image} />
    <Title type={'h3'} className={'mt-4 mb-8'}>
      {data.name}
    </Title>
    <Flex className={ingredientDetails.description}>
      <Flex flexDirection={'column'} className={cn(ingredientDetails.ingredient, 'mr-5')}>
        <Title>Калории,ккал</Title>
        <span className='text_type_digits-default'>{replacePoint(data.calories)}</span>
      </Flex>
      <Flex flexDirection={'column'} className={cn(ingredientDetails.ingredient, 'mr-5')}>
        <Title>Белки, г</Title>
        <span className='text_type_digits-default'>{replacePoint(data.proteins)}</span>
      </Flex>
      <Flex flexDirection={'column'} className={cn(ingredientDetails.ingredient, 'mr-5')}>
        <Title> Жиры, г</Title>
        <span className='text_type_digits-default'>{replacePoint(data.fat)}</span>
      </Flex>
      <Flex flexDirection={'column'} className={ingredientDetails.ingredient}>
        <Title>Углеводы, г</Title>
        <span className='text_type_digits-default'>{replacePoint(data.carbohydrates)}</span>
      </Flex>
    </Flex>
  </Flex>
);

IngredientDitails.propTypes = { data: dataItemType };
