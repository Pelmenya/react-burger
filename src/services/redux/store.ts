import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { socketMiddleware } from './middleware/socket-middleware';

import { rootReducer } from './root-reducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      socketMiddleware,
    //  logger,
    ]),
  devTools: process.env.NODE_ENV !== 'production',
});

export type StoreType = typeof store;


