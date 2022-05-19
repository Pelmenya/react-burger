import React from 'react';
import { Title } from '../title/title';
import { Flex } from '../flex/flex';

import profileForm from './profile-form-container.module.css';
import { ProfileFormLink, ProfileFormLinkPropsType } from './components/profile-form-link/profile-form-link';

export interface RedirectLinkType {
  question?: string;
  linkText: string;
  linkTo: string;
}

export interface ProfileFormContainerPropsType {
  title?: string;
  children?: JSX.Element;
  links?: ProfileFormLinkPropsType[];
}

export const ProfileFormContainer = ({ title, children, links }: ProfileFormContainerPropsType) => {
  return (
    <Flex flexDirection='column' gap={24} className={profileForm.container}>
      <>
        {title && <Title type='h2'>{title}</Title>}
        {children && children}
        {links && (
          <Flex flexDirection='column' gap={16} className={profileForm.links}>
            {links.map((item) => <ProfileFormLink key={item.link + item.path} {...item}/>)}
          </Flex>)
        }
      </>
    </Flex>
  );
};
