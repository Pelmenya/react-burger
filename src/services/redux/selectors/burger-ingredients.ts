import { BurgerIngredientsStateType } from '../slices/burger-ingredients';

interface State {
  burgerIngredients: BurgerIngredientsStateType;
}

export const getBurgerIngredientsState = (state: State) => state.burgerIngredients;
