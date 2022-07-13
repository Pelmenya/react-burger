import React, { useEffect } from 'react';
import app from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { fetchIngredients } from '../../services/redux/slices/burger-ingredients/burger-ingredients';
import { RoutesApp } from '../routes/routes';
import { Modal } from '../modal/modal';
import { clearError } from '../../services/redux/slices/error-request';
import { BadRequest } from '../bad-request/bad-request';
import { getErrorRequestState } from '../../services/redux/selectors/error-request';
import { useErrorHandler } from '../../hooks/use-error-handler';
import { getUser, resetUser } from '../../services/redux/slices/profile';
import { getProfileState } from '../../services/redux/selectors/profile';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';

export const App = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const { user } = useAppSelector(getProfileState);
  const { isError, message } = useAppSelector(getErrorRequestState);
  const { callErrorHandler } = useErrorHandler();

  const dispatch = useAppDispatch();

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

  useEffect(
    () => {
      if (accessToken) dispatch(getUser(accessToken));
    },
    [
      dispatch,
      accessToken,
    ],
  );

  useEffect(
    () => {
      callErrorHandler();
    },
    [
      callErrorHandler,
    ],
  );

  useEffect(
    () => {
      if (!refreshToken && !accessToken && user) dispatch(resetUser());
    },
    [
      refreshToken,
      accessToken,
      user,
      dispatch,
    ],
  );

  return (
    <div className={app.app}>
      <AppHeader />
      <RoutesApp />
      {isError && (
        <Modal title='Ошибка' handlerOnClose={handlerOnCloseErrorModal}>
          <BadRequest error={message} />
        </Modal>
      )}
    </div>
  );
};
