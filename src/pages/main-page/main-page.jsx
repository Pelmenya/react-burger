import React from 'react';
import cn from 'classnames';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';

import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { Title } from '../../components/title/title';

import mainPage from './main-page.module.css';
import { ingredientsType } from '../../utils/prop-types/ingredients-types';

export const MainPage = ({ ingredients }) => (
  <main className={mainPage.main}>
    <Title type={'h1'} className={cn('pt-10', mainPage.title)}>Соберите бургер</Title>
    <aside className={mainPage.main__content}>
      <BurgerIngredients ingredients={ingredients}/>
      <BurgerConstructor ingredients={ingredients}/>
    </aside>
  </main>
);

MainPage.propTypes = ingredientsType;