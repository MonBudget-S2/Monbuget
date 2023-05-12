const routes = [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/dashboard',
      element: <PrivateRoute element={<Dashboard />} />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ];
  
  export default routes;