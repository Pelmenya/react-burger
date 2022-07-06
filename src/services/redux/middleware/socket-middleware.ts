import { Middleware } from 'redux';
import { Nullable } from '../../../utils/types/nullable';
import { clearOrdersData, setOrdersData } from '../slices/orders';
import { StoreType } from '../store';

export const socketMiddleware = (() => {
  return (store: StoreType) => {
    let socket: Nullable<WebSocket> = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      if (type === 'orders/wsInit') {
        socket = new WebSocket(payload);
      }

      if (socket) {
        socket.onmessage = (event) => {
          const { data } = event;
          const parseData = JSON.parse(data);
          dispatch(setOrdersData(parseData));
        };

        if (type === 'orders/wsClose') {
          socket.close();
          dispatch(clearOrdersData());
        }
      }
      next(action);
    };
  };
})() as Middleware;
