import React from 'react';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerConstructorCard from './burger-constructor-card.module.css';
import { Spacer } from '../../../spacer/spacer';

export const BurgerConstructorCard = ({ data, type, isLocked = false }) => {
  return (
    <div className={burgerConstructorCard.card}>
      {!!!type ? <DragIcon type='primary' /> : <Spacer spaceWidth={22}/>}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={data.name}
        price={data.price}
        thumbnail={data.image}
      />
	  <Spacer spaceWidth={0}/>
    </div>
  );
};
