import React from 'react';
import PropTypes from 'prop-types';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerConstructorCard from './burger-constructor-card.module.css';
import { Spacer } from '../../../spacer/spacer';
import { ingredientType } from '../../../../utils/prop-types/ingredients-types';

const getNameCard = (type, name) => {
  switch (type) {
    case 'top':
      return `${name} (верх)`;
    case 'bottom':
      return `${name} (низ)`;
    default:
      return name;
  }
};

export const BurgerConstructorCard = ({ ingredient, type, isLocked = false }) => {
  return (
    <div className={burgerConstructorCard.card}>
      {!!!type ? <DragIcon type='primary' /> : <Spacer spaceWidth={22} />}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={getNameCard(type, ingredient.name)}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
      <Spacer spaceWidth={8} />
    </div>
  );
};

BurgerConstructorCard.propTypes = {
  ingredient: ingredientType.isRequired,
  type: PropTypes.oneOf([
    'top',
    'bottom',
    undefined,
  ]),
  isLocked: PropTypes.bool,
};
