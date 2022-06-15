import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';
import { Loader } from '../../components/loader/loader';
import { Title } from '../../components/title/title';
import { getBurgerIngredientsState } from '../../services/redux/selectors/burger-ingredients';
import { setCurrentIngredient } from '../../services/redux/slices/current-ingredient';
import { DispatchType } from '../../utils/types/dispatch-type';

export const IngredientPage = () => {
  const { ingredients, loading } = useSelector(getBurgerIngredientsState);
  const dispatch = useDispatch<DispatchType>();
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
