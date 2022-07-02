import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { feedRegExp, profileRegExp } from '../../utils/regexp';
import { DispatchType } from '../../utils/types/dispatch-type';
import { Modal } from '../modal/modal';
import { Order } from '../order/order';

export const OrderModal = () => {
  const dispatch = useDispatch<DispatchType>();
  const navigate = useNavigate();
  const location = useLocation();
  const isFeed = feedRegExp.test(location.pathname);
  const isProfile = profileRegExp.test(location.pathname);
	
  const { id } = useParams();

  /*   useEffect(
    () => {
      if (id && ingredients)
        dispatch(setCurrentIngredient(ingredients.find((item) => item._id === id)));
    },
    [
      id,
      ingredients,
      dispatch,
    ],
  );
*/
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
    <Modal title={'Детали заказа'} handlerOnClose={handlerOnCloseCurrentOrderModal}>
      <Order />
    </Modal>
  );
};
