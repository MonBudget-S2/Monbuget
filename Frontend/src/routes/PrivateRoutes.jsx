import MainLayout from 'layout/MainLayout';
import { Navigate } from 'react-router-dom';
import AdminMainLayout from 'layout/MainLayout/AdminMainLayout';
// import { getToken } from 'store/authSlice';
import { getUser, isAdmin } from 'store/authSlice';
import { useSelector } from 'react-redux';
// import Loader from 'ui-component/Loader';

// import {  Outlet } from 'react-router-dom';
const PrivateRoutes = () => {
  console.log(useSelector((state) => state));
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
    } else if (user?.role === 'advisor') {
      return <AdminMainLayout />;
    } else {
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
