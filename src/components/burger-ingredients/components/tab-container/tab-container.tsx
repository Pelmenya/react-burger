import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import tabContainer from './tab-container.module.css';
import { BurgerIngredientsList } from '../burger-ingredients-list/burger-ingredients-list';
import { setCurrentTab } from '../../../../services/redux/slices/burger-ingredients/burger-ingredients';
import { Flex } from '../../../flex/flex';
import { getBurgerIngredientsState } from '../../../../services/redux/selectors/burger-ingredients';
import { TabWithChildren } from '../../../../hocs/with-tab';
import { Nullable } from '../../../../utils/types/nullable';
import { useAppDispatch } from '../../../../hooks/use-app-dispatch';
import { useAppSelector } from '../../../../hooks/use-app-selector';

export const TabContainer = () => {
  const dispatch = useAppDispatch();
  const [
    tab,
    setTab,
  ] = useState<Nullable<string>>(null);
  const { ingredients, currentTab } = useAppSelector(getBurgerIngredientsState);

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
      if (bunsRef.current && tabContainerRef.current && saucesRef.current && toppingsRef.current) {
        const tabContainer = tabContainerRef.current as HTMLDivElement;
        const buns = bunsRef.current as HTMLDivElement;
        const sauces = saucesRef.current as HTMLDivElement;
        const toppings = toppingsRef.current as HTMLDivElement;

        const topArr = [
          {
            type: 'buns',
            value: Math.abs(
              buns.getBoundingClientRect().top - tabContainer.getBoundingClientRect().top,
            ),
          },
          {
            type: 'sauces',
            value: Math.abs(
              sauces.getBoundingClientRect().top - tabContainer.getBoundingClientRect().top,
            ),
          },
          {
            type: 'toppings',
            value: Math.abs(
              toppings.getBoundingClientRect().top - tabContainer.getBoundingClientRect().top,
            ),
          },
        ];
        const sortTopArr = topArr.sort((a, b) => a.value - b.value);
        dispatch(setCurrentTab(sortTopArr[0].type));
      }
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
      if (bunsRef.current) {
        const buns = bunsRef.current as HTMLDivElement;
        buns.scrollIntoView({ behavior: 'smooth' });
        dispatch(setCurrentTab('buns'));
      }
    },
    [
      dispatch,
    ],
  );

  const handlerOnClickToppings = useCallback(
    () => {
      if (toppingsRef.current) {
        const toppings = toppingsRef.current as HTMLDivElement;
        toppings.scrollIntoView({ behavior: 'smooth' });
        dispatch(setCurrentTab('toppings'));
      }
    },
    [
      dispatch,
    ],
  );

  const handlerOnClickSauces = useCallback(
    () => {
      if (saucesRef.current) {
        const sauces = saucesRef.current as HTMLDivElement;
        sauces.scrollIntoView({ behavior: 'smooth' });
        dispatch(setCurrentTab('sauces'));
      }
    },
    [
      dispatch,
    ],
  );

  useEffect(
    () => {
      if (!tab) {
        setTab(currentTab);
        dispatch(setCurrentTab('buns'));
      }
    },
    [
      currentTab,
      tab,
      setTab,
      dispatch,
    ],
  );

  useEffect(() => {
    if (tabContainerRef.current) {
      const element = tabContainerRef.current as HTMLDivElement;
      element.addEventListener('scroll', handlerScrollTabContainer);
      return () => element.removeEventListener('scroll', handlerScrollTabContainer);
    }
  });

  return (
    <div>
      <Flex className={'pt-5 pb-10'}>
        <TabWithChildren value='buns' active={currentTab === 'buns'} onClick={handlerOnClickBuns}>
          <span>??????????</span>
        </TabWithChildren>
        <TabWithChildren
          value='sauces'
          active={currentTab === 'sauces'}
          onClick={handlerOnClickSauces}>
          <span>??????????</span>
        </TabWithChildren>
        <TabWithChildren
          value='toppings'
          active={currentTab === 'toppings'}
          onClick={handlerOnClickToppings}>
          <span>??????????????</span>
        </TabWithChildren>
      </Flex>
      <div className={tabContainer.container} ref={tabContainerRef}>
        <BurgerIngredientsList reference={bunsRef} title='??????????' ingredients={buns} />
        <BurgerIngredientsList reference={saucesRef} title='??????????' ingredients={sauces} />
        <BurgerIngredientsList reference={toppingsRef} title='??????????????' ingredients={toppings} />
      </div>
    </div>
  );
};
