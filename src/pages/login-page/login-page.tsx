import React, { useEffect } from 'react';
import * as yup from 'yup';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ProfileFormContainer } from '../../components/profile-form-container/profile-form-container';
import { useNavHeader } from '../../hooks/use-nav-header';
import { ButtonWithChildren } from '../../components/button-with-children/button-with-children';
import { InputEmail } from '../../components/profile-form-container/components/input-email/input-email';
import { InputPassword } from '../../components/profile-form-container/components/input-password/input-password';
import { useDispatch } from 'react-redux';
import { DispatchType } from '../../utils/types/dispatch-type';
import { postLogin } from '../../services/redux/slices/auth';
import { UserData } from '../../api/auth-api';

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

const links = [
  {
    question: 'Вы — новый пользователь?',
    link: 'Зарегистрироваться',
    path: '/register',
  },
  {
    question: 'Забыли пароль?',
    link: 'Восстановить пароль',
    path: '/forgot-password',
  },
];

export const LoginPage = () => {
  const { setActive } = useNavHeader();

  const dispatch = useDispatch<DispatchType>();

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = (data: FieldValues) => {
    dispatch(postLogin(data as Omit<UserData, 'name'>));
  };

  useEffect(
    () => {
      setActive('profile');
    },
    [
      setActive,
    ],
  );

  return (
    <main className='center-container'>
      <ProfileFormContainer title='Вход' links={links}>
        <form name='login' className='form' onSubmit={handleSubmit(onSubmit)}>
          <InputEmail error={!!errors.email} control={control} />
          <InputPassword error={!!errors.password} control={control} />
          <ButtonWithChildren type='primary' size='medium' onClick={handleSubmit(onSubmit)}>
            <span>Войти</span>
          </ButtonWithChildren>
        </form>
      </ProfileFormContainer>
    </main>
  );
};
