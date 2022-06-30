import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import shortid from 'shortid';
import { useOrder } from '../../../hooks/use-order';
import { countIngredientsOfOrdersCard } from '../../../utils/constants';
import { formatOrderNumber } from '../../../utils/functions/formatOrderNumber';
import { formatOrderTime } from '../../../utils/functions/formatOrderTime';
import { OrderType } from '../../../utils/types/orders';
import { Flex } from '../../flex/flex';
import { IngredientPreview } from '../../ingredient-preview/ingredient-preview';
import { Title } from '../../title/title';
import ordersCard from './orders-card.module.css';

//const number = '034534';
const time = 'Сегодня, 16:20 i-GMT+3';

export const OrdersCard = ({
  status,
  name,
  number,
  ingredients: ingredientsIds,
  createdAt,
}: OrderType) => {
  const { getTotalOrderCost, getViewOrderIngredients } = useOrder(ingredientsIds);
  const countNext = ingredientsIds.length - countIngredientsOfOrdersCard;

  return (
    <Flex flexDirection='column' gap={24} className={ordersCard.container}>
      <Flex className={ordersCard.wrapper}>
        <p className='text text_type_digits-default'>#{formatOrderNumber(String(number))}</p>
        <p className='text text_type_main-default text_color_inactive'>{formatOrderTime(createdAt)}</p>
      </Flex>
      <Title type='h5'>{name}</Title>
      <p className='text text_type_digits-default'>{status}</p>
      <Flex className={ordersCard.wrapper}>
        <ul className={ordersCard.ingredients}>
          {getViewOrderIngredients().map((item, index, arr) => (
            <IngredientPreview
              ingredient={item}
              key={shortid.generate()}
              zIndex={arr.length - index}
              lastCount={
                (index === countIngredientsOfOrdersCard - 1 && countNext > 0 && countNext) ||
                undefined
              }
            />
          ))}
        </ul>
        <span className='constructor-element__price'>
          {getTotalOrderCost()}
          <CurrencyIcon type='primary' />
        </span>
      </Flex>
    </Flex>
  );
};
