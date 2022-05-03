import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { useDrag } from 'react-dnd';

import burgerIngredientsCard from './burger-ingredients-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Title } from '../../../title/title';
import { ingredientType } from '../../../../utils/prop-types/ingredients-types';
import { useDispatch } from 'react-redux';
import { setCurrentIngredient } from '../../../../services/redux/slices/current-ingredient';

export const BurgerIngredientsCard = ({ ingredient }) => {
  const dispatch = useDispatch();

  const [
    { opacity },
    dragRef,
  ] = useDrag({
    item: { ...ingredient, innerId: shortid.generate() },
    type: 'ingredient',
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    }),
  });

  const handlerOnClick = useCallback(
    () => {
      dispatch(setCurrentIngredient(ingredient));
    },
    [
      dispatch,
      ingredient,
    ],
  );

  return (
    <div className={burgerIngredientsCard.wrapper}>
      {!!ingredient.count && <Counter count={ingredient.count} size='default' />}
      <div className={burgerIngredientsCard.container} onClick={handlerOnClick}>
        <img
          ref={dragRef}
          style={{ opacity }}
          alt={ingredient.name}
          src={ingredient.image}
          className={burgerIngredientsCard.img}
        />
        <div className='constructor-element__price mt-2 mb-2'>
          {ingredient.price}
          <CurrencyIcon type='primary' />
        </div>
        <Title className={burgerIngredientsCard.title}>{ingredient.name}</Title>
      </div>
    </div>
  );
};

BurgerIngredientsCard.propTypes = { ingredient: ingredientType, count: PropTypes.number };
