import React, { useCallback } from 'react';

import { Flex } from '../flex/flex';
import { Title } from '../title/title';
import { TabContainer } from './components/tab-container/tab-container';

import burgerIngredients from './burger-ingredients.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getBurgerIngredientsState } from '../../services/redux/selectors/burger-ingredients';
import { Loader } from '../loader/loader';
import { useDrop } from 'react-dnd';
import { BadRequest } from '../bad-request/bad-request';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { getCurrentIngredientState } from '../../services/redux/selectors/current-ingredient';
import { resetCurrentIngredient } from '../../services/redux/slices/current-ingredient';

export const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(getBurgerIngredientsState);
  const { isOpen: isOpenCurrentIngredientModal, ingredient } = useSelector(
    getCurrentIngredientState,
  );
  const [
    ,
    dropRef,
  ] = useDrop({
    accept: 'ingredient',
  });
  const handlerOnCloseCurrentIngredientModal = useCallback(
    () => {
      dispatch(resetCurrentIngredient());
    },
    [
      dispatch,
    ],
  );
  return (
    <section className={burgerIngredients.tab} ref={dropRef}>
      <Flex flexDirection='column'>
        <Title type='h2' className={burgerIngredients.title}>
          Ингредиенты бургера
        </Title>
        {loading === 'pending' && <Loader />}
        {loading === 'succeeded' && <TabContainer />}
        {loading === 'failed' && <BadRequest error={error} />}
      </Flex>
      {isOpenCurrentIngredientModal && (
        <Modal title={'Детали ингредиента'} handlerOnClose={handlerOnCloseCurrentIngredientModal}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </section>
  );
};
