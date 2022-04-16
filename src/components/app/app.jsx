import React from 'react';
import app from './app.module.css';

import { AppHeader } from '../app-header/app-header';
import { MainPage } from '../../pages/main-page/main-page';

function App() {
  return (
    <div className={app.app}>
      <AppHeader />
      <MainPage />
    </div>
  );
}

export default App;
