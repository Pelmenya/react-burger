import { useEffect } from 'react';
import { useParams } from 'react-router';
import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';
import { Loader } from '../../components/loader/loader';
import { Title } from '../../components/title/title';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getBurgerIngredientsState } from '../../services/redux/selectors/burger-ingredients';
import { setCurrentIngredient } from '../../services/redux/slices/current-ingredient';

export const IngredientPage = () => {
  const { ingredients, loading } = useAppSelector(getBurgerIngredientsState);
  const dispatch = useAppDispatch();
  const isLoading = loading === 'pending';

  const { id } = useParams();

  useEffect(
    () => {
      if (id && ingredients)
        dispatch(setCurrentIngredient(ingredients.find((item) => item._id === id)));
    },
    [
      id,
      ingredients,
      dispatch,
    ],
  );

  return isLoading ? (
    <Loader />
  ) : (
    <main className='main-column-center pt-30'>
      <Title type='h1'>Детали ингредиента</Title>
      <IngredientDetails />
    </main>
  );
};
