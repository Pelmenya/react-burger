import { getBurgerConstructorState } from '../services/redux/selectors/burger-constructor';
import { maxCountBuns } from '../utils/constants';
import { useAppSelector } from './use-app-selector';

export const useTotalCostOrder = () => {
  const { bun, toppings } = useAppSelector(getBurgerConstructorState);
 
	let totalCost = 0;

	if (bun?.price) totalCost = totalCost + maxCountBuns * bun.price;
  totalCost = totalCost  + toppings.reduce((acc, item) => acc + item.price, 0);

  return { totalCost };
};
