import React, { useEffect } from 'react';
import app from './app.module.css';

import { AppHeader } from '../app-header/app-header';
import { MainPage } from '../../pages/main-page/main-page';
import { useDispatch } from 'react-redux';
import { fetchIngredients } from '../../services/redux/slices/burger-ingredients';

export const App = () => {
  const dispatch = useDispatch();

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
      <MainPage />
    </div>
  );
};
