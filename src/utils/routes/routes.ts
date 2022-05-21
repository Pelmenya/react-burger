import { ForgotPasswordPage } from '../../pages/forgot-password-page/forgot-password-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { MainPage } from '../../pages/main-page/main-page';
import { RegisterPage } from '../../pages/register-page/register-page';
import { ResetPasswordPage } from '../../pages/reset-password-page/reset-password-page';
import { ProfilePage } from '../../pages/profile-page/profile-page';

export interface Route {
  name: string;
  path: string;
  exact: boolean;
  component: JSX.Element;
}

export const ROUTES = [
  {
    name: 'forgot-password',
    path: '/forgot-password',
    element: ForgotPasswordPage,
  },
  {
    name: 'reset-password',
    path: '/reset-password',
    element: ResetPasswordPage,
  },
  {
    name: 'login',
    path: '/login',
    element: LoginPage,
  },
  {
    name: 'register',
    path: '/register',
    element: RegisterPage,
  },
  {
    name: 'main',
    path: '/',
    element: MainPage,
  },
];
