import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import burgerIngredientsCard from './burger-ingredients-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Title } from '../../../title/title';
import { Modal } from '../../../modal/modal';
import { IngredientDetails } from '../../../ingredient-details/ingredient-details';
import { ingredientType } from '../../../../utils/prop-types/ingredients-types';
import { BurgerConstructorContext } from '../../../../services/burger-constructor-context';

export const BurgerIngredientsCard = ({ ingredient, count }) => {
  const { burgerConstructorState, burgerConstructorDispatcher } = useContext(
    BurgerConstructorContext,
  );

  const [
    isOpenModal,
    setIsOpenModal,
  ] = useState(false);

  const handlerOnClick = () => setIsOpenModal(true);
  const handlerOnCloseModal = () => setIsOpenModal(false);

  const handleOnDragEnd = () => {
    if (ingredient.type === 'bun') {
      if (!burgerConstructorState.bun) {
        burgerConstructorDispatcher({
          type: 'SET_BUN',
          payload: { ...ingredient, innerId: shortid.generate() },
        });
        burgerConstructorDispatcher({
          type: 'SET_TOTAL',
          payload: burgerConstructorState.total + ingredient.price * 2,
        });
      }
    } else {
      burgerConstructorDispatcher({
        type: 'SET_TOPPINGS',
        payload: [
          ...burgerConstructorState.toppings,
          { ...ingredient, innerId: shortid.generate() },
        ],
      });
      burgerConstructorDispatcher({
        type: 'SET_TOTAL',
        payload: burgerConstructorState.total + ingredient.price,
      });
    }
  };

  return (
    <div>
      <div
        className={burgerIngredientsCard.container}
        onClick={handlerOnClick}
        onDragEnd={handleOnDragEnd}>
        {count && <Counter count={count} size='default' />}
        <img alt={ingredient.name} src={ingredient.image} className={burgerIngredientsCard.img} />
        <div className='constructor-element__price mt-2 mb-2'>
          {ingredient.price}
          <CurrencyIcon type='primary' />
        </div>
        <Title className={burgerIngredientsCard.title}>{ingredient.name}</Title>
      </div>
      {isOpenModal && (
        <Modal title={'Детали ингредиента'} handlerOnClose={handlerOnCloseModal}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </div>
  );
};

IngredientDetails.propTypes = { ingredient: ingredientType, count: PropTypes.number };
