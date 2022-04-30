import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './slices/burger-ingredients';

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
});

