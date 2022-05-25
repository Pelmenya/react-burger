import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ReactElement, SyntheticEvent } from 'react';

export interface ButtonType {
  type?: 'secondary' | 'primary';
  size?: 'small' | 'medium' | 'large';
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  disabled?: boolean;
  name?: string;
  htmlType?: 'button' | 'submit' | 'reset';
  children: ReactElement;
}

export const withButton = (Element: typeof Button) => (props: ButtonType) => <Element {...props} />;
