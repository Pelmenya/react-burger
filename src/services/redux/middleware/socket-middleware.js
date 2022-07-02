import { ALL_ORDERS, SOCKET } from "../../../utils/api-constants/ws";
import { setOrdersData } from "../slices/orders";


export const socketMiddleware = () => {
  return store => {
    let socket = null;
    let nameSocket = undefined;

    return next => action => {
      const { dispatch } = store;
      
      const { type } = action;
      const accessToken = localStorage.getItem('accessToken')?.split(' ')[1];
     if (type === 'orders/wsInitAllOrders') {
        socket = null;
        socket = new WebSocket(`${SOCKET}${ALL_ORDERS}`);
        nameSocket = 'all-orders'
      }

      if (type === 'orders/wsInitUserOrders') {
        socket = null;
        socket = new WebSocket(`${SOCKET}?token=${accessToken}`);
        nameSocket = 'user-orders'
      }

      if (socket) {
        socket.onopen = event => {
          //console.log("OnOpen", event);
          //dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          console.log("OnError", event);
         // dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parseData = JSON.parse(data);
          console.log(parseData)
        if (nameSocket === 'all-orders') dispatch(setOrdersData(parseData));
        if (parseData.orders instanceof Array) 
          if (nameSocket === 'user-orders') dispatch(setOrdersData({...parseData, orders: [ ...parseData.orders.reverse()]})); 
        };

        socket.onclose = event => {
          console.log("OnClose", event);
//        dispatch({ type: onClose, payload: event });
        };

/*      if (type === wsSendMessage) {
          const message = { ...payload, token: 'eeeeeeeee' };
          socket.send(JSON.stringify(message));
        }
 */      }
      next(action);
    };
  };
};