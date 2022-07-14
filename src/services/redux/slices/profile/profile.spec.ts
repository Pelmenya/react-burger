import {
  errorMessageMock,
  errorMock,
  newPasswordMock,
  tokenMock,
  userFromServerMock,
  userMock,
} from '../../../../utils/mocks';
import {
  clearProfileError,
  getUser,
  initialProfileState,
  patchUser,
  postForgotPassword,
  postResetPassword,
  profileReducer,
  resetUser,
} from './profile';

describe('Test reducer for Profile', () => {
  it('should return the initial state', () => {
    expect(profileReducer({ ...initialProfileState }, { type: undefined })).toEqual({
      ...initialProfileState,
    });
  });

  it('should return state error undefined', () => {
    expect(profileReducer({ ...initialProfileState }, clearProfileError())).toEqual({
      ...initialProfileState,
      error: undefined,
    });
  });

  it('should return state user null', () => {
    expect(
      profileReducer({ ...initialProfileState, user: { ...userFromServerMock } }, resetUser()),
    ).toEqual({
      ...initialProfileState,
    });
  });

  it('should return undefined error and status loading is pending for fetch user', () => {
    const action = getUser.pending('', '');
    expect(profileReducer({ ...initialProfileState }, action)).toStrictEqual({
      ...initialProfileState,
      error: undefined,
      loading: 'pending',
    });
  });

  it('should return undefined error and status loading is fulfilled for fetch user', () => {
    const action = getUser.fulfilled({ user: { ...userFromServerMock } }, '', '');
    expect(profileReducer({ ...initialProfileState }, action)).toStrictEqual({
      ...initialProfileState,
      loading: 'succeeded',
      user: userFromServerMock,
    });
  });

  it('should return error message "Error" and status loading is failed for fetch user', () => {
    const action = getUser.rejected(errorMock, '', '');
    expect(profileReducer({ ...initialProfileState }, action)).toStrictEqual({
      ...initialProfileState,
      error: errorMessageMock,
      loading: 'failed',
    });
  });

  it('should return undefined error and status loading is pending for apdate user', () => {
    const action = patchUser.pending('', {
      userData: userMock,
      token: tokenMock,
    });
    expect(profileReducer({ ...initialProfileState }, action)).toStrictEqual({
      ...initialProfileState,
      error: undefined,
      loading: 'pending',
    });
  });

  it('should return undefined error and status loading is fulfilled for apdate user', () => {
    const action = patchUser.fulfilled({ user: { ...userFromServerMock } }, '', {
      userData: userMock,
      token: tokenMock,
    });
    expect(profileReducer({ ...initialProfileState }, action)).toStrictEqual({
      ...initialProfileState,
      loading: 'succeeded',
      user: userFromServerMock,
    });
  });

  it('should return error message "Error" and status loading is failed for apdate user', () => {
    const action = patchUser.rejected(errorMock, '', {
      userData: userMock,
      token: tokenMock,
    });
    expect(profileReducer({ ...initialProfileState }, action)).toStrictEqual({
      ...initialProfileState,
      error: errorMessageMock,
      loading: 'failed',
    });
  });

  it('should return undefined error and status loading is pending for password recovery', () => {
    const action = postForgotPassword.pending('', { ...newPasswordMock });
    expect(profileReducer({ ...initialProfileState }, action)).toStrictEqual({
      ...initialProfileState,
      error: undefined,
      loading: 'pending',
    });
  });

  it('should return undefined error and status loading is fulfilled for password recovery', () => {
    const action = postForgotPassword.fulfilled({ ...newPasswordMock }, '', { ...newPasswordMock });
    expect(profileReducer({ ...initialProfileState }, action)).toStrictEqual({
      ...initialProfileState,
      loading: 'succeeded',
      passwordIsSend: true,
    });
  });

  it('should return error message "Error" and status loading is failed for password recovery', () => {
    const action = postForgotPassword.rejected(errorMock, '', { ...newPasswordMock });
    expect(profileReducer({ ...initialProfileState }, action)).toStrictEqual({
      ...initialProfileState,
      error: errorMessageMock,
      loading: 'failed',
    });
  });

  it('should return undefined error and status loading is pending for reset password', () => {
    const action = postResetPassword.pending('', { token: tokenMock, password: 'password' });
    expect(profileReducer({ ...initialProfileState }, action)).toStrictEqual({
      ...initialProfileState,
      error: undefined,
      loading: 'pending',
    });
  });

  it('should return undefined error and status loading is fulfilled reset password', () => {
    const action = postResetPassword.fulfilled('', '', { token: tokenMock, password: 'password' });
    expect(profileReducer({ ...initialProfileState }, action)).toStrictEqual({
      ...initialProfileState,
      loading: 'succeeded',
      passwordIsSend: false,
    });
  });

  it('should return error message "Error" and status loading is failed for reset password', () => {
    const action = postResetPassword.rejected(errorMock, '', {
      token: tokenMock,
      password: 'password',
    });
    expect(profileReducer({ ...initialProfileState }, action)).toStrictEqual({
      ...initialProfileState,
      error: errorMessageMock,
      loading: 'failed',
    });
  });
});
