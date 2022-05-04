import { useSelector } from 'react-redux';
import { getBurgerConstructorState } from '../services/redux/selectors/burger-constructor';
import { maxCountBuns } from '../utils/constants';

export const useTotalCostOrder = () => {
  const { bun, toppings } = useSelector(getBurgerConstructorState);
 
	let totalCost = 0;

	if (bun?.price) totalCost = totalCost + maxCountBuns * bun.price;
  totalCost = totalCost  + toppings.reduce((acc, item) => acc + item.price, 0);

  return { totalCost };
};
