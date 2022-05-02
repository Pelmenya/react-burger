import React from 'react';

import { Flex } from '../flex/flex';
import { Title } from '../title/title';
import { TabContainer } from './components/tab-container/tab-container';

import burgerIngredients from './burger-ingredients.module.css';
import { useSelector } from 'react-redux';
import { getBurgerIngredientsState } from '../../services/redux/selectors/burger-ingredients';
import { Loader } from '../loader/loader';
import { useDrop } from 'react-dnd';
import { BadRequest } from '../bad-request/bad-request';

export const BurgerIngredients = () => {
  const { loading, error } = useSelector(getBurgerIngredientsState);
  const [
    ,
    dropRef,
  ] = useDrop({
    accept: 'ingredient',
  });
  return (
    <section className={burgerIngredients.tab} ref={dropRef}>
      <Flex flexDirection='column'>
        <Title type='h2' className={burgerIngredients.title}>
          Ингредиенты бургера
        </Title>
        {loading === 'pending' && <Loader />}
        {loading === 'succeeded' && <TabContainer />}
        {loading === 'failed' && <BadRequest error={error} />}
      </Flex>
    </section>
  );
};
