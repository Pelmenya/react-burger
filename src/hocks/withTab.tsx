import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ReactElement } from 'react';

export interface TabType {
  active: boolean;
  value: string;
  onClick: (value: string) => void;
  children: ReactElement;
}

export const withTab = (Element: typeof Tab) => (props: TabType) => <Element {...props} />;
