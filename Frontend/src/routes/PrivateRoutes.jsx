import MainLayout from 'layout/MainLayout';
import { Navigate, useLocation } from 'react-router-dom';
import AdminMainLayout from 'layout/MainLayout/AdminMainLayout';
// import { getToken } from 'store/authSlice';
import { getUser, isAdmin } from 'store/authSlice';
import { useSelector } from 'react-redux';
// import Loader from 'ui-component/Loader';

// import {  Outlet } from 'react-router-dom';
const PrivateRoutes = () => {
  const location = useLocation();
  // const token = useSelector(getToken);
  const token = localStorage.getItem('token');
  const admin = useSelector(isAdmin);
  const user = useSelector(getUser);
  const isAuthenticated = token !== null;
  // const isAuthenticated = true;

  // let auth = { token: false };
  // return isAuthenticated ? <MainLayout /> : <Navigate to="/login" />;
  // if (!isCheckingForToken) {
  if (isAuthenticated) {
    if (admin) {
      return <AdminMainLayout />;
    } else if (user?.role === 'ADVISOR') {
      if (location.pathname === '/dashboard/clientCalendar') {
        return <Navigate to="/dashboard/advisor/planning" />;
      }
      return <AdminMainLayout />;
    } else {
      console.log('location', location.pathname);
      console.log(location.pathname === '/dashboard/advisor/planning');
      if (location.pathname === '/dashboard/advisor/planning') {
        console.log('planning');
        return <Navigate to="/dashboard/clientCalendar" />;
      }
      return <MainLayout />;
    }
  } else {
    return <Navigate to="/login" />;
  }
  // } else {
  //   return <Loader />;
  // }
};

export default PrivateRoutes;
