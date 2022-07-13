import { ingredientMock } from '../../../../utils/mock';
import {
  currentIngredientReducer,
  initialCurrentIngredientState,
  resetCurrentIngredient,
  setCurrentIngredient,
} from './current-ingredient';

describe('Test reducer for Current Ingredient', () => {
  it('should return the initial state Current Ingredient', () => {
    expect(
      currentIngredientReducer({ ...initialCurrentIngredientState }, { type: undefined }),
    ).toEqual({
      isOpen: false,
    });
  });

  it('should return the state with current ingredient and open modal is true', () => {
    expect(
      currentIngredientReducer(
        { ...initialCurrentIngredientState },
        setCurrentIngredient({ ...ingredientMock }),
      ),
    ).toEqual({
      ingredient: { ...ingredientMock },
      isOpen: true,
    });
  });

	it('should return the state with undefined current ingredient and open modal is false', () => {
    expect(
      currentIngredientReducer(
        { ...initialCurrentIngredientState },
        resetCurrentIngredient(),
      ),
    ).toEqual({
      ingredient: undefined,
      isOpen: false,
    });
  });

});
