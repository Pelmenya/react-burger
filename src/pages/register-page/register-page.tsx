import React, { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ProfileFormContainer } from '../../components/profile-form-container/profile-form-container';
import { useNavHeader } from '../../hooks/useNavHeader';
import { ButtonWithChildren } from '../../components/button-with-children/button-with-children';
import { InputEmail } from '../../components/profile-form-container/components/input-email/input-email';
import { InputPassword } from '../../components/profile-form-container/components/input-password/input-password';
import { InputText } from '../../components/profile-form-container/components/input-text/input-text';
import { authAPI, UserData } from '../../api/auth-api';
import { useDispatch } from 'react-redux';
import { DispatchType } from '../../utils/types/dispatch-type';
import { setError } from '../../services/redux/slices/error-request';
import { schemaProfileForm } from '../../utils/constants';

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
    resolver: yupResolver(schemaProfileForm),
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
    <main className='center-container'>
      <ProfileFormContainer title='Вход' links={links}>
        <form name='register' className='form' onSubmit={handleSubmit(onSubmit)}>
          <InputText error={!!errors.name} control={control} />
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
