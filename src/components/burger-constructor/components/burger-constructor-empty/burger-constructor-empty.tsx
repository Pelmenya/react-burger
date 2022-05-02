import React from 'react';

import burgerPicture from '../../../../images/burger.svg';
import { Flex } from '../../../flex/flex';
import { Title } from '../../../title/title';
import burgerConstructorEmpty from './burger-constructor-empty.module.css';

export const Question = () => (
  <Flex flexDirection='column' className={burgerConstructorEmpty.wrapper}>
    <Title type='h3'>Поместите ингредиенты сюда...</Title>
    <img src={burgerPicture} alt={'Бургер'} className={burgerConstructorEmpty.img} />
  </Flex>
);
