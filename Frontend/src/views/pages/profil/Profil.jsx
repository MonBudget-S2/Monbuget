import React, { useState, useEffect } from 'react';
import { Card, CardContent, Box, Button, TextField, Snackbar, Alert, Collapse } from '@mui/material';
import userImage from '../../../assets/images/users/user-round.svg';
import { getUser } from 'store/authSlice';
import { useSelector } from 'react-redux';

const Profil = () => {
  const user = useSelector(getUser);
  console.log(user);

  const [alertMessage, setAlertMessage] = useState({ open: false, type: '', message: '' });
  const [isCardOpen, setCardOpen] = useState(false);

  useEffect(() => {
    setCardOpen(true); // Ouvrir la carte une fois le composant monté
  }, []);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSaveClick = () => {
    // Logique pour enregistrer les modifications

    // Afficher la notification de succès
    setAlertMessage({ open: true, type: 'success', message: 'Modification prise en compte !' });
  };

  const handleAlertClose = () => {
    setAlertMessage({ open: false, type: '', message: '' });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Collapse in={isCardOpen} timeout={500}>
        <Card
          sx={{ width: 400, borderRadius: 10, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" flexDirection="column" marginBottom={3}>
              <img
                src={userImage}
                alt="User"
                style={{ width: 120, height: 120, borderRadius: '50%', marginBottom: 16 }}
              />
              <TextField
                name="firstname"
                label="Prénom"
                value={user?.userInfo?.firstname}
                onChange={handleFieldChange}
                margin="normal"
                fullWidth
              />
              <TextField
                name="lastName"
                label="Nom"
                value={user?.userInfo?.lastname}
                onChange={handleFieldChange}
                margin="normal"
                fullWidth
              />
              <TextField
                name="username"
                label="Nom d'utilisateur"
                value={user?.userInfo?.username}
                onChange={handleFieldChange}
                margin="normal"
                fullWidth
              />
            </Box>
            <TextField
              name="email"
              label="Email"
              value={user?.userInfo?.email}
              onChange={handleFieldChange}
              margin="normal"
              fullWidth
            />
            <TextField
              name="password"
              label="Mot de passe"
              value={user?.userInfo?.password}
              onChange={handleFieldChange}
              margin="normal"
              fullWidth
            />
            <Box marginTop={3} textAlign="center">
              <Button variant="contained" color="primary" onClick={handleSaveClick}>
                Enregistrer
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Collapse>

      <Snackbar
        open={alertMessage.open}
        autoHideDuration={3000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleAlertClose} severity={alertMessage.type} sx={{ width: '100%' }}>
          {alertMessage.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profil;
