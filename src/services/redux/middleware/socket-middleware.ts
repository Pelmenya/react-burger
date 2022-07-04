import { Middleware } from 'redux';
import { ALL_ORDERS, SOCKET } from '../../../utils/api-constants/ws';
import { Nullable } from '../../../utils/types/nullable';
import { postToken } from '../slices/auth';
import { setOrdersData, setOrdersUserData, wsInitUserOrders } from '../slices/orders';
import { StoreType } from '../store';

export const socketMiddleware = (() => {
  return (store: StoreType) => {
    let socketAll: Nullable<WebSocket> = null;
    let socketUser: Nullable<WebSocket> = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const accessToken = localStorage.getItem('accessToken')?.split(' ')[1];
      const refreshToken = localStorage.getItem('refreshToken');
      if (type === 'orders/wsInitAllOrders') {
        socketAll = new WebSocket(`${SOCKET}${ALL_ORDERS}`);
      }

      if (type === 'orders/wsInitUserOrders') {
        socketUser = new WebSocket(`${SOCKET}?token=${accessToken}`);
      }

      if (socketAll) {
        socketAll.onmessage = (event) => {
          const { data } = event;
          const parseData = JSON.parse(data);
          dispatch(setOrdersData(parseData));
        };
      }

      if (socketUser) {
        socketUser.onmessage = (event) => {
          const { data } = event;
          const parseData = JSON.parse(data);
          if (parseData.message === 'Invalid or missing token'){
            dispatch(postToken(refreshToken));
            if (refreshToken) dispatch(wsInitUserOrders());
          }
          if (parseData.orders instanceof Array)
            dispatch(
              setOrdersUserData({
                ...parseData,
                orders: [
                  ...parseData.orders.reverse(),
                ],
              }),
            );
        };
        
        if (type === 'orders/wsClose') {
          socketUser.close();
          dispatch(setOrdersUserData(null));
        }
      }

      next(action);
    };
  };
})() as Middleware;
