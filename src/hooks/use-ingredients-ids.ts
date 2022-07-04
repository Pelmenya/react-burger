import { getBurgerConstructorState } from '../services/redux/selectors/burger-constructor';
import { useAppSelector } from './use-app-selector';

export const useIngredientsIds = () => {
  const { bun, toppings } = useAppSelector(getBurgerConstructorState);

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
