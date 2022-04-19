import React from 'react';
import { Flex } from '../../../flex/flex';

import burgerIngridientsCard from './burger-ingredients-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Title } from '../../../title/title';

export const BurgerIngridientsCard = ({ data, count }) => {
  return (
    <Flex flexDirection='column' className={burgerIngridientsCard.container}>
      {count && <Counter count={count} size='default' />}
      <img alt={data.name} src={data.image} className={burgerIngridientsCard.img} />
      <div className='constructor-element__price mt-2 mb-2'>
        {data.price}
        <CurrencyIcon type='primary' />
      </div>
      <Title className={burgerIngridientsCard.title}>{data.name}</Title>
    </Flex>
  );
};
