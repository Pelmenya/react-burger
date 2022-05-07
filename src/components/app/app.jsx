import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import app from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { useDispatch } from 'react-redux';
import { fetchIngredients } from '../../services/redux/slices/burger-ingredients';
import { ROUTES } from '../../utils/routes/routes';

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
        <Routes>
          {ROUTES.map((route) => (
            <Route
              key={route.name}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Routes>
      </div>
  );
};
