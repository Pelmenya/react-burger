import React, { useEffect } from 'react';
import * as yup from 'yup';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ProfileFormContainer } from '../../components/profile-form-container/profile-form-container';
import { useNavHeader } from '../../hooks/useNavHeader';
import { ButtonWithChildren } from '../../components/button-with-children/button-with-children';
import { InputText } from '../../components/profile-form-container/components/input-text/input-text';
import { InputPassword } from '../../components/profile-form-container/components/input-password/input-password';
import { TResetPassword, userAPI } from '../../api/user-api';
import { useDispatch } from 'react-redux';
import { setError } from '../../services/redux/slices/error-request';

const schema = yup
  .object({
    password: yup.string().min(6).required(),
    token: yup.string().min(2).required(),
  })
  .required();

const links = [
  {
    question: 'Вспомнили пароль?',
    link: 'Войти',
    path: '/login',
  },
];

export const ResetPasswordPage = () => {
  const { setActive } = useNavHeader();
  const dispatch = useDispatch();

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = (data: FieldValues) => {
    userAPI
      .postResetPassword(data as TResetPassword)
      .then((data) => console.log(data))
      .catch((err) => dispatch(setError(err)));
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
    <main className='notAuth-container'>
      <ProfileFormContainer title='Восстановление пароля' links={links}>
        <form name='forgotPassword' className='form' onSubmit={handleSubmit(onSubmit)}>
          <InputPassword
            error={!!errors.password}
            control={control}
            placeholder='Введите новый пароль'
          />
          <InputText
            error={!!errors.token}
            control={control}
            placeholder='Введите код из письма'
            type='token'
          />
          <ButtonWithChildren type='primary' size='medium' onClick={handleSubmit(onSubmit)}>
            <span>Сохранить</span>
          </ButtonWithChildren>
        </form>
      </ProfileFormContainer>
    </main>
  );
};
