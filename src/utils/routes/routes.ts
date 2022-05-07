import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { MainPage } from '../../pages/main-page/main-page';
import { ProfilePage } from '../../pages/profile-page/profile-page';

export interface Route {
  name: string;
  path: string;
  exact: boolean;
  component: JSX.Element;
}

export const ROUTES = [
   {
    name: 'main',
    path: '/',
    element: MainPage,
  },
  {
    name: 'forgot-password',
    path: '/profile',
    element: ForgotPasswordPage,
  }
 ];
