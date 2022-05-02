import React, { useCallback } from 'react';
import cn from 'classnames';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';

import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { Title } from '../../components/title/title';

import mainPage from './main-page.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentIngredientState } from '../../services/redux/selectors/current-ingredient';
import { resetCurrentIngredient } from '../../services/redux/slices/current-ingredient';
import { Modal } from '../../components/modal/modal';
import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';

export const MainPage = () => {
  const dispatch = useDispatch();
  const { isOpen: isOpenCurrentIngredientModal } = useSelector(getCurrentIngredientState);
  const handlerOnCloseCurrentIngredientModal = useCallback(
    () => {
      dispatch(resetCurrentIngredient());
    },
    [
      dispatch,
    ],
  );

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
      {isOpenCurrentIngredientModal && (
        <Modal title={'Детали ингредиента'} handlerOnClose={handlerOnCloseCurrentIngredientModal}>
          <IngredientDetails />
        </Modal>
      )}
    </main>
  );
};
