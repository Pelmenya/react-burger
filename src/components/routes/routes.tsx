import { useLocation, Routes, Route, Outlet} from 'react-router-dom';
import { ForgotPasswordPage } from '../../pages/forgot-password-page/forgot-password-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { MainPage } from '../../pages/main-page/main-page';
import { RegisterPage } from '../../pages/register-page/register-page';
import { ResetPasswordPage } from '../../pages/reset-password-page/reset-password-page';
import { AuthRoute } from './components/auth-route';
import { ProtectedRoute } from './components/protected-route';
import { ProfilePage } from '../../pages/profile-page/profile-page';
import { ProfileEdit } from '../profile-edit/profile-edit';
import { OrdersPage } from '../../pages/orders-page/orders-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found';
import { IngredientPage } from '../../pages/ingredient-page/ingredient-page';
import { IngredientModal } from '../ingredient-modal/ingredient-modal';
import { Orders } from '../orders/orders';
import { OrderPage } from '../../pages/order-page/order-page';
import { OrderModal } from '../order-modal/order-modal';
import { Order } from '../order/order';

export const RoutesApp = () => {
  const location = useLocation();
  const locationState = location.state as { background?: Location };

  return (
    <>
      <Routes location={locationState?.background || location}>
        <Route path='/' element={<Outlet />}>
          <Route index element={<MainPage />} />
          <Route path='feed' element={<OrdersPage />} />
          <Route path='feed/:id' element={<OrderPage />} />
          <Route path='ingredients/:id' element={<IngredientPage />} />
          <Route
            path='profile'
            element={<ProtectedRoute redirect='/login' element={<ProfilePage />} />}>
            <Route index element={<ProtectedRoute redirect='/login' element={<ProfileEdit />} />} />
            <Route
              path='orders'
              element={<ProtectedRoute redirect='/login' element={<Orders />} />}>
            </Route>
          </Route>
          <Route path='profile/orders/:id' element={<ProtectedRoute redirect='/login' element={<OrderPage />} />} />
          <Route
            path='forgot-password'
            element={<AuthRoute redirect='/' element={<ForgotPasswordPage />} />}
          />
          <Route
            path='reset-password'
            element={<AuthRoute redirect='/' element={<ResetPasswordPage />} />}
          />
          <Route path='login' element={<AuthRoute redirect='/' element={<LoginPage />} />} />
          <Route path='register' element={<AuthRoute redirect='/' element={<RegisterPage />} />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      {locationState?.background && (
        <Routes>
          <Route path='ingredients/:id' element={<IngredientModal />} />
          <Route path='feed/:id' element={<OrderModal />} />
          <Route path='profile/orders/:id' element={<ProtectedRoute redirect='/login' element={<OrderModal />} />} />
        </Routes>
      )}
    </>
  );
};
