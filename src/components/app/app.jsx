import React from 'react';
import app from './app.module.css';

import { AppHeader } from '../app-header/app-header';
import { Spacer } from '../spacer/spacer';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';

function App() {
  return (
    <div className={app.app}>
      <AppHeader />
      <BurgerIngredients />
    </div>
  );
}

export default App;
