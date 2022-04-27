import React, { useEffect, useReducer } from 'react';
import app from './app.module.css';

import { AppHeader } from '../app-header/app-header';
import { MainPage } from '../../pages/main-page/main-page';
import { ingredientsAPI } from '../../api/ingredients-api';
import { BurgerContext } from '../../services/burger-context';

const initialState = {
  ingredients: null,
  bun: null,
  toppings: [],
  total: 0,
  order: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_INGREDIENTS':
      return { ...state, ingredients: action.payload };
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

export const App = () => {
  const [
    burgerState,
    burgerDispatcher,
  ] = useReducer(reducer, initialState, undefined);

  useEffect(() => {
    ingredientsAPI
      .getIngredients()
      .then((res) => burgerDispatcher({ type: 'SET_INGREDIENTS', payload: res.data }));
  }, []);

  return (
    <div className={app.app}>
      <BurgerContext.Provider
        value={{
          burgerState,
          burgerDispatcher,
        }}>
        <AppHeader />
        {burgerState.ingredients && <MainPage />}
      </BurgerContext.Provider>
    </div>
  );
};
