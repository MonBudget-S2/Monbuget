import { Alert, Slide, Snackbar } from '@mui/material';
import React from 'react';

// function TransitionUp(props) {
//   return <Slide {...props} direction="up" />;
// }
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export default function CustomAlert({ open, message, type, setMessage }) {
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessage({ open: false, type: type, message: message });
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={10000}
      onClose={handleAlertClose}
      TransitionComponent={TransitionDown}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ mt: 5 }}
    >
      <Alert onClose={handleAlertClose} severity={type ? type : 'info'} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
