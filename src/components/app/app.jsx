import React, { useEffect, useState } from 'react';
import app from './app.module.css';

import { AppHeader } from '../app-header/app-header';
import { MainPage } from '../../pages/main-page/main-page';
import { ingredientsAPI } from '../../api/ingredients-api';

export const App = () => {
  const [
    ingredients,
    setIngredients,
  ] = useState(null);

  useEffect(() => {
    ingredientsAPI.getIngredients().then((res) => setIngredients(res.data));
  }, []);

  return (
    <div className={app.app}>
      <AppHeader />
      {ingredients && <MainPage ingredients={ingredients} />}
    </div>
  );
};