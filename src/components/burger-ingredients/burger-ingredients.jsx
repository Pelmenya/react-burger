import React from 'react';

import { Flex } from '../flex/flex';
import { Title } from '../title/title';
import { TabContainer } from '../tab-container/tab-container';

import burgerIngredients from './burger-ingredients.module.css';
import { useSelector } from 'react-redux';
import { getBurgerIngredientsState } from '../../services/redux/selectors/burger-ingredients';

export const BurgerIngredients = () => {
  const { loading } = useSelector(getBurgerIngredientsState);

  return (
    <section className={burgerIngredients.tab}>
      <Flex flexDirection='column'>
        <Title type={'h2'} className={burgerIngredients.title}>
          Ингредиенты бургера
        </Title>
        {loading === 'succeeded' && <TabContainer />}
      </Flex>
    </section>
  );
};
