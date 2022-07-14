import {
  errorMessageMock,
  errorMock,
  ingredientsIdsMock,
  orderMock,
  tokenMock,
} from '../../../../utils/mocks';
import {
  clearOrderError,
  initialOrderState,
  orderReducer,
  postOrders,
  resetOrder,
  setIngredientsIds,
  setOpenOrderModal,
  setOrderTotal,
} from './order';

describe('Test reducer for Order', () => {
  it('should return the initial state for Order', () => {
    expect(orderReducer({ ...initialOrderState }, { type: undefined })).toEqual({
      ...initialOrderState,
    });
  });

  it('should return the state ingredients id`s', () => {
    expect(
      orderReducer(
        { ...initialOrderState },
        setIngredientsIds([
          ...ingredientsIdsMock,
        ]),
      ),
    ).toEqual({
      ...initialOrderState,
      ingredientsIds: [
        ...ingredientsIdsMock,
      ],
    });
  });

  it('should return the state total order cost', () => {
    const totalCost = 15854;
    expect(orderReducer({ ...initialOrderState }, setOrderTotal(totalCost))).toEqual({
      ...initialOrderState,
      total: totalCost,
    });
  });

  it('should return the state order modal open', () => {
    expect(orderReducer({ ...initialOrderState }, setOpenOrderModal(true))).toEqual({
      ...initialOrderState,
      isOpen: true,
    });
  });

  it('should return the state reset order: close order modal and order number null', () => {
    expect(orderReducer({ ...initialOrderState }, resetOrder())).toEqual({
      ...initialOrderState,
      isOpen: false,
      num: null,
    });
  });

  it('should return the state order error', () => {
    expect(orderReducer({ ...initialOrderState }, clearOrderError())).toEqual({
      ...initialOrderState,
      error: undefined,
    });
  });

  it('should return undefined error and status loading is pending for post order', () => {
    const action = postOrders.pending('', {
      ingredientsIds: [
        ...ingredientsIdsMock,
      ],
      token: tokenMock,
    });
    expect(orderReducer({ ...initialOrderState }, action)).toStrictEqual({
      ...initialOrderState,
      error: undefined,
      loading: 'pending',
    });
  });

  it('should return state number order and status loading is fulfilled for post order', () => {
    const action = postOrders.fulfilled({ ...orderMock }, '', {
      ingredientsIds: [
        ...ingredientsIdsMock,
      ],
      token: tokenMock,
    });
    expect(orderReducer(initialOrderState, action)).toStrictEqual({
      ...initialOrderState,
      num: orderMock.order.number,
      loading: 'succeeded',
    });
  });

  it('should return error message "Error" and status loading is failed for post order', () => {
    const action = postOrders.rejected(errorMock, '', {
      ingredientsIds: [
        ...ingredientsIdsMock,
      ],
      token: tokenMock,
    });
    expect(orderReducer(initialOrderState, action)).toStrictEqual({
      ...initialOrderState,
      error: errorMessageMock,
      loading: 'failed',
    });
  });
});
