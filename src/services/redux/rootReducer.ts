import { combineReducers } from 'redux';
import { burgerConstractorReducer } from './slices/burger-constructor';
import { burgerIngredientsReducer } from './slices/burger-ingredients';
import { currentIngredientReducer } from './slices/current-ingredient';
import { orderReducer } from './slices/order';

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstractor: burgerConstractorReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
});
