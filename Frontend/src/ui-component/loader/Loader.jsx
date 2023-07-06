import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingSpinner = () => (
  <Grid container alignItems="center" justifyContent="center" height="100vh">
    <CircularProgress size={40} color="primary" />
    <Typography variant="h4" sx={{ ml: 2 }}>
      Chargement en cours...
    </Typography>
  </Grid>
);

export default LoadingSpinner;
