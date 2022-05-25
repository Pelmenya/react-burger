import { useRoutes, Outlet } from 'react-router-dom';
import { ForgotPasswordPage } from '../../pages/forgot-password-page/forgot-password-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { MainPage } from '../../pages/main-page/main-page';
import { RegisterPage } from '../../pages/register-page/register-page';
import { ResetPasswordPage } from '../../pages/reset-password-page/reset-password-page';
import { withUserAuth } from '../../hocs/with-user-auth';
import { withProtectedAuth } from '../../hocs/with-protected-auth';
import { ProfilePage } from '../../pages/profile-page/profile-page';
import { ProfileEdit } from '../profile-edit/profile-edit';
import { OrdersPage } from '../../pages/orders-page/orders-page';
import { useSelector } from 'react-redux';
import { getCurrentIngredientState } from '../../services/redux/selectors/current-ingredient';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { NotFoundPage } from '../../pages/not-found-page/not-found';

const ForgotPassword = withUserAuth('/profile', ForgotPasswordPage);
const ResetPassword = withUserAuth('/profile', ResetPasswordPage);
const Login = withUserAuth('/profile', LoginPage);
const Register = withUserAuth('/profile', RegisterPage);
const Profile = withProtectedAuth('/login', ProfilePage);
const Edit = withProtectedAuth('/login', ProfileEdit);
const Orders = withProtectedAuth('/login', OrdersPage);

export const Routes = () => {
  const { ingredient } = useSelector(getCurrentIngredientState);

  let element = useRoutes([
    {
      path: '/',
      element: <MainPage />,
    },
    {
      path: 'ingredients',
      element: (
        <div>
          {ingredient && <MainPage />}
          <Outlet />
        </div>
      ),
      children: [
        {
          path: ':id',
          element: !ingredient ? <IngredientDetails /> : null,
        },
      ],
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
          element: <Orders />,
          children: [
            {
              path: ':id',
              element: <div />,
            },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);

  return element;
};
