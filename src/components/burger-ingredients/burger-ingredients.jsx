import React, { useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { Flex } from '../flex/flex';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Title } from '../title/title';
import { TabContainer } from '../tab-container/tab-container';
import { BurgerIngredientsList } from './components/burger-ingredients-list/burger-ingredients-list';

import burgerIngredients from './burger-ingredients.module.css';
import { dataType } from '../../utils/data-type';

export const BurgerIngredients = ({ data }) => {
  const [
    current,
    setCurrent,
  ] = useState('all');

  return (
    <section className={cn('pt-10', burgerIngredients.tab)}>
      <Flex flexDirection='column'>
        <Title type={'h1'}>Соберите бургер</Title>
        <Flex className={'pt-5 pb-10'}>
          <Tab value={'buns'} active={current === 'buns'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value={'sauces'} active={current === 'sauces'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value={'toppings'} active={current === 'toppings'} onClick={setCurrent}>
            Начинки
          </Tab>
        </Flex>
        {current === 'all' && (
          <TabContainer>
            <BurgerIngredientsList
              title={'Булки'}
              listIngredients={data.filter((item) => item.type === 'bun')}
            />
            <BurgerIngredientsList
              title={'Соусы'}
              listIngredients={data.filter((item) => item.type === 'sauce')}
            />
            <BurgerIngredientsList
              title={'Начинки'}
              listIngredients={data.filter((item) => item.type === 'main')}
            />
          </TabContainer>
        )}
         {current === 'buns' && (
          <TabContainer>
            <BurgerIngredientsList
              title={'Булки'}
              listIngredients={data.filter((item) => item.type === 'bun')}
            />
          </TabContainer>
        )}
        {current === 'sauces' && (
          <TabContainer>
            <BurgerIngredientsList
              title={'Соусы'}
              listIngredients={data.filter((item) => item.type === 'sauce')}
            />
          </TabContainer>
        )}
        {current === 'toppings' && (
          <TabContainer>
            <BurgerIngredientsList
              title={'Начинки'}
              listIngredients={data.filter((item) => item.type === 'main')}
            />
          </TabContainer>
        )}
      </Flex>
    </section>
  );
};

BurgerIngredients.propsType = PropTypes.arrayOf(dataType.isRequired);
