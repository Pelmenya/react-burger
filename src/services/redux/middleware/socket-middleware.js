import { setOrdersData } from "../slices/orders";


export const socketMiddleware = (wsUrl) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type } = action;
     // const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
//     console.log(type);
     if (type === 'orders/wsInit') {
        socket = new WebSocket(wsUrl);
      }
      if (socket) {
        socket.onopen = event => {
       //   console.log("OnOpen", event);
          //dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
//          console.log("OnError", event);
//          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          dispatch(setOrdersData(JSON.parse(data)));
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