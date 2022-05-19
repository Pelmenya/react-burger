import React from 'react';
import cn from 'classnames';

import { Link } from 'react-router-dom';
import { Flex } from '../../../flex/flex';

import profileFormLink from './profile-form-link.module.css';

export interface ProfileFormLinkPropsType {
  question: string;
  link: string;
  path: string;
}

export const ProfileFormLink = ({ question, link, path }: ProfileFormLinkPropsType) => (
  <Flex>
    <p className={cn('text text_type_main-default mr-2', profileFormLink.question)}>{question}</p>
    <Link to={path} className={cn('text text_type_main-default', profileFormLink.link)}>{link}</Link>
  </Flex>
);
