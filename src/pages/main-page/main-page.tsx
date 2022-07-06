import React, { useCallback, useEffect } from 'react';
import cn from 'classnames';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';

import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { Title } from '../../components/title/title';

import mainPage from './main-page.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Modal } from '../../components/modal/modal';
import { getOrderState } from '../../services/redux/selectors/order';
import { OrderDetails } from '../../components/order-details/order-details';
import { setOpenOrderModal } from '../../services/redux/slices/order';
import { useNavHeader } from '../../hooks/use-nav-header';
import { Outlet } from 'react-router';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';

export const MainPage = () => {
  const { setActive } = useNavHeader();
  const dispatch = useAppDispatch();

  const { isOpen: isOpenOrderModal } = useAppSelector(getOrderState);


  const handlerOnCloseOrderModal = useCallback(
    () => {
      dispatch(setOpenOrderModal(false));
    },
    [
      dispatch,
    ],
  );

  useEffect(() => {
    setActive('/');
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
      <Outlet />
      {isOpenOrderModal && (
        <Modal title={undefined} handlerOnClose={handlerOnCloseOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </main>
  );
};
