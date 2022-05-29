import { FieldValues, useForm } from 'react-hook-form';
import cn from 'classnames';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileFormContainer } from '../../components/profile-form-container/profile-form-container';
import { InputText } from '../profile-form-container/components/input-text/input-text';
import { useCallback, useEffect, useState } from 'react';
import { schemaProfileForm } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileState } from '../../services/redux/selectors/profile';
import { ButtonWithChildren } from '../button-with-children/button-with-children';
import { Flex } from '../flex/flex';

import profileEdit from './profile-edit.module.css';
import { patchUser } from '../../services/redux/slices/profile';
import { DispatchType } from '../../utils/types/dispatch-type';
import { UserData } from '../../api/auth-api';

export const ProfileEdit = () => {
  const { user, loading } = useSelector(getProfileState);
  const dispatch = useDispatch<DispatchType>();
  const accessToken = localStorage.getItem('accessToken');

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

  const { handleSubmit, control, clearErrors, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schemaProfileForm),
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: FieldValues) => {
    if (data) {
      dispatch(patchUser({
        userData: data as UserData,
        token: accessToken as string,
      }))
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

  const handlerClickChanel = useCallback(() => {
    setValue('name', user?.name, { shouldDirty: true });
    setValue('email', user?.email, { shouldDirty: true });
    setValue('password', '', { shouldDirty: true });
    setIsDisabledName(true);
    setIsDisabledEmail(true);
    setIsDisabledPassword(true);
    clearErrors();
  }, [setValue, user, clearErrors]);

  useEffect(
    () => {
      handlerClickChanel();
    },
    [
      user,
      setValue,
      handlerClickChanel,
    ],
  );

  return (
    <ProfileFormContainer>
      <form name='edit' className='form form_end mt-30' onSubmit={handleSubmit(onSubmit)}>
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
          <button type='button' onClick={handlerClickChanel} className={cn('text text_type_main-default', profileEdit.button )}>Отмена</button>
          <ButtonWithChildren
            type='primary'
            size='medium'
            loading={loading === 'pending'}
          >
            <span>Сохранить</span>
          </ButtonWithChildren>
        </Flex>
      </form>
    </ProfileFormContainer>
  );
};
