import { ALL_ORDERS, SOCKET } from '../../../utils/api-constants/ws';
import { setOrdersData, setOrdersUserData, wsClose } from '../slices/orders';

export const socketMiddleware = () => {
  return (store) => {
    let socketAll = null;
    let socketUser = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const accessToken = localStorage.getItem('accessToken')?.split(' ')[1];

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
        socketUser.onerror = () => {
          dispatch(wsClose());
        };

        socketUser.onmessage = (event) => {
          const { data } = event;
          const parseData = JSON.parse(data);
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
};
