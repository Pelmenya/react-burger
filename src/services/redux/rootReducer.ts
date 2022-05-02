import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './slices/burger-constructor';
import { burgerIngredientsReducer } from './slices/burger-ingredients';
import { currentIngredientReducer } from './slices/current-ingredient';
import { orderReducer } from './slices/order';

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
});
