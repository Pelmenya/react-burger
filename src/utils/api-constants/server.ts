export const SERVER = 'https://norma.nomoreparties.space';

export const INGREDIENTS_END_POINTS = {
  GET_INGREDIENTS: '/api/ingredients',
};

export const ORDERS_END_POINTS = {
  POST_ORDERS: '/api/orders',
};

export const AUTH_END_POINTS = {
  POST_REGISTER: '/api/auth/register',
  POST_LOGIN: '/api/auth/login',
  POST_LOGOUT: '/api/auth/logout',
  POST_TOCKEN: '/api/auth/token',
};

export const USER_END_POINTS = {
  POST_FORGOT_PASSWORD: '/api/password-reset',
  POST_RESET_PASSWORD: '/api/password-reset/reset',
  GET_USER: '/api/auth/user',
  PATCH_USER: '/api/auth/user',
};
