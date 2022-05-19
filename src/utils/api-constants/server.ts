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
  POST_TOCKEN: '/api/auth/tocken',
};

export const USER_END_POINTS = {
  POST_FORGOT_PASSWORD: '/api/reset-password',
  POST_RESET_PASSWORD: '/api/reset-password/reset',
  GET_USER: '/api/auth/user',
  PATCH_USER: '/api/auth/user',
};
