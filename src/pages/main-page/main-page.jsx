import React, { useReducer } from 'react';
import cn from 'classnames';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';

import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { Title } from '../../components/title/title';

import mainPage from './main-page.module.css';
import { ingredientsType } from '../../utils/prop-types/ingredients-types';
import { BurgerConstructorContext } from '../../services/burger-constructor-context';

const initialState = {
  bun: null,
  toppings: [],
  total: 0,
  order: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_BUN':
      return { ...state, bun: action.payload };
    case 'SET_TOPPINGS':
      return { ...state, toppings: action.payload };
    case 'SET_TOTAL':
      return { ...state, total: action.payload };
    case 'SET_ORDER':
      return { ...state, order: action.payload };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
};

export const MainPage = ({ ingredients }) => {
  const [
    burgerConstructorState,
    burgerConstructorDispatcher,
  ] = useReducer(reducer, initialState, undefined);

  return (
    <main className={mainPage.main}>
      <BurgerConstructorContext.Provider
        value={{
          burgerConstructorState,
          burgerConstructorDispatcher,
        }}>
        <Title type={'h1'} className={cn('pt-10', mainPage.title)}>
          Соберите бургер
        </Title>
        <aside className={mainPage.main__content}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients} />
        </aside>
      </BurgerConstructorContext.Provider>
    </main>
  );
};

MainPage.propTypes = ingredientsType;
