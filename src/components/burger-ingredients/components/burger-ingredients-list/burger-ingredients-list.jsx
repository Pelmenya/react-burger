import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import shortId from 'shortid';

import { Title } from '../../../title/title';
import { Flex } from '../../../flex/flex';

import burgerIngredientsList from './burger-ingredients-list.module.css';
import { BurgerIngridientsCard } from '../burger-ingredients-card/burger-ingredients-card';
import { dataType } from '../../../../utils/prop-types/data-types';

export const BurgerIngredientsList = ({ title, data = [] }) => (
  <Flex flexDirection={'column'}>
    <Title type={'h3'}>{title}</Title>
    <Flex className={cn('pt-6 pl-4 pr-4 pb-10', burgerIngredientsList.container)}>
      {data &&
        data.map((ingredient, index) => (
          <BurgerIngridientsCard
            key={shortId.generate()}
            data={ingredient}
            count={index === 1 ? index : undefined}
          />
        ))}
    </Flex>
  </Flex>
);

BurgerIngredientsList.propTypes = {
  title: PropTypes.string.isRequired,
  data: dataType.data,
};
