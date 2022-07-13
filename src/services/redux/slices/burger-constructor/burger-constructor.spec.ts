import { ingredientMock } from '../../../../utils/mock';
import {
  initialBurgerConstructorState,
  burgerConstructorReducer,
  setBun,
  setToppings,
  resetBurgerConstructor,
} from './burger-constructor';

describe('Test reducer for Burger Constructor', () => {
  it('should return the initial state Burger Constructor', () => {
    expect(
      burgerConstructorReducer({ ...initialBurgerConstructorState }, { type: undefined }),
    ).toEqual({
      toppings: [],
    });
  });

  it('should return the state with bun', () => {
    expect(
      burgerConstructorReducer({ ...initialBurgerConstructorState }, setBun({ ...ingredientMock })),
    ).toEqual({
      bun: { ...ingredientMock },
      toppings: [],
    });
  });

  it('should return the state with toppings', () => {
    expect(
      burgerConstructorReducer(
        { ...initialBurgerConstructorState },
        setToppings([
          { ...ingredientMock },
          { ...ingredientMock },
        ]),
      ),
    ).toEqual({
      toppings: [
        { ...ingredientMock },
        { ...ingredientMock },
      ],
    });
  });

  it('should return the state with initial igredients', () => {
    expect(
      burgerConstructorReducer(
        {
          bun: { ...ingredientMock },
          toppings: [
            { ...ingredientMock },
            { ...ingredientMock },
            { ...ingredientMock },
            { ...ingredientMock },
          ],
        },
        resetBurgerConstructor(),
      ),
    ).toEqual({
      bun: undefined,
      toppings: [],
    });
  });
});
