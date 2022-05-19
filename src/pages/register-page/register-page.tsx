import React, { useEffect } from 'react';
import * as yup from 'yup';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ProfileFormContainer } from '../../components/profile-form-container/profile-form-container';
import { useNavHeader } from '../../hooks/useNavHeader';
import { ButtonWithChildren } from '../../components/button-with-children/button-with-children';
import { InputEmail } from '../../components/profile-form-container/components/input-email/input-email';
import { InputPassword } from '../../components/profile-form-container/components/input-password/input-password';
import { InputName } from '../../components/profile-form-container/components/input-name/input-name';
import { authAPI, UserData } from '../../api/auth-api';
import { useDispatch } from 'react-redux';
import { DispatchType } from '../../utils/types/dispatch-type';
import { setError } from '../../services/redux/slices/error-request';

const schema = yup
  .object({
    name: yup.string().min(2).required().matches(/^[А-ЯЁ][а-яё]+(-[А-ЯЁ][а-яё]*)?$/),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

const links = [
  {
    question: 'Уже зарегистрированы?',
    link: 'Войти',
    path: '/login',
  },
];

export const RegisterPage = () => {
  const dispatch = useDispatch<DispatchType>();

  const { setActive } = useNavHeader();

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = async (data: FieldValues) => {
    authAPI
      .postRegiter(data as UserData)
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
      <ProfileFormContainer title='Вход' links={links}>
        <form name='register' className='form' onSubmit={handleSubmit(onSubmit)}>
          <InputName error={!!errors.name} control={control} />
          <InputEmail error={!!errors.email} control={control} />
          <InputPassword error={!!errors.password} control={control} />
          <ButtonWithChildren type='primary' size='medium' onClick={handleSubmit(onSubmit)}>
            <span>Зарегистрироваться</span>
          </ButtonWithChildren>
        </form>
      </ProfileFormContainer>
    </main>
  );
};
