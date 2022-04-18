import React from 'react';
import PropTypes from 'prop-types';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerConstructorCard from './burger-constructor-card.module.css';
import { Spacer } from '../../../spacer/spacer';
import { dataItemType } from '../../../../utils/prop-types/data-types';

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

export const BurgerConstructorCard = ({ data, type, isLocked = false }) => {
  return (
    <div className={burgerConstructorCard.card}>
      {!!!type ? <DragIcon type='primary' /> : <Spacer spaceWidth={22} />}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={getNameCard(type, data.name)}
        price={data.price}
        thumbnail={data.image}
      />
      <Spacer spaceWidth={0} />
    </div>
  );
};

BurgerConstructorCard.propTypes = {
  data: dataItemType.isRequired,
  type: PropTypes.oneOf([
    'top',
    'bottom',
    undefined,
  ]),
  isLocked: PropTypes.bool,
};
