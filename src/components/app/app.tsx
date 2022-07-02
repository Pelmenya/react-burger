import React, { useEffect } from 'react';
import app from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/redux/slices/burger-ingredients';
import { RoutesApp } from '../routes/routes';
import { DispatchType } from '../../utils/types/dispatch-type';
import { Modal } from '../modal/modal';
import { clearError } from '../../services/redux/slices/error-request';
import { BadRequest } from '../bad-request/bad-request';
import { getErrorRequestState } from '../../services/redux/selectors/error-request';
import { useErrorHandler } from '../../hooks/use-error-handler';
import { getUser, resetUser } from '../../services/redux/slices/profile';
import { getProfileState } from '../../services/redux/selectors/profile';

export const App = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const { user } = useSelector(getProfileState);
  const { isError, message } = useSelector(getErrorRequestState);
  const { callErrorHandler } = useErrorHandler();

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
