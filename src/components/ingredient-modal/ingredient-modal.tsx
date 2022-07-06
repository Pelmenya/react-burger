import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getBurgerIngredientsState } from '../../services/redux/selectors/burger-ingredients';
import { resetCurrentIngredient, setCurrentIngredient } from '../../services/redux/slices/current-ingredient';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';

export const IngredientModal = () => {
	const { ingredients } = useAppSelector(getBurgerIngredientsState);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

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

	const handlerOnCloseCurrentIngredientModal = useCallback(
    () => {
      navigate( '/', { state: null });
      dispatch(resetCurrentIngredient());
    },
    [
      dispatch,
      navigate,
    ],
  );
	
  return (
    <Modal title={'Детали ингредиента'} handlerOnClose={handlerOnCloseCurrentIngredientModal}>
      <IngredientDetails />
    </Modal>
  );
};
