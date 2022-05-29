import { useSelector } from 'react-redux';
import { getBurgerConstructorState } from '../services/redux/selectors/burger-constructor';

export const useIngredientsIds = () => {
  const { bun, toppings } = useSelector(getBurgerConstructorState);

  let orderIngredientsIds = [] as string[];
  if (toppings.length)
	orderIngredientsIds = [
      ...orderIngredientsIds,
      ...toppings.map((item) => item._id),
    ];
  if (bun?._id) {
    orderIngredientsIds.unshift(bun._id);
    orderIngredientsIds.push(bun._id);
  }

  return { orderIngredientsIds };
};
