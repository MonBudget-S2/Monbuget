import { useDispatch, useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { useEffect } from 'react';
// import { setIsCheckingForToken } from 'store/authSlice';
import authService from 'service/authService';
import Loader from 'ui-component/Loader';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { authenticateUser } from 'store/authSlice';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const userConnected = useSelector(fetchUser);

  useEffect(() => {
    authService
      .validate()
      .then((data) => {
        axios.defaults.headers.get['Authorization'] = `Bearer ${localStorage.getItem('token') || ''}`;
        axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('token') || ''}`;
        axios.defaults.headers.put['Authorization'] = `Bearer ${localStorage.getItem('token') || ''}`;
        axios.defaults.headers.delete['Authorization'] = `Bearer ${localStorage.getItem('token') || ''}`;

        dispatch(
          authenticateUser({
            isConnected: data.isConnected,
            id: data.id,
            token: localStorage.getItem('token') || '',
            role: data.role,
            isAdmin: data.isAdmin,
            userInfo: data.userInfo
          })
        );
        // setIsCheckingForToken(false);

        setIsCheckingToken(false);
      })
      .catch((data) => {
        setIsCheckingToken(false);
        localStorage.removeItem('token');
        console.log('error', data);
        if (window.location.pathname.startsWith('/dashboard')) {
          navigate('/login');
        }
      });
  }, [dispatch]);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>{isCheckingToken ? <Loader /> : <Routes />}</NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
