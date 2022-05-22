import React, { useEffect } from 'react';
import * as yup from 'yup';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ProfileFormContainer } from '../../components/profile-form-container/profile-form-container';
import { useNavHeader } from '../../hooks/useNavHeader';
import { ButtonWithChildren } from '../../components/button-with-children/button-with-children';
import { InputEmail } from '../../components/profile-form-container/components/input-email/input-email';
import { TForgotPassword, userAPI } from '../../api/user-api';
import { useDispatch } from 'react-redux';
import { setError } from '../../services/redux/slices/error-request';

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

const links = [
  {
    question: 'Вспомнили пароль?',
    link: 'Войти',
    path: '/login',
  },
];

export const ForgotPasswordPage = () => {
  const { setActive } = useNavHeader();
  const dispatch = useDispatch();

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = (data: FieldValues) => {
    userAPI
      .postForgotPassword(data as TForgotPassword)
      .then((data) => console.log(data))
      .catch((err) => dispatch(setError(err)));

    console.log(data);
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
      <ProfileFormContainer title='Восстановление пароля' links={links}>
        <form name='forgotPassword' className='form' onSubmit={handleSubmit(onSubmit)}>
          <InputEmail error={!!errors.email} control={control} placeholder='Укажите e-mail' />
          <ButtonWithChildren type='primary' size='medium' onClick={handleSubmit(onSubmit)}>
            <span>Восстановить</span>
          </ButtonWithChildren>
        </form>
      </ProfileFormContainer>
    </main>
  );
};
