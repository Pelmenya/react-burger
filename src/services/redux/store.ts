import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { socketMiddleware } from './middleware/socket-middleware';

import { rootReducer } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      socketMiddleware('wss://norma.nomoreparties.space/orders/all'),
      logger,
    ]),
  devTools: process.env.NODE_ENV !== 'production',
});

export type StoreType = typeof store;
