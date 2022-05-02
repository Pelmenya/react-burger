import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { useDrag } from 'react-dnd';

import burgerIngredientsCard from './burger-ingredients-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Title } from '../../../title/title';
import { ingredientType } from '../../../../utils/prop-types/ingredients-types';
import { useDispatch } from 'react-redux';
import { setCurrentIngredient } from '../../../../services/redux/slices/current-ingredient';
import { BurgerContext } from '../../../../services/burger-context';

export const BurgerIngredientsCard = ({ ingredient, count }) => {
  const dispatch = useDispatch();
  const {burgerState, burgerDispatcher } =useContext(BurgerContext);

  const [
    { isDrag },
    dragRef,
  ] = useDrag({
    item: { ...ingredient, innerId: shortid.generate() },
    type: 'ingredient',
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
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

  const handleOnDragEnd = () => {
    if (ingredient.type === 'bun') {
      if (!burgerState.bun) {
        burgerDispatcher({
          type: 'SET_BUN',
          payload: { ...ingredient, innerId: shortid.generate() },
        });
        burgerDispatcher({
          type: 'SET_TOTAL',
          payload: burgerState.total + ingredient.price * 2,
        });
      }
    } else {
      burgerDispatcher({
        type: 'SET_TOPPINGS',
        payload: [
          ...burgerState.toppings,
          { ...ingredient, innerId: shortid.generate() },
        ],
      });
      burgerDispatcher({
        type: 'SET_TOTAL',
        payload: burgerState.total + ingredient.price,
      });
    }
  };

  return (
    <div className={burgerIngredientsCard.wrapper}>
      {count && <Counter count={count} size='default' />}
      <div
        className={burgerIngredientsCard.container}
        onClick={handlerOnClick}
        onDragEnd={handleOnDragEnd}>
        <img
          ref={dragRef}
          style={{ cursor: isDrag ? 'move' : 'pointer' }}
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
