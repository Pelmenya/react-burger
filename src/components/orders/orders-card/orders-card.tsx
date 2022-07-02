import { useCallback } from 'react';
import cn from 'classnames';
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
import { useLocation, useNavigate } from 'react-router';
import { feedRegExp, profileRegExp } from '../../../utils/regexp';

export const OrdersCard = ({
  _id,
  status,
  name,
  number,
  ingredients: ingredientsIds,
  createdAt,
}: OrderType) => {
  const location = useLocation();
  const isFeed = feedRegExp.test(location.pathname);
  const isProfile = profileRegExp.test(location.pathname);
  const navigate = useNavigate();

  const { getTotalOrderCost, getViewOrderIngredients } = useOrder(ingredientsIds);
  const countNext = ingredientsIds.length - countIngredientsOfOrdersCard;

  const getOrderStatus = useCallback(
    () => {
      switch (status) {
        case 'created':
          return 'Создан';
        case 'pending':
          return 'Готовится';
        case 'done':
          return 'Выполнен';
        default: return 'Отменен'
      }
    },
    [
      status,
    ],
  );

  const handlerOnClick = () => {
    if (isFeed) navigate(`/feed/${_id}`, { state: { background: location } });
    if (isProfile) navigate(`/profile/orders/${_id}`, { state: { background: location } });
  };

  return (
    <div className={ordersCard.container} onClick={handlerOnClick}>
      <Flex className={ordersCard.wrapper}>
        <p className='text text_type_digits-default'>#{formatOrderNumber(String(number))}</p>
        <p className='text text_type_main-default text_color_inactive'>
          {formatOrderTime(createdAt)}
        </p>
      </Flex>
      <Title type='h5'>{name}</Title>
      {isProfile ? (
        <p
          className={cn(
            'text text_type_main-default mt-2',
            ordersCard.status,
            status === 'done' && 'text_color_interface',
          )}>
          {getOrderStatus()}
        </p>
      ) : (
        <></>
      )}
      <Flex className={ordersCard.wrapper}>
        <ul className={ordersCard.ingredients}>
          {getViewOrderIngredients()
            .reverse()
            .map((item, index) => (
              <IngredientPreview
                ingredient={item}
                key={shortid.generate()}
                lastCount={(index === 0 && countNext > 0 && countNext) || undefined}
              />
            ))}
        </ul>
        <span className='constructor-element__price'>
          {getTotalOrderCost()}
          <CurrencyIcon type='primary' />
        </span>
      </Flex>
    </div>
  );
};
