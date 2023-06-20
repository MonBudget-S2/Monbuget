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
import { validate } from 'service/authService';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  // const [checkingToken, setCheckingToken] = useState<boolean>(true);

  const dispatch = useDispatch();

  // const userConnected = useSelector(fetchUser);

  useEffect(() => {
    validate()
      .then((data) => {
        axios.defaults.headers.post["Authorization"] = `Bearer ${
          localStorage.getItem("token") || ""
        }`;
        axios.defaults.headers.put["Authorization"] = `Bearer ${
          localStorage.getItem("token") || ""
        }`;
        axios.defaults.headers.delete["Authorization"] = `Bearer ${
          localStorage.getItem("token") || ""
        }`;

        dispatch(
          setState({
            isConnected: data.isConnected,
            id: data.id,
            token: localStorage.getItem("token") || "",
            role: data.role,
            isAdmin: data.isAdmin,
            userInfo: data.userInfo,
          })
        );

        // setCheckingToken(false);
      })
      .catch((data) => {
        console.log(data);
        // dispatch(
        //   setState({
        //     isConnected: data.isConnected,
        //     id: data.id,
        //     accessToken: localStorage.getItem("TOKEN") || "",
        //     role: data.role,
        //     isAdmin: data.isAdmin,
        //     userInfo: data.userInfo,
        //   })
        // );

        // setCheckingToken(false);
      });
  }, [dispatch]);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
