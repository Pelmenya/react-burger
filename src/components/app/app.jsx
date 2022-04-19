import React, { useEffect, useState } from 'react';
import app from './app.module.css';

import { AppHeader } from '../app-header/app-header';
import { MainPage } from '../../pages/main-page/main-page';
import { dataAPI } from '../../api/data-api';

export const App = () => {
  const [
    data,
    setData,
  ] = useState(null);

  useEffect(() => {
    dataAPI.getIngredients().then((res) => setData(res.data));
  }, []);

  return (
    <div className={app.app}>
      <AppHeader />
      {data && <MainPage data={data} />}
    </div>
  );
};