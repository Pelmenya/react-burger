import { useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { feedRegExp, profileRegExp } from '../../utils/regexp';
import { Modal } from '../modal/modal';
import { Order } from '../order/order';

export const OrderModal = () => {
  const dispatch = useAppDispatch();
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
