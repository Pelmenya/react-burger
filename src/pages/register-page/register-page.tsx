import React, { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ProfileFormContainer } from '../../components/profile-form-container/profile-form-container';
import { useNavHeader } from '../../hooks/use-nav-header';
import { ButtonWithChildren } from '../../components/button-with-children/button-with-children';
import { InputEmail } from '../../components/profile-form-container/components/input-email/input-email';
import { InputPassword } from '../../components/profile-form-container/components/input-password/input-password';
import { InputText } from '../../components/profile-form-container/components/input-text/input-text';
import { UserData } from '../../api/auth-api';
import { schemaProfileForm } from '../../utils/constants';
import { postRegister } from '../../services/redux/slices/auth/auth';
import { getAuthState } from '../../services/redux/selectors/auth';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';

const links = [
  {
    question: 'Уже зарегистрированы?',
    link: 'Войти',
    path: '/login',
  },
];

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(getAuthState);

  const { setActive } = useNavHeader();

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schemaProfileForm),
    mode: 'all',
  });

  const onSubmit = async (data: FieldValues) => {
    dispatch(postRegister(data as UserData));
  };

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
      <ProfileFormContainer title='Вход' links={links}>
        <form name='register' className='form' onSubmit={handleSubmit(onSubmit)}>
          <InputText error={!!errors.name} control={control} />
          <InputEmail error={!!errors.email} control={control} />
          <InputPassword error={!!errors.password} control={control} />
          <ButtonWithChildren
            loading={loading === 'pending'}
            type='primary'
            size='medium'
          >
            <span>Зарегистрироваться</span>
          </ButtonWithChildren>
        </form>
      </ProfileFormContainer>
    </main>
  );
};
