import { combineReducers } from 'redux';
import { authReducer } from './slices/auth';
import { burgerConstructorReducer } from './slices/burger-constructor';
import { burgerIngredientsReducer } from './slices/burger-ingredients';
import { currentIngredientReducer } from './slices/current-ingredient';
import { errorRequestReducer } from './slices/error-request';
import { headerNavReducer } from './slices/header-nav';
import { menuProfileReducer } from './slices/menu-profile';
import { orderReducer } from './slices/order';
import { profileReducer } from './slices/profile';

export const rootReducer = combineReducers({
  errorRequest: errorRequestReducer,  
  headerNav: headerNavReducer,
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  currentIngredient: currentIngredientReducer,
  menuProfile: menuProfileReducer,
  order: orderReducer,
  profile: profileReducer,
  auth: authReducer,
});
