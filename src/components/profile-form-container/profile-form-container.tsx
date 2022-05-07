import React from 'react';
import { Title } from '../title/title';
import { Flex } from '../flex/flex';

import profileForm from './profile-form-container.module.css';

export interface RedirectLinkType {
  question?: string;
  linkText: string;
  linkTo: string;
}

export interface ProfileFormContainerPropsType {
  title?: string;
  name: string;
  children?: JSX.Element;
  redirectLinks?: RedirectLinkType[];
}

export const ProfileFormContainer = ({ title, children, redirectLinks }: ProfileFormContainerPropsType) => {
  return (
    <Flex flexDirection='column' gap={24} className={profileForm.container}>
    {title && <Title type='h2'>{title}</Title>}
      {children && children}
    {redirectLinks && redirectLinks.map((item) => <div />)}
    </Flex>
  );
};
