import React, { useEffect } from 'react';
import * as yup from 'yup';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ProfileFormContainer } from '../../components/profile-form-container/profile-form-container';
import { useNavHeader } from '../../hooks/use-nav-header';
import { ButtonWithChildren } from '../../components/button-with-children/button-with-children';
import { InputText } from '../../components/profile-form-container/components/input-text/input-text';
import { InputPassword } from '../../components/profile-form-container/components/input-password/input-password';
import { TResetPassword } from '../../api/profile-api';
import { postResetPassword } from '../../services/redux/slices/profile';
import { getProfileState } from '../../services/redux/selectors/profile';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';

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
  const { passwordIsSend, loading } = useAppSelector(getProfileState);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { setActive } = useNavHeader();

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = (data: FieldValues) => {
    dispatch(postResetPassword(data as TResetPassword));
  };

  useEffect(
    () => {
      !passwordIsSend && navigate('/login', { replace: true });
    },
    [
      passwordIsSend,
      navigate,
    ],
  );

  useEffect(
    () => {
      setActive('');
    },
    [
      setActive,
    ],
  );

  return (
    <main className='center-container'>
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
            name='token'
          />
          <ButtonWithChildren
            loading={loading === 'pending'}
            type='primary'
            size='medium'
          >
            <span>Сохранить</span>
          </ButtonWithChildren>
        </form>
      </ProfileFormContainer>
    </main>
  );
};
