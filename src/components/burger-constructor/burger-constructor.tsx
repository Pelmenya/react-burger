import React from 'react';
import cn from 'classnames';

import { Flex } from '../flex/flex';
import { BurgerConstructorCard } from './components/burger-constructor-card/burger-constructor-card';
import { BurgerConstructorToppingsList } from './components/burger-constructor-toppings-list/burger-constructor-toppings-list';
import { Title } from '../title/title';

import burgerConstructor from './burger-constructor.module.css';
import { BurgerConstructorEmpty } from './components/burger-constructor-empty/burger-constructor-empty';
import { useDrop } from 'react-dnd';
import shortid from 'shortid';
import { getBurgerConstructorState } from '../../services/redux/selectors/burger-constructor';
import { setBun, setToppings } from '../../services/redux/slices/burger-constructor/burger-constructor';
import { updateCountIngredient } from '../../services/redux/slices/burger-ingredients/burger-ingredients';
import { getBurgerIngredientsState } from '../../services/redux/selectors/burger-ingredients';
import { maxCountBuns } from '../../utils/constants';
import { BurgerConstructorTotal } from './components/burger-constructor-total/burger-constructor-total';
import { BurgerIngredientType } from '../../utils/types/burger-ingredient';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';

export const BurgerConstructor = () => {
  const dispatch = useAppDispatch();
  const { ingredients } = useAppSelector(getBurgerIngredientsState);
  const { bun, toppings } = useAppSelector(getBurgerConstructorState);
  const dropIngredient = (ingredient: BurgerIngredientType) => {
    if (ingredient.type === 'bun') {
      if (ingredient._id !== bun?._id) {
        dispatch(setBun({ ...ingredient, innerId: shortid.generate() }));
        dispatch(
          updateCountIngredient(
            ingredients.map((item) => {
              if (item._id === ingredient._id) {
                return { ...item, count: maxCountBuns };
              }
              if (item.type === 'bun') {
                return { ...item, count: 0 };
              }
              return item;
            }),
          ),
        );
      }
    } else {
      dispatch(
        setToppings([
          { ...ingredient, innerId: shortid.generate() },
          ...toppings,
        ]),
      );
      dispatch(
        updateCountIngredient(
          ingredients.map((item) => {
            if (item._id === ingredient._id) {
              if (item.count) {
                return { ...item, count: item.count + 1 };
              }
              return { ...item, count: 1 };
            }
            return item;
          }),
        ),
      );
    }
  };

  const [
    { isHover },
    drop,
  ] = useDrop({
    accept: 'ingredient',
    drop: dropIngredient,
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  return (
    <section className={burgerConstructor.section}>
      <Title type='h2' className={burgerConstructor.title}>
        Конструктор бургера
      </Title>
      <div
        className={
          (isHover ? (
            cn(burgerConstructor.constructor, burgerConstructor.constructor_hover)
          ) : (
            burgerConstructor.constructor
          )) as string
        }
        ref={drop}>
        <Flex flexDirection='column' className={burgerConstructor.constructor__container}>
          <>
          {!bun && !toppings.length && <BurgerConstructorEmpty />}
          {bun && <BurgerConstructorCard ingredient={bun} type='top' isLocked={true} />}
          {toppings && <BurgerConstructorToppingsList />}
          {bun && <BurgerConstructorCard ingredient={bun} type='bottom' isLocked={true} />}
          </>
          <BurgerConstructorTotal />
        </Flex>
      </div>
    </section>
  );
};
