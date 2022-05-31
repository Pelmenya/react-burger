
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { getBurgerIngredientsState } from '../../services/redux/selectors/burger-ingredients';
import { BadRequest } from '../bad-request/bad-request';
import { Flex } from '../flex/flex';
import { Loader } from '../loader/loader';
import { Title } from '../title/title';
import { OrdersList } from './orders-list/orders-list';
import ordersStyle from './orders.module.css';

export const Orders = () => {
  const { loading, error } = useSelector(getBurgerIngredientsState);

  return <section className={cn(ordersStyle.container,  ordersStyle.container_medium) }>
      <Flex flexDirection='column'>
        <Title type='h2' className={cn(ordersStyle.title)}>
          Заказы
        </Title>
        <>
          {loading === 'pending' && <Loader />}
          {loading === 'succeeded' && <OrdersList />}
          {loading === 'failed' && <BadRequest error={error} />}
        </>
      </Flex>
    </section>
}