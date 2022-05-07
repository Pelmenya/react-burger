import React, { useCallback, useMemo } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerConstructorCard from './burger-constructor-card.module.css';
import { Spacer } from '../../../spacer/spacer';
import { ingredientType } from '../../../../utils/prop-types/ingredients-types';
import { useDispatch, useSelector } from 'react-redux';
import { getBurgerConstructorState } from '../../../../services/redux/selectors/burger-constructor';
import { setToppings } from '../../../../services/redux/slices/burger-constructor';
import { setOrderTotal } from '../../../../services/redux/slices/order';
import { updateCountIngredient } from '../../../../services/redux/slices/burger-ingredients';
import { getBurgerIngredientsState } from '../../../../services/redux/selectors/burger-ingredients';
import { useDrag, useDrop } from 'react-dnd';
import { useTotalCostOrder } from '../../../../hooks/useTotalCostOrder';

export const BurgerConstructorCard = ({ ingredient, type, isLocked = false }) => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(getBurgerIngredientsState);
  const { toppings } = useSelector(getBurgerConstructorState);
  const { totalCost } = useTotalCostOrder();

  const isBun = useMemo(() => ingredient.type === 'bun', [
    ingredient,
  ]);

  const handlerDrop = (dropIngredient) => {
    const indexIngredient = toppings.findIndex((item) => item.innerId === ingredient.innerId);
    const indexDropIngredient = toppings.findIndex(
      (item) => item.innerId === dropIngredient.innerId,
    );
    let arrDisposition = [
      ...toppings,
    ];
    if (indexIngredient < indexDropIngredient) {
      arrDisposition.splice(indexDropIngredient, 1);
      arrDisposition.splice(indexIngredient, 0, dropIngredient);
    } else {
      arrDisposition.splice(indexIngredient + 1, 0, dropIngredient);
      arrDisposition.splice(indexDropIngredient, 1);
    }
    dispatch(setToppings(arrDisposition));
  };

  const [
    { opacity },
    drag,
  ] = useDrag({
    item: ingredient,
    type: 'ingredient-constructor',
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  const [
    ,
    drop,
  ] = useDrop({
    accept: 'ingredient-constructor',
    hover: (dropIngredient, monitor) => {
      !monitor.isOver() && handlerDrop(dropIngredient);
    },
  });

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
    dispatch(setOrderTotal(totalCost - ingredient.price));
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
    <div
      className={
        isBun ? (
          burgerConstructorCard.card
        ) : (
          cn(burgerConstructorCard.card, burgerConstructorCard.card_topping)
        )
      }
      ref={isBun ? null : drop}>
      <div style={{ opacity }} ref={isBun ? null : drag} className={burgerConstructorCard.card}>
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
