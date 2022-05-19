import { ErrorRequestStateType } from '../slices/error-request';

interface State {
  errorRequest: ErrorRequestStateType;
}

export const getErrorRequestState = (state: State) => state.errorRequest;
