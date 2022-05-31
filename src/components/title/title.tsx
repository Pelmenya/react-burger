import cn from 'classnames';

export interface TitlePropsType {
  type?: 'h1' | 'h2' | 'h3' | 'h5';
  className?: string;
  children?: JSX.Element | string;
}

export const Title = ({ type, className = '', children }: TitlePropsType) => {
  switch (type) {
    case 'h1':
      return <h1 className={cn('text text_type_main-large', className)}>{children}</h1>;
    case 'h2':
      return <h2 className={cn('text text_type_main-medium', className)}>{children}</h2>;
    case 'h3':
      return <h3 className={cn('text text_type_main-medium', className)}>{children}</h3>;
    case 'h5':
      return <h5 className={cn('text text_type_main-medium', className)}>{children}</h5>;
    default:
      return <h6 className={cn('text text_type_main-default', className)}>{children}</h6>;
  }
};
