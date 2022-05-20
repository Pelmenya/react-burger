import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Controller } from 'react-hook-form';
import { ERRORS } from '../../../../utils/constants';
import { InputPropsType } from '../../../../utils/types/input-props-type';

export interface InputTextPropsType extends InputPropsType {
  type?: 'name' | 'token';
}

export const InputText = ({
  error,
  control,
  placeholder = 'Имя',
  type = 'name',
}: InputTextPropsType) => (
  <Controller
    name={type}
    control={control}
    render={({ field: { onChange, onBlur, value, ref } }) => (
      <Input
        placeholder={placeholder}
        type='text'
        value={value || ''}
        ref={ref}
        onBlur={onBlur}
        onChange={onChange}
        error={error}
        errorText={
          value ? type === 'name' ? (
            ERRORS.ERROR_NAME
          ) : type === 'token' ? (
            ERRORS.ERROR_CODE
          ) : (
            ''
          ) : (
            ERRORS.ERROR_REQUIRED_FIELD
          )
        }
      />
    )}
  />
);
