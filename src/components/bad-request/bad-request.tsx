import React from 'react';
import { Flex } from '../flex/flex';
import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface BadRequestType {
  error?: string;
}

export const BadRequest = (props: BadRequestType) => {
  const { error } = props;
  return (
    <Flex flexDirection='column'>
      <p className='text text_type_main-medium mb-5 mt-10'>Что-то пошло не так...</p>
      <p className='text text_type_main-medium'>
        <InfoIcon type='error' /> {error}
      </p>
    </Flex>
  );
};
