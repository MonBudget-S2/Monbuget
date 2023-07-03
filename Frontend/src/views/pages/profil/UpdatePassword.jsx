import React, { useEffect, useState } from 'react';
import { Button, TextField, Snackbar, Alert, Collapse, Box } from '@mui/material';

const UpdatePassword = () => {
    const [alertMessage, setAlertMessage] = useState({ open: false, type: 'info', message: '' });
    const [isCardOpen, setCardOpen] = useState(false);
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        setCardOpen(true);
    }, []);

    const handleFieldChange = (event) => {
        const { name, value } = event.target;
        setPasswords((prevPasswords) => ({ ...prevPasswords, [name]: value }));
    };

    const handleSaveClick = () => {
        // Logique pour enregistrer les modifications
        setAlertMessage({ open: true, type: 'success', message: 'Mot de passe modifié !' });
    };

    const handleAlertClose = () => {
        setAlertMessage({ open: false, type: '', message: '' });
    };

    return (
        <Collapse in={isCardOpen} timeout={500}>
            <TextField
                name="currentPassword"
                label="Mot de passe actuel"
                type="password"
                value={passwords.currentPassword}
                onChange={handleFieldChange}
                margin="normal"
                fullWidth
            />
            <TextField
                name="newPassword"
                label="Nouveau mot de passe"
                type="password"
                value={passwords.newPassword}
                onChange={handleFieldChange}
                margin="normal"
                fullWidth
            />
            <TextField
                name="confirmPassword"
                label="Confirmer le nouveau mot de passe"
                type="password"
                value={passwords.confirmPassword}
                onChange={handleFieldChange}
                margin="normal"
                fullWidth
            />
            <Box marginTop={3} textAlign="center">
                <Button variant="contained" color="primary" onClick={handleSaveClick}>
                    Modifier mot de passe
                </Button>
            </Box>
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
        </Collapse>
    );
};

export default UpdatePassword;
