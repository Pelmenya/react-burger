import { useSelector } from 'react-redux';
import { getBurgerIngredientsState } from '../services/redux/selectors/burger-ingredients';
import { countIngredientsOfOrdersCard } from '../utils/constants';

export const useOrder = (ingredientsIds: string[]) => {
  const { ingredients } = useSelector(getBurgerIngredientsState);

  const orderIngredients = ingredientsIds.map((id) =>
    ingredients.find((ingredient) => id === ingredient._id),
  );

  const getViewOrderIngredients = () => orderIngredients.slice(0, countIngredientsOfOrdersCard);

  const getTotalOrderCost = () => {
    return orderIngredients.reduce((acc, item) => {
      if (item) return acc + item.price;
      return acc;
    }, 0);
  };

  return { getViewOrderIngredients, getTotalOrderCost };
};
