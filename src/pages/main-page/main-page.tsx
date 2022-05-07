import React, { useCallback, useEffect } from 'react';
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
import { getOrderState } from '../../services/redux/selectors/order';
import { OrderDetails } from '../../components/order-details/order-details';
import { setOpenOrderModal } from '../../services/redux/slices/order';
import { useNavHeader } from '../../hooks/useNavHeader';

export const MainPage = () => {
  const { setActive } = useNavHeader();
  const dispatch = useDispatch();
  const { isOpen: isOpenCurrentIngredientModal } = useSelector(getCurrentIngredientState);
  const { isOpen: isOpenOrderModal } = useSelector(getOrderState);

  const handlerOnCloseCurrentIngredientModal = useCallback(
    () => {
      dispatch(resetCurrentIngredient());
    },
    [
      dispatch,
    ],
  );

  const handlerOnCloseOrderModal = useCallback(
    () => {
      dispatch(setOpenOrderModal(false));
    },
    [
      dispatch,
    ],
  );

  useEffect(() => {
    setActive('main');
  });

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
      {isOpenOrderModal && (
        <Modal title={undefined} handlerOnClose={handlerOnCloseOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </main>
  );
};
