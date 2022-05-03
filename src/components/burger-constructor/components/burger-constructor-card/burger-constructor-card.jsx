import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerConstructorCard from './burger-constructor-card.module.css';
import { Spacer } from '../../../spacer/spacer';
import { ingredientType } from '../../../../utils/prop-types/ingredients-types';
import { useDispatch, useSelector } from 'react-redux';
import { getBurgerConstructorState } from '../../../../services/redux/selectors/burger-constructor';
import { setToppings } from '../../../../services/redux/slices/burger-constructor';
import { maxCountBuns } from '../../../../utils/constants';
import { setOrderTotal } from '../../../../services/redux/slices/order';
import { updateCountIngredient } from '../../../../services/redux/slices/burger-ingredients';
import { getBurgerIngredientsState } from '../../../../services/redux/selectors/burger-ingredients';

export const BurgerConstructorCard = ({ ingredient, type, isLocked = false }) => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(getBurgerIngredientsState);
  const { bun, toppings } = useSelector(getBurgerConstructorState);

  const getNameCard = useCallback((type, name) => {
    switch (type) {
      case 'top':
        return `${name} (верх)`;
      case 'bottom':
        return `${name} (низ)`;
      default:
        return name;
    }
  }, []);

  const handlerOnClose = () => {
    let totalCost = -ingredient.price;
    if (toppings.length) {
      totalCost = toppings.reduce((acc, item) => acc + item.price, 0) + totalCost;
    }
    if (bun) {
      totalCost = totalCost + maxCountBuns * bun.price;
    }
    dispatch(setOrderTotal(totalCost));
    dispatch(setToppings(toppings.filter((item) => item.innerId !== ingredient.innerId)));
    dispatch(
      updateCountIngredient(
        ingredients.map((item) => {
          if (item._id === ingredient._id) {
            if (item.count) {
              return { ...item, count: item.count - 1 };
            }
            return { ...item, count: 0 };
          }
          return item;
        }),
      ),
    );
  };

  return (
    <div className={burgerConstructorCard.card}>
      {!!!type ? <DragIcon type='primary' /> : <Spacer spaceWidth={22} />}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={getNameCard(type, ingredient.name)}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={handlerOnClose}
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
