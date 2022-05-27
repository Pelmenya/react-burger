import { useLocation, Routes, Route, Outlet } from 'react-router-dom';
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
import { NotFoundPage } from '../../pages/not-found-page/not-found';
import { IngredientPage } from '../../pages/ingredient-page/ingredient-page';
import { IngredientModal } from '../ingredient-modal/ingredient-modal';

const ForgotPassword = withUserAuth('/', ForgotPasswordPage);
const ResetPassword = withUserAuth('/', ResetPasswordPage);
const Login = withUserAuth('/', LoginPage);
const Register = withUserAuth('/', RegisterPage);
const Profile = withProtectedAuth('/login', ProfilePage);
const Edit = withProtectedAuth('/login', ProfileEdit);
const Orders = withProtectedAuth('/login', OrdersPage);

export const RoutesApp = () => {
  const location = useLocation();
  const locationState = location.state as { background?: Location };

  return (
    <>
      <Routes location={locationState?.background|| location}>
        <Route path='/' element={<Outlet />}>
          <Route index element={<MainPage />} />
          <Route path='ingredients/:id' element={<IngredientPage/> } />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='profile' element={<Profile />}>
            <Route index element={<Edit />} />
            <Route path='orders' element={<Orders />}>
              <Route path=':id' element={<div />} />
            </Route>
          </Route>
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      {locationState?.background && (
        <Routes>
          <Route path='ingredients/:id' element={<IngredientModal />} />
        </Routes>
      )}
    </>
  );
};