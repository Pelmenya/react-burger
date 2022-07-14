import { Middleware } from 'redux';
import { Nullable } from '../../../utils/types/nullable';
import { clearOrdersData, setOrdersData, wsInit, wsClose } from '../slices/orders/orders';
import { StoreType } from '../store';

export const socketMiddleware = (() => {
  return (store: StoreType) => {
    let socket: Nullable<WebSocket> = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      if (type === wsInit.type) {
        socket = new WebSocket(payload);
      }

      if (socket) {
        if (type === wsClose.type) {
          socket.close();
          dispatch(clearOrdersData());
        }

        socket.onmessage = (event) => {
          const { data } = event;
          const parseData = JSON.parse(data);
          dispatch(setOrdersData(parseData));
        };

        socket.onclose = () => {
          dispatch(clearOrdersData());
        };
      }

      next(action);
    };
  };
})() as Middleware;
