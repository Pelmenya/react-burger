import { CurrentIngredientStateType } from "../slices/current-ingredient";

interface State {
  currentIngredient: CurrentIngredientStateType;
}

export const getCurrentIngredientState = (state: State) => state.currentIngredient;
