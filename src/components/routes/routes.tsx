import { useRoutes } from 'react-router-dom';
import { ForgotPasswordPage } from '../../pages/forgot-password-page/forgot-password-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { MainPage } from '../../pages/main-page/main-page';
import { RegisterPage } from '../../pages/register-page/register-page';
import { ResetPasswordPage } from '../../pages/reset-password-page/reset-password-page';
import { withUserAuth } from '../../hocks/withUserAuth';
import { withProtectedAuth } from '../../hocks/withProtectedAuth';
import { ProfilePage } from '../../pages/profile-page/profile-page';
import { ProfileEdit } from '../profile-edit/profile-edit';

export interface Route {
  name: string;
  path: string;
  exact: boolean;
  component: JSX.Element;
}

export const Routes = () => {
  const ForgotPassword = withUserAuth('/profile', ForgotPasswordPage);
  const ResetPassword = withUserAuth('/profile', ResetPasswordPage);
  const Login = withUserAuth('/profile', LoginPage);
  const Register = withUserAuth('/profile', RegisterPage);
  const Profile = withProtectedAuth('/login', ProfilePage);
  const Edit = withProtectedAuth('/login', ProfileEdit);
  
  let element = useRoutes([
    {
      path: '/',
      element: <MainPage />,
    },
    {
      path: 'forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: 'reset-password',
      element: <ResetPassword />,
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: 'profile',
      element: <Profile />,
      children: [
        {
          path: '',
          element: <Edit />,
        },
        {
          path: 'orders',
          element: <div>История заказов</div>,
        },
      ],
    },
  ]);

  return element;
};
