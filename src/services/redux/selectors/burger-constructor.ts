import { BurgerConstructorStateType } from '../slices/burger-constructor';
interface State {
  burgerConstructor: BurgerConstructorStateType;
}

export const getBurgerConstructorState = (state: State) => state.burgerConstructor;