import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { countIngredientsOfOrdersCard } from '../../../utils/constants';
import { Flex } from '../../flex/flex';
import { IngredientPreview } from '../../ingredient-preview/ingredient-preview';
import { Title } from '../../title/title';
import ordersCard from './orders-card.module.css';

const number = '034534';
const time = 'Сегодня, 16:20 i-GMT+3';
const total = 589;
const ordersMock = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  4,
  5,
  6,
  7,
  8,
];

export const OrdersCard = ({ order }: any) => {
  const ingredients = ordersMock.filter((item, index) => index < countIngredientsOfOrdersCard);
  const countNext = ordersMock.length - countIngredientsOfOrdersCard;
  return (
    <Flex flexDirection='column' gap={24} className={ordersCard.container}>
      <Flex className={ordersCard.wrapper}>
        <p className='text text_type_digits-default'>#{number}</p>
        <p className='text text_type_main-default text_color_inactive'>{time}</p>
      </Flex>
      <Title type='h5'>{order.name}</Title>
      <Flex className={ordersCard.wrapper}>
        <ul className={ordersCard.ingredients}>
          {ingredients.map((item, index, arr) => (
            <IngredientPreview
              ingredient={order}
              key={order._id + index}
              zIndex={arr.length - index}
              lastCount={
                (index === countIngredientsOfOrdersCard - 1 && countNext > 0 && countNext) ||
                undefined
              }
            />
          ))}
        </ul>
        <span className='constructor-element__price'>
          {total}
          <CurrencyIcon type='primary' />
        </span>
      </Flex>
    </Flex>
  );
};
