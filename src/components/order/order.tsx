import cn from 'classnames';
import { Flex } from '../flex/flex';
import { Title } from '../title/title';

import orderStyle from './order.module.css';

import { mock } from '../orders/orders-list/mock';
import { IngredientPreview } from '../ingredient-preview/ingredient-preview';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const Order = () => {
  return (
    <section>
      <Title type='h1' className={orderStyle.h1}>
        Заказ
      </Title>
      <Flex flexDirection='column' className={orderStyle.container}>
        <p className={cn('text text_type_digits-default mb-10', orderStyle.number)}>#{'004567'}</p>
        <Title type='h2'>{mock[0].name}</Title>
        <p className='text text_type_main-default text_color_interface mt-3 mb-15'>Выполнен</p>
        <p className='text text_type_main-medium mb-6'>Состав:</p>
        <Flex flexDirection='column' className={cn(orderStyle.ingredients, 'pr-6')} gap={16}>
          {mock.map((item) => (
            <Flex className={orderStyle.ingredients__card} gap={16}>
              <Flex className={orderStyle.ingredients__card} gap={16}>
                <IngredientPreview ingredient={item} />
                <Title className={orderStyle.ingredients__title}>{item.name}</Title>
              </Flex>
              <span className={cn('constructor-element__price', orderStyle.ingredients__price)}>
                {'3 x '}
                {item.price}
                <CurrencyIcon type='primary' />
              </span>
            </Flex>
          ))}
        </Flex>
        <Flex className={orderStyle.total}>
          <p className='text text_type_main-default text_color_inactive'>
            {'Вчера, 13:50 i-GMT+3'}
          </p>
          <span className={cn('constructor-element__price', orderStyle.ingredients__price)}>
            {550}
            <CurrencyIcon type='primary' />
          </span>
        </Flex>
      </Flex>
    </section>
  );
};
