import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ProfileFormContainer } from '../../components/profile-form-container/profile-form-container';
import { InputText } from '../profile-form-container/components/input-text/input-text';
import { useCallback, useEffect, useState } from 'react';
import { schemaProfileForm } from '../../utils/constants';
import { useSelector } from 'react-redux';
import { getProfileState } from '../../services/redux/selectors/profile';
import { Loader } from '../loader/loader';
import { ButtonWithChildren } from '../button-with-children/button-with-children';
import { Flex } from '../flex/flex';

export const ProfileEdit = () => {
  const { user } = useSelector(getProfileState);

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

  useEffect(
    () => {
      setValue('name', user?.name, { shouldDirty: true });
      setValue('email', user?.email, { shouldDirty: true });
    },
    [
      user,
      setValue,
    ],
  );

  return (
    <ProfileFormContainer>
      <form name='edit' className='form mt-30' onSubmit={handleSubmit(onSubmit)}>
        <InputText
          error={!!errors.name}
          control={control}
          disabled={isDisabledName}
          icon={isDisabledName ? 'EditIcon' : 'CloseIcon'}
          onIconClick={handlerSetIsDisabledName}
        />
        <InputText
          placeholder='Логин'
          name='email'
          type='email'
          error={!!errors.email}
          control={control}
          disabled={isDisabledEmail}
          icon={isDisabledEmail ? 'EditIcon' : 'CloseIcon'}
          onIconClick={handlerSetIsDisabledEmail}
        />
        <InputText
          placeholder='Пароль'
          name='password'
          type='password'
          error={!!errors.password}
          control={control}
          disabled={isDisabledPassword}
          icon={isDisabledPassword ? 'EditIcon' : 'CloseIcon'}
          onIconClick={handlerSetIsDisabledPassword}
        />
        <Flex>
          <ButtonWithChildren
            type='primary'
            size='medium'
            onClick={handleSubmit(onSubmit)}
            loading={true}
          >
            <span>Оформить заказ</span>
          </ButtonWithChildren>
        </Flex>
      </form>
    </ProfileFormContainer>
  );
};
