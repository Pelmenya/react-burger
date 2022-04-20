import React, { useState } from 'react';
import PropTypes from 'prop-types';

import burgerIngridientsCard from './burger-ingredients-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Title } from '../../../title/title';
import { Modal } from '../../../modal/modal';
import { IngredientDitails } from '../../../ingredient-details/ingredient-details';
import { dataItemType } from '../../../../utils/prop-types/data-types';

export const BurgerIngridientsCard = ({ data, count }) => {
  const [
    isOpenModal,
    setIsOpenModal,
  ] = useState(false);

  const handlerOnClick = () => setIsOpenModal(true);
  const handlerOnCloseModal = () => setIsOpenModal(false);

  return (
    <div>
      <div className={burgerIngridientsCard.container} onClick={handlerOnClick}>
        {count && <Counter count={count} size='default' />}
        <img alt={data.name} src={data.image} className={burgerIngridientsCard.img} />
        <div className='constructor-element__price mt-2 mb-2'>
          {data.price}
          <CurrencyIcon type='primary' />
        </div>
        <Title className={burgerIngridientsCard.title}>{data.name}</Title>
      </div>
      {isOpenModal && (
        <Modal title={'Детали ингредиента'} handlerOnClose={handlerOnCloseModal}>
          <IngredientDitails data={data} />
        </Modal>
      )}
    </div>
  );
};

IngredientDitails.propTypes = { data: dataItemType, count: PropTypes.number };
