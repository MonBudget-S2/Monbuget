import MainLayout from 'layout/MainLayout';
import { Navigate } from 'react-router-dom';
import AdminMainLayout from 'layout/MainLayout/AdminMainLayout';
// import { getToken } from 'store/authSlice';
import { isAdmin } from 'store/authSlice';
import { useSelector } from 'react-redux';

// import {  Outlet } from 'react-router-dom';
const PrivateRoutes = () => {
  console.log(useSelector((state) => state))
  // const token = useSelector(getToken);
  const token = localStorage.getItem('token');
  const admin = useSelector(isAdmin);
  const isAuthenticated = token !== null;

  // let auth = { token: false };
  // return isAuthenticated ? <MainLayout /> : <Navigate to="/login" />;
  if (isAuthenticated) {

    if (admin) {
      return <AdminMainLayout />;
    } else {
      return <MainLayout />;
    }
  } else {
    return<Navigate to="/login" />;
  }
};

export default PrivateRoutes;
