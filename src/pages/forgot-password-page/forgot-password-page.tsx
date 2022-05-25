import React, { useEffect } from 'react';
import * as yup from 'yup';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ProfileFormContainer } from '../../components/profile-form-container/profile-form-container';
import { useNavHeader } from '../../hooks/use-nav-header';
import { ButtonWithChildren } from '../../components/button-with-children/button-with-children';
import { InputEmail } from '../../components/profile-form-container/components/input-email/input-email';
import { TForgotPassword } from '../../api/profile-api';
import { useDispatch, useSelector } from 'react-redux';
import { postForgotPassword } from '../../services/redux/slices/profile';
import { DispatchType } from '../../utils/types/dispatch-type';
import { getProfileState } from '../../services/redux/selectors/profile';
import { useNavigate } from 'react-router';

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

  const { passwordIsSend } = useSelector(getProfileState);
  const navigate = useNavigate();


  const dispatch = useDispatch<DispatchType>();

  const { setActive } = useNavHeader();

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = (data: FieldValues) => {
    dispatch(postForgotPassword(data as TForgotPassword));
  };

  useEffect(
    () => {
      passwordIsSend && navigate('/reset-password', { replace: true });
    },
    [
      passwordIsSend,
      navigate,
    ],
  );
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
