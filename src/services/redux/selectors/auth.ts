import { AuthStateType } from '../slices/auth';

interface State {
  auth: AuthStateType;
}

export const getAuthState = (state: State) => state.auth;
