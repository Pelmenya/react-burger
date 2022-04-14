import React from 'react';
import app from './app.module.css';

import { AppHeader } from '../app-header/app-header';
import { Spacer } from '../spacer/spacer';

function App() {
  return (
    <div className={app.app}>
      <AppHeader />
    </div>
  );
}

export default App;
