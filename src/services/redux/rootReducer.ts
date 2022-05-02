import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './slices/burger-ingredients';
import { currentIngredientReducer } from './slices/current-ingredient';

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  currentIngredient: currentIngredientReducer,
});
