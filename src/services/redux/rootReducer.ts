import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './slices/burger-constructor';
import { burgerIngredientsReducer } from './slices/burger-ingredients';
import { currentIngredientReducer } from './slices/current-ingredient';
import { errorRequestReducer } from './slices/error-request';
import { headerNavReducer } from './slices/header-nav';
import { orderReducer } from './slices/order';

export const rootReducer = combineReducers({
  errorRequest: errorRequestReducer,  
  headerNav: headerNavReducer,
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
});
