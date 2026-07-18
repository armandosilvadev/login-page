import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';

const router = createBrowserRouter([
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
  {
    path: '/dashboard',
    Component: Dashboard,
  },
]);

export default router;
