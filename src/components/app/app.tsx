import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import app from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/redux/slices/burger-ingredients';
import { ROUTES } from '../../utils/routes/routes';
import { DispatchType } from '../../utils/types/dispatch-type';
import { Modal } from '../modal/modal';
import { clearError } from '../../services/redux/slices/error-request';
import { BadRequest } from '../bad-request/bad-request';
import { getErrorRequestState } from '../../services/redux/selectors/error-request';
import { ProfilePage } from '../../pages/profile-page/profile-page';

export const App = () => {
  const { isError, message } = useSelector(getErrorRequestState);

  const dispatch = useDispatch<DispatchType>();

  const handlerOnCloseErrorModal = () => {
    dispatch(clearError());
  };

  useEffect(
    () => {
      dispatch(fetchIngredients());
    },
    [
      dispatch,
    ],
  );

  return (
    <div className={app.app}>
      <AppHeader />
      <Routes>
        {ROUTES.map((route) => (
          <Route key={route.name} path={route.path} element={<route.element />} />
        ))}
        <Route key={'profile'} path={'/profile'} element={<ProfilePage />}>
          <Route path='orders' element={<div>dasdasd</div>} />
        </Route>
      </Routes>
      {isError && (
        <Modal title='Ошибка' handlerOnClose={handlerOnCloseErrorModal}>
          <BadRequest error={message} />
        </Modal>
      )}
    </div>
  );
};
