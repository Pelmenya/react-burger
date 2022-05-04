import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import tabContainer from './tab-container.module.css';
import { BurgerIngredientsList } from '../burger-ingredients-list/burger-ingredients-list';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTab } from '../../../../services/redux/slices/burger-ingredients';
import { Flex } from '../../../flex/flex';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { getBurgerIngredientsState } from '../../../../services/redux/selectors/burger-ingredients';

export const TabContainer = () => {
  const dispatch = useDispatch();
  const { ingredients, currentTab } = useSelector(getBurgerIngredientsState);

  const tabContainerRef = useRef(null);
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const toppingsRef = useRef(null);

  const buns = useMemo(() => ingredients.filter((item) => item.type === 'bun'), [
    ingredients,
  ]);

  const sauces = useMemo(() => ingredients.filter((item) => item.type === 'sauce'), [
    ingredients,
  ]);

  const toppings = useMemo(() => ingredients.filter((item) => item.type === 'main'), [
    ingredients,
  ]);

  const handlerScrollTabContainer = useCallback(
    () => {
      const topArr = [
        {
          type: 'buns',
          value: Math.abs(
            bunsRef.current.getBoundingClientRect().top -
              tabContainerRef.current.getBoundingClientRect().top,
          ),
        },
        {
          type: 'sauces',
          value: Math.abs(
            saucesRef.current.getBoundingClientRect().top -
              tabContainerRef.current.getBoundingClientRect().top,
          ),
        },
        {
          type: 'toppings',
          value: Math.abs(
            toppingsRef.current.getBoundingClientRect().top -
              tabContainerRef.current.getBoundingClientRect().top,
          ),
        },
      ];
      const sortTopArr = topArr.sort((a, b) => a.value - b.value);
      dispatch(setCurrentTab(sortTopArr[0].type));
    },
    [
      tabContainerRef,
      bunsRef,
      saucesRef,
      toppingsRef,
      dispatch,
    ],
  );

  const handlerOnClickBuns = useCallback(
    () => {
      tabContainerRef.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      dispatch(setCurrentTab('buns'));
    },
    [
      dispatch,
    ],
  );

  const handlerOnClickToppings = useCallback(
    () => {
      tabContainerRef.current.scrollTo({
        left: 0,
        top:
          bunsRef.current.getBoundingClientRect().height +
          saucesRef.current.getBoundingClientRect().height,
        behavior: 'smooth',
      });
      dispatch(setCurrentTab('toppings'));
    },
    [
      dispatch,
    ],
  );

  const handlerOnClickSauces = useCallback(
    () => {
      tabContainerRef.current.scrollTo({
        left: 0,
        top: bunsRef.current.getBoundingClientRect().height,
        behavior: 'smooth',
      });
      dispatch(setCurrentTab('sauces'));
    },
    [
      dispatch,
    ],
  );

  useEffect(() => {
    const element = tabContainerRef.current;
    element.addEventListener('scroll', handlerScrollTabContainer);
    return () => element.removeEventListener('scroll', handlerScrollTabContainer);
  });

  return (
    <div>
      <Flex className={'pt-5 pb-10'}>
        <Tab value='buns' active={currentTab === 'buns'} onClick={handlerOnClickBuns}>
          Булки
        </Tab>
        <Tab value='sauces' active={currentTab === 'sauces'} onClick={handlerOnClickSauces}>
          Соусы
        </Tab>
        <Tab value='toppings' active={currentTab === 'toppings'} onClick={handlerOnClickToppings}>
          Начинки
        </Tab>
      </Flex>
      <div className={tabContainer.container} ref={tabContainerRef}>
        <BurgerIngredientsList reference={bunsRef} title='Булки' ingredients={buns} />
        <BurgerIngredientsList reference={saucesRef} title='Соусы' ingredients={sauces} />
        <BurgerIngredientsList reference={toppingsRef} title='Начинки' ingredients={toppings} />
      </div>
    </div>
  );
};
