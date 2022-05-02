import React from 'react';
import cn from 'classnames';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';

import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { Title } from '../../components/title/title';

import mainPage from './main-page.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const MainPage = () => {
  return (
    <main className={mainPage.main}>
      <Title type={'h1'} className={cn('pt-10', mainPage.title)}>
        Соберите бургер
      </Title>
      <DndProvider backend={HTML5Backend}>
        <aside className={mainPage.main__content}>
          <BurgerIngredients />
          <BurgerConstructor />
        </aside>
      </DndProvider>
    </main>
  );
};
