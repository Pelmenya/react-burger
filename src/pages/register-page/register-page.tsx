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
import { postRegister } from '../../services/redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType } from '../../utils/types/dispatch-type';
import { getAuthState } from '../../services/redux/selectors/auth';

const links = [
  {
    question: 'Уже зарегистрированы?',
    link: 'Войти',
    path: '/login',
  },
];

export const RegisterPage = () => {
  const dispatch = useDispatch<DispatchType>();
  const { loading } = useSelector(getAuthState);

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
