import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input, Snackbar, Alert, Collapse, Box, IconButton, InputAdornment } from '@mui/material';
import EyeIcon from '@mui/icons-material/Visibility';
import EyeOffIcon from '@mui/icons-material/VisibilityOff';
import { Formik } from 'formik';
import userService from 'service/userService';

const UpdatePassword = () => {
    const [alertMessage, setAlertMessage] = useState({ open: false, type: 'info', message: '' });
    const [isCardOpen, setCardOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setCardOpen(true);
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleAlertClose = () => {
        setAlertMessage({ open: false, type: '', message: '' });
    };

    return (
        <Collapse in={isCardOpen} timeout={500}>
            <Formik
                initialValues={{
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                }}
                validate={(values) => {
                    const errors = {};

                    if (!values.currentPassword) {
                        errors.currentPassword = 'Le mot de passe actuel est requis';
                    }

                    if (!values.newPassword) {
                        errors.newPassword = 'Le nouveau mot de passe est requis';
                    }

                    if (!values.confirmPassword) {
                        errors.confirmPassword = 'La confirmation du mot de passe est requise';
                    } else if (values.confirmPassword !== values.newPassword) {
                        errors.confirmPassword = 'La confirmation du mot de passe ne correspond pas';
                    }

                    return errors;
                }}
                onSubmit={async (values) => {
                    const res = await userService.changePassword({
                        oldPassword: values.currentPassword,
                        newPassword: values.newPassword,
                    });
                    if (res) {
                        setAlertMessage({ open: true, type: 'success', message: 'Mot de passe modifié !' });
                    } else {
                        setAlertMessage({ open: true, type: 'error', message: 'Mot de passe incorrect !' });
                    }
                }}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="currentPassword">Mot de passe actuel</InputLabel>
                            <Input
                                id="currentPassword"
                                name="currentPassword"
                                type={showPassword ? 'text' : 'password'}
                                value={values.currentPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePasswordVisibility} edge="end">
                                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {touched.currentPassword && errors.currentPassword && <Alert severity="error">{errors.currentPassword}</Alert>}
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="newPassword">Nouveau mot de passe</InputLabel>
                            <Input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                value={values.newPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.newPassword && errors.newPassword && <Alert severity="error">{errors.newPassword}</Alert>}
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="confirmPassword">Confirmer le nouveau mot de passe</InputLabel>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.confirmPassword && errors.confirmPassword && <Alert severity="error">{errors.confirmPassword}</Alert>}
                        </FormControl>

                        <Box marginTop={3} textAlign="center">
                            <Button variant="contained" color="primary" type="submit">
                                Enregistrer nouveau mot de passe
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>

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
