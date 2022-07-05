import cn from 'classnames';
import { Flex } from '../flex/flex';
import { Title } from '../title/title';

import orderStyle from './order.module.css';

import { IngredientPreview } from '../ingredient-preview/ingredient-preview';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getOrdersState } from '../../services/redux/selectors/orders';
import { getOrderStatus } from '../../utils/functions/get-order-status';
import { formatOrderTime } from '../../utils/functions/format-order-time';
import { useEffect, useState } from 'react';
import { OrderType } from '../../utils/types/orders';
import { BurgerIngredientType } from '../../utils/types/burger-ingredient';
import { getBurgerIngredientsState } from '../../services/redux/selectors/burger-ingredients';

export const Order = () => {
  const { viewOrder } = useAppSelector(getOrdersState);
  const {  ingredients  } = useAppSelector(getBurgerIngredientsState);
  const [order, setOrder] = useState<OrderType & {total: number, ingredientsTotal:BurgerIngredientType[] }>();
  
  useEffect(() => {
    if (viewOrder) {
      if (ingredients){
        let total = 0;
        const orderIngredients = 
        viewOrder.ingredients
          .map((id) => ingredients
          .find((ingredient) => {
            if (id === ingredient._id){
              total= total + ingredient.price;
            }
            return id === ingredient._id
          }));

      let orderIngredientsTotal: BurgerIngredientType[] | never = [];
      orderIngredients.forEach((orderIngredient) => {
        const flag = orderIngredientsTotal.every(item => item._id !== orderIngredient?._id);
        if (flag) {
          if (orderIngredient) {
            orderIngredientsTotal.push({...orderIngredient, count: orderIngredients.filter(item => item?._id === orderIngredient?._id).length})
          }
        }
      })
      setOrder({
        ...viewOrder, 
        total: total, 
        ingredientsTotal: orderIngredientsTotal,
      });
      }
    }
  }, [viewOrder, ingredients])

  
  return (
    <section>
      <Title type='h1' className={orderStyle.h1}>Заказ</Title>
      <Flex flexDirection='column' className={orderStyle.container}>
        <Title type='h2'>{order?.name}</Title>
        <p
          className={cn(
            'text text_type_main-default mt-3 mb-15',
            order?.status === 'done' && 'text_color_interface',
          )}>
          {order ? getOrderStatus(String(order.status)) : ''}
        </p>
        <p className='text text_type_main-medium mb-6'>Состав:</p>
        <Flex flexDirection='column' className={cn(orderStyle.ingredients, 'pr-6')} gap={16}>
          {order?.ingredientsTotal.map((item) => (
            <Flex key={item._id} className={orderStyle.ingredients__card} gap={16}>
              <Flex className={orderStyle.ingredients__card} gap={16}>
                <IngredientPreview ingredient={item} />
                <Title className={orderStyle.ingredients__title}>{item?.name}</Title>
              </Flex>
              <span className={cn('constructor-element__price', orderStyle.ingredients__price)}>
                {`${item?.count} x `}
                {item?.price}
                <CurrencyIcon type='primary' />
              </span>
            </Flex>
          ))}
        </Flex>
        <Flex className={orderStyle.total}>
          <p className='text text_type_main-default text_color_inactive'>
            {order ? formatOrderTime(order.createdAt): ''}
          </p>
          <span className={cn('constructor-element__price', orderStyle.ingredients__price)}>
            {order ? order.total: ''}
            <CurrencyIcon type='primary' />
          </span>
        </Flex>
      </Flex>
    </section>
  );
};
