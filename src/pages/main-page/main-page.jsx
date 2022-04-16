import React from 'react';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';

import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';

import mainPage from './main-page.module.css';

export const MainPage = () => (
  <main className={mainPage.main}>
    <aside className={mainPage.main__content}>
      <BurgerIngredients />
      <BurgerConstructor />
    </aside>
  </main>
);
