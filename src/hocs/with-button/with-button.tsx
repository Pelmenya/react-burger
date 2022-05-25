import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ReactElement, SyntheticEvent } from 'react';
import { Loader } from '../../components/loader/loader';

import withButtonStyle from './with-button.module.css';

export interface ButtonType {
  type?: 'secondary' | 'primary';
  size?: 'small' | 'medium' | 'large';
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  disabled?: boolean;
  name?: string;
  htmlType?: 'button' | 'submit' | 'reset';
  children: ReactElement;
  loading?: boolean;
}

export const withButton = (Element: typeof Button) => (props: ButtonType) => {
  const { loading } = props;
  return (
    <div className={withButtonStyle.container}>
      {loading ? (
        <>
          <div className={withButtonStyle.loader}>
            <Loader type='small' />
          </div>
          <Element {...props} disabled={true}/>
        </>
      ) : (
        <Element {...props} />
      )}
    </div>
  );
};
