import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Controller } from 'react-hook-form';
import { ERRORS } from '../../../../utils/constants';
import { InputPropsType } from '../../../../utils/types/input-props-type';

export const InputEmail = ({ error, control, placeholder = 'E-mail' }: InputPropsType) => (
  <Controller
    name='email'
    control={control}
    render={({ field: { onChange, onBlur, value, ref } }) => (
      <Input
        placeholder={placeholder}
        type='email'
        value={value || ''}
        ref={ref}
        onBlur={onBlur}
        onChange={onChange}
        error={error}
        errorText={value ? ERRORS.ERROR_EMAIL : ERRORS.ERROR_REQUIRED_FIELD}
      />
    )}
  />
);
