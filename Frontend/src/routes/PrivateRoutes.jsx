import MainLayout from 'layout/MainLayout';
import { Navigate } from 'react-router-dom';
// import {  Outlet } from 'react-router-dom';
const PrivateRoutes = () => {
  /*** Here you should check if the user is authenticated or not,
   * Now I am just returning true for the sake of simplicity
   ***/

  let auth = { token: true };
  return auth.token ? <MainLayout /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
