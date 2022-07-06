import { useCallback } from 'react';
import cn from 'classnames';
import { useLocation, useNavigate, useParams } from 'react-router';
import { feedRegExp, profileRegExp } from '../../utils/regexp';
import { Modal } from '../modal/modal';
import { Order } from '../order/order';
import { Spacer } from '../spacer/spacer';
import orderModal from './order-modal.module.css';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getOrdersState } from '../../services/redux/selectors/orders';
import { useViewOrder } from '../../hooks/use-view-order';
import { formatOrderNumber } from '../../utils/functions/format-order-number';

export const OrderModal = () => {
  const { viewOrder } = useAppSelector(getOrdersState);
  const navigate = useNavigate();
  const location = useLocation();
  const isFeed = feedRegExp.test(location.pathname);
  const isProfile = profileRegExp.test(location.pathname);
  const { id } = useParams();

  useViewOrder(id);


  const handlerOnCloseCurrentOrderModal = useCallback(
    () => {
      if (isFeed) navigate(`/feed`, { state: null });
      if (isProfile) navigate(`/profile/orders`, { state: null });
    },
    [
      navigate,
      isFeed,
      isProfile,
    ],
  );

  return (
    <Modal title={<span className={cn('text text_type_digits-default', orderModal.number)}>{viewOrder && `#${formatOrderNumber(String(viewOrder.number))}`}</span>} handlerOnClose={handlerOnCloseCurrentOrderModal}>
      <>
        <Spacer spaceHeight={20}/>
        <Order />
      </>
    </Modal>
  );
};
