import React, { useCallback } from 'react';
import shortid from 'shortid';
import { useDrag } from 'react-dnd';

import burgerIngredientsCard from './burger-ingredients-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Title } from '../../../title/title';
import { useDispatch } from 'react-redux';
import { setCurrentIngredient } from '../../../../services/redux/slices/current-ingredient';
import { BurgerIngredientType } from '../../../../utils/types/burger-ingredient';

export interface BurgerIngredientsCardPropsType {
  ingredient: BurgerIngredientType;
}

export const BurgerIngredientsCard = ({ ingredient }: BurgerIngredientsCardPropsType) => {
  const dispatch = useDispatch();

  const [
    { opacity },
    dragRef,
  ] = useDrag({
    item: { ...ingredient, innerId: shortid.generate() },
    type: 'ingredient',
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
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