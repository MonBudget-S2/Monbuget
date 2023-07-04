import { useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import authService from 'service/authService';
import CustomAlert from 'ui-component/alert/CustomAlert';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const AuthRegister = ({ ...others }) => {
  const theme = useTheme();

  const [alertMessage, setAlertMessage] = useState({
    isOpen: false,
    message: '',
    type: ''
  });

  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const handleRegister = async (values, { setErrors, setStatus, setSubmitting }) => {
    const { fname, lname, username, email, password } = values;
    const response = await authService.register({ firstname: fname, lastname: lname, username, email, password });
    if (response.status === 201) {
      console.log('Register success');
      console.log(response.data);
      setStatus({ success: true });
      setSubmitting(false);
      setAlertMessage({
        isOpen: true,
        message: 'Registration successful! You can now log in.',
        type: 'success'
      });
      navigate('/login');
    } else {
      console.log('Register failed');
      console.log(response.data);
      setStatus({ success: false });
      setErrors({ submit: response.data.message });
      setSubmitting(false);
      setErrorAlertOpen(true);
      setAlertMessage({
        isOpen: true,
        message: 'Registration failed. Please try again.',
        type: 'error'
      });
    }
  };

  // useEffect(() => {
  //   changePassword('123456');
  // }, []);

  return (
    <>
      <CustomAlert open={alertMessage.isOpen} message={alertMessage.message} type={alertMessage.type} />

      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: '',
          password: '',
          username: '',
          fname: '',
          lname: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          fname: Yup.string().max(255).required('Prénom est requis'),
          lname: Yup.string().max(255).required('Nom est requis'),
          username: Yup.string().max(255).required('Nom d\'utilisateur est requis'),
          email: Yup.string().email('Mettez un email valide').max(255).required('Email est requis'),
          password: Yup.string().max(255).required('Mot de passe est requis')
        })}
        onSubmit={handleRegister}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={Boolean(touched.fname && errors.fname)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-fname-register">Prénom</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-fname-register"
                    type="text"
                    value={values.fname}
                    name="fname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.fname && errors.fname && (
                    <FormHelperText error id="standard-weight-helper-text--register">
                      {errors.fname}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={Boolean(touched.lname && errors.lname)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-lname-register">Nom</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-lname-register"
                    type="text"
                    value={values.lname}
                    name="lname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.lname && errors.lname && (
                    <FormHelperText error id="standard-weight-helper-text--register">
                      {errors.lname}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-username-register">Nom d&apos;utilisateur</InputLabel>
              <OutlinedInput
                id="outlined-adornment-username-register"
                type="text"
                value={values.username}
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.username && errors.username && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.username}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Mot de passe</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
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
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                  }
                  label={
                    <Typography variant="subtitle1">
                      J&apos;accepte &nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                        les conditions d&apos;utilisation
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }} textAlign={matchDownSM ? 'center' : 'inherit'}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  S&apos;inscrire
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
