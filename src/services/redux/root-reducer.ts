import { combineReducers } from 'redux';
import { authReducer } from './slices/auth/auth';
import { burgerConstructorReducer } from './slices/burger-constructor/burger-constructor';
import { burgerIngredientsReducer } from './slices/burger-ingredients/burger-ingredients';
import { currentIngredientReducer } from './slices/current-ingredient';
import { errorRequestReducer } from './slices/error-request';
import { headerNavReducer } from './slices/header-nav';
import { menuProfileReducer } from './slices/menu-profile';
import { orderReducer } from './slices/order';
import { ordersReducer } from './slices/orders';
import { profileReducer } from './slices/profile';

export const rootReducer = combineReducers({
  errorRequest: errorRequestReducer,
  headerNav: headerNavReducer,
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  currentIngredient: currentIngredientReducer,
  menuProfile: menuProfileReducer,
  order: orderReducer,
  orders: ordersReducer,
  profile: profileReducer,
  auth: authReducer,
});
