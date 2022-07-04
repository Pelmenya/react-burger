import { getBurgerIngredientsState } from '../services/redux/selectors/burger-ingredients';
import { countIngredientsOfOrdersCard } from '../utils/constants';
import { useAppSelector } from './use-app-selector';

export const useOrder = () => {
  const { ingredients } = useAppSelector(getBurgerIngredientsState);

  const orderIngredients = (ingredientsIds: string[]) =>
    ingredientsIds.map((id) => ingredients.find((ingredient) => id === ingredient._id));

  const getViewOrderIngredients = (ingredientsIds: string[]) =>
    orderIngredients(ingredientsIds).slice(0, countIngredientsOfOrdersCard);

  const getTotalOrderCost = (ingredientsIds: string[]) => {
    return orderIngredients(ingredientsIds).reduce((acc, item) => {
      if (item) return acc + item.price;
      return acc;
    }, 0);
  };

  const getOrderIngredients = (ingredientsIds: string[]) => {
    //console.log(orderIngredients(ingredientsIds))
    return ingredientsIds.map((id) => ingredients.find((ingredient) => id === ingredient._id));
  }

  return { getViewOrderIngredients, getTotalOrderCost, getOrderIngredients };
};
