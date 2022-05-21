import cn from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getMenuProfileState } from '../../services/redux/selectors/menu-profile';
import { setActiveItem } from '../../services/redux/slices/menu-profile';

import menu from './menu-profile.module.css';

const menuList = [
  {
    id: 'profile',
    linkTo: '/profile',
    text: 'Профиль',
    tip: 'В этом разделе вы можете изменить свои персональные данные',
  },
  {
    id: 'orders',
    linkTo: '/profile/orders',
    text: 'История заказов',
    tip: 'В этом разделе вы можете просмотреть свою историю заказов',
  },
  {
    id: 'logout',
    linkTo: '/',
    text: 'Выход',
    tip: 'Да новых встреч !!!',
  },
];

export const MenuProfile = () => {
  const { activeItem } = useSelector(getMenuProfileState);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  return (
    <div>
      <ul className={cn('text text_type_main-medium pl-5', menu.list)}>
        {menuList.map((item) => (
          <li
            key={item.id}
            className={cn(menu.item, 'pt-4 pb-4', activeItem === item.id && menu.item_active)}
            onClick={() =>
              activeItem !== item.id && dispatch(setActiveItem(item.id)) && navigate(item.linkTo, {replace: true})}>
            {item.text}
          </li>
        ))}
      </ul>
      <div>
        {menuList.map(
          (item) =>
            activeItem === item.id && (
              <p key={item.id} className={cn(menu.tip, 'text text_type_main-default pl-5')}>
                {item.tip}
              </p>
            ),
        )}
      </div>
    </div>
  );
};
