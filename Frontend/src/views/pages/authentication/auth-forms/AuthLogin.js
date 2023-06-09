import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
// import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import authService from 'service/authService';
// import { authenticateUser } from 'store/authSlice';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { getToken } from 'store/authSlice';
import { useEffect } from 'react';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = ({ ...others }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));


  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      // Destructure the values from the Formik arguments
      const { email, password } = values;

      const credentials = { username: email, password };
      // const response= await login(credentials);
      // dispatch(authenticateUser(response));
      const url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_URL_PROD : process.env.REACT_APP_URL_DEV;

      const res = await axios.post(url + '/users/login', credentials);
      authService.login(res, dispatch);

      // Set the Formik status and submitting state
      setStatus({ success: true });
      setSubmitting(false);

      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error(err);
      // Set the Formik status, errors, and submitting state
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [token]);

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          email: Yup.string().max(255).required('Email est requis'),
          password: Yup.string().max(255).required('Mot de passe est requis')
        })}
        onSubmit={handleLogin}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Nom d&apos;utilisateur</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                // type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Mot de passe</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label="Se souvenir de moi"
              />
              <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }} textAlign={matchDownSM ? 'center' : 'inherit'}>
                Mot de passe oublié ?
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Se connecter
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
