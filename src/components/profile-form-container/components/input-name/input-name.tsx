import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Controller } from 'react-hook-form';
import { ERRORS } from '../../../../utils/constants';
import { InputPropsType } from '../../../../utils/types/input-props-type';

export const InputName = ({ error, control, placeholder = 'Имя' }: InputPropsType) => (
  <Controller
    name='name'
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
        errorText={value ? ERRORS.ERROR_NAME : ERRORS.ERROR_REQUIRED_FIELD}
      />
    )}
  />
);
