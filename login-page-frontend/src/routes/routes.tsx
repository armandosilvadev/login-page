import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from '../auth/components/ProtectedRoute';
import PublicRoute from '../auth/components/PublicRoute';

const router = createBrowserRouter([
  {
    Component: PublicRoute,
    children: [
      {
        path: '/',
        Component: Home,
      },
      {
        path: '/auth/login',
        Component: Login,
      },
      {
        path: 'auth/register',
        Component: Register,
      },
    ],
  },
  {
    Component: ProtectedRoute,
    children: [
      {
        path: '/dashboard',
        Component: Dashboard,
      },
    ],
  },
]);

export default router;
