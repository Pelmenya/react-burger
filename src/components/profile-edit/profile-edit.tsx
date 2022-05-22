import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ProfileFormContainer } from '../../components/profile-form-container/profile-form-container';
import { InputText } from '../profile-form-container/components/input-text/input-text';
import { useCallback, useEffect, useState } from 'react';
import { schemaProfileForm } from '../../utils/constants';

export const ProfileEdit = () => {
  const [
    isDisabledName,
    setIsDisabledName,
  ] = useState(true);
  const [
    isDisabledEmail,
    setIsDisabledEmail,
  ] = useState(true);
  const [
    isDisabledPassword,
    setIsDisabledPassword,
  ] = useState(true);

  const { handleSubmit, control, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schemaProfileForm),
    reValidateMode: 'onSubmit',
  });

  const onSubmit = (data: FieldValues) => {
    if (data) {
      setIsDisabledName(true);
      setIsDisabledEmail(true);
      setIsDisabledPassword(true);
    }
  };

  const handlerSetIsDisabledName = useCallback(
    () => {
      setIsDisabledName(!isDisabledName);
    },
    [
      isDisabledName,
    ],
  );

  const handlerSetIsDisabledEmail = useCallback(
    () => {
      setIsDisabledEmail(!isDisabledEmail);
    },
    [
      isDisabledEmail,
    ],
  );

  const handlerSetIsDisabledPassword = useCallback(
    () => {
      setIsDisabledPassword(!isDisabledPassword);
    },
    [
      isDisabledPassword,
    ],
  );

  useEffect(() => {
    setValue('name', 'Вася', { shouldDirty: true });
    setValue('email', 'sss@ya.ru', { shouldDirty: true });
    setValue('password', 'sss@ya.ru', { shouldDirty: true });
  });

  return (
    <ProfileFormContainer>
      <form name='edit' className='form mt-30' onSubmit={handleSubmit(onSubmit)}>
        <InputText
          error={!!errors.name}
          control={control}
          disabled={isDisabledName}
          icon={isDisabledName ? 'EditIcon' : 'CheckMarkIcon'}
          onIconClick={isDisabledName ? handlerSetIsDisabledName : handleSubmit(onSubmit)}
        />
        <InputText
          placeholder='Логин'
          name='email'
          type='email'
          error={!!errors.email}
          control={control}
          disabled={isDisabledEmail}
          icon={isDisabledEmail ? 'EditIcon' : 'CheckMarkIcon'}
          onIconClick={isDisabledEmail ? handlerSetIsDisabledEmail : handleSubmit(onSubmit)}
        />
        <InputText
          placeholder='Пароль'
          name='password'
          type='password'
          error={!!errors.password}
          control={control}
          disabled={isDisabledPassword}
          icon={isDisabledPassword ? 'EditIcon' : 'CheckMarkIcon'}
          onIconClick={isDisabledPassword ? handlerSetIsDisabledPassword : handleSubmit(onSubmit)}
        />
      </form>
    </ProfileFormContainer>
  );
};
