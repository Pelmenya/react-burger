
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getBurgerIngredientsState } from '../../services/redux/selectors/burger-ingredients';
import { feedRegExp } from '../../utils/regexp';
import { BadRequest } from '../bad-request/bad-request';
import { Flex } from '../flex/flex';
import { Loader } from '../loader/loader';
import { Title } from '../title/title';
import { OrdersList } from './orders-list/orders-list';
import ordersStyle from './orders.module.css';

export const Orders = () => {
  const { loading, error } = useSelector(getBurgerIngredientsState);
  const location = useLocation();
  const isFeed = feedRegExp.test(location.pathname)
  return <section className={cn(ordersStyle.container, isFeed ? ordersStyle.container_medium : ordersStyle.container_large) }>
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