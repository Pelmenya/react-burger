import React, { useEffect } from 'react';
import { ProfileFormContainer } from '../../components/profile-form-container/profile-form-container';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavHeader } from '../../hooks/useNavHeader';

export const ForgotPasswordPage = () => {
  const { setActive } = useNavHeader();

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
      <ProfileFormContainer title='Восстановление пароля'>
        <form name='forgotPassword' className='form'>
          <Input
            name='password'
            placeholder='Укажите e-mail'
            type='password'
            value=''
            onChange={() => {}}
            icon='HideIcon'
						error={true}
						errorText='ddd dasd asdasd sad asdf asdf'
          />
          <Button type='primary' size='medium'>
            Восстановить
          </Button>
        </form>
      </ProfileFormContainer>
    </main>
  );
};
