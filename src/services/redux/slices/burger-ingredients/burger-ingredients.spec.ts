import { errorMessageMock, errorMock, ingredientMock } from '../../../../utils/mock';
import {
  burgerIngredientsReducer,
  fetchIngredients,
  initialIngredientsState,
  resetCountIngredients,
  setCurrentTab,
  updateCountIngredient,
} from './burger-ingredients';

describe('Test reducer for Burger Ingredients', () => {
  it('should return the initial state', () => {
    expect(burgerIngredientsReducer({ ...initialIngredientsState }, { type: undefined })).toEqual({
      loading: 'idle',
      currentTab: 'buns',
      ingredients: [],
    });
  });

  it('should return the current tab sauces', () => {
    expect(
      burgerIngredientsReducer({ ...initialIngredientsState }, setCurrentTab('sauces')),
    ).toEqual({
      loading: 'idle',
      currentTab: 'sauces',
      ingredients: [],
    });
  });

  it('should return the current tab toppings', () => {
    expect(
      burgerIngredientsReducer({ ...initialIngredientsState }, setCurrentTab('toppings')),
    ).toEqual({
      loading: 'idle',
      currentTab: 'toppings',
      ingredients: [],
    });
  });

  it('should return the ingredients with count', () => {
    expect(
      burgerIngredientsReducer(
        { ...initialIngredientsState },
        updateCountIngredient([
          { ...ingredientMock, count: 1 },
          { ...ingredientMock, count: 2 },
        ]),
      ),
    ).toEqual({
      loading: 'idle',
      currentTab: 'buns',
      ingredients: [
        { ...ingredientMock, count: 1 },
        { ...ingredientMock, count: 2 },
      ],
    });
  });

  it('should return the ingredients with count 0', () => {
    expect(
      burgerIngredientsReducer(
        {
          loading: 'idle',
          currentTab: 'buns',
          ingredients: [
            { ...ingredientMock, count: 1 },
            { ...ingredientMock, count: 2 },
          ],
        },
        resetCountIngredients(),
      ),
    ).toEqual({
      loading: 'idle',
      currentTab: 'buns',
      ingredients: [
        { ...ingredientMock, count: 0 },
        { ...ingredientMock, count: 0 },
      ],
    });
  });

  it('should return undefined error and status loading is pending for fetch ingredients', () => {
    const action = fetchIngredients.pending('');
    expect(burgerIngredientsReducer({ ...initialIngredientsState }, action)).toStrictEqual({
      ...initialIngredientsState,
      error: undefined,
      loading: 'pending',
    });
  });

  it('should return undefined error and status loading is fulfilled for fetch ingredients', () => {
    const action = fetchIngredients.fulfilled(
      [
        { ...ingredientMock },
        { ...ingredientMock },
      ],
      '',
    );
    expect(burgerIngredientsReducer({ ...initialIngredientsState }, action)).toStrictEqual({
      ...initialIngredientsState,
      ingredients: [
        { ...ingredientMock },
        { ...ingredientMock },
      ],
      loading: 'succeeded',
    });
  });

  it('should return error message "Error" and status loading is failed for fetch ingredients', () => {
    const action = fetchIngredients.rejected(errorMock, '');
    expect(burgerIngredientsReducer({ ...initialIngredientsState }, action)).toStrictEqual({
      ...initialIngredientsState,
      error: errorMessageMock,
      loading: 'failed',
    });
  });
});
