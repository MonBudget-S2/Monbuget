import React, { useEffect, useState } from 'react';
import { CardContent, Box, Button, TextField, Snackbar, Alert, Collapse, Card } from '@mui/material';
import userImage from '../../../assets/images/users/user-round.svg';
import { getUser } from 'store/authSlice';
import { useSelector } from 'react-redux';
import UpdatePassword from './UpdatePassword';

const UpdateInformation = () => {
    const user = useSelector(getUser);
    console.log(user);

    const [alertMessage, setAlertMessage] = useState({ open: false, type: 'info', message: '' });
    const [isCardOpen, setCardOpen] = useState(false);
    const [showUpdatePassword, setShowUpdatePassword] = useState(false);
    const [isPasswordCollapseOpen, setPasswordCollapseOpen] = useState(false);
    const [setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

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

    const handleUpdatePasswordClick = () => {
        setPasswordCollapseOpen(true);
        setShowUpdatePassword(true);
    };

    const handleUpdatePasswordClose = () => {
        setPasswordCollapseOpen(false);
        setShowUpdatePassword(false);
    };

    const handleAlertClose = () => {
        setAlertMessage({ open: false, type: '', message: '' });
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
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
                <Card sx={{ width: 400, borderRadius: 10, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                    <CardContent>
                        <Box display="flex" alignItems="center" flexDirection="column" marginBottom={3}>
                            <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
                                {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="User"
                                    style={{ width: 120, height: 120, borderRadius: '50%', marginBottom: 16 }}
                                />
                                ) : (
                                <img
                                    src={userImage}
                                    alt="User"
                                    style={{ width: 120, height: 120, borderRadius: '50%', marginBottom: 16 }}
                                />
                                )}
                            </label>
                            <input
                                type="file"
                                id="image-upload"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageUpload}
                                disabled={showUpdatePassword}
                            />
                            <TextField
                                name="firstname"
                                label="Prénom"
                                value={user?.userInfo?.firstname}
                                onChange={handleFieldChange}
                                margin="normal"
                                fullWidth
                                disabled={showUpdatePassword}
                            />
                            <TextField
                                name="lastName"
                                label="Nom"
                                value={user?.userInfo?.lastname}
                                onChange={handleFieldChange}
                                margin="normal"
                                fullWidth
                                disabled={showUpdatePassword}
                            />
                            <TextField
                                name="username"
                                label="Nom d'utilisateur"
                                value={user?.userInfo?.username}
                                onChange={handleFieldChange}
                                margin="normal"
                                fullWidth
                                disabled={showUpdatePassword}
                            />
                        </Box>
                        <TextField
                            name="email"
                            label="Email"
                            value={user?.userInfo?.email}
                            onChange={handleFieldChange}
                            margin="normal"
                            fullWidth
                            disabled={showUpdatePassword}
                        />
                            {!showUpdatePassword && (
                            <Box marginTop={3} textAlign="center">
                                <Button variant="contained" color="primary" onClick={handleSaveClick}>
                                    Enregistrer vos informations
                                </Button>
                            </Box>
                            )}
                            {showUpdatePassword && (
                            <Box marginTop={3} textAlign="center">
                                <Button variant="contained" color="secondary" onClick={handleUpdatePasswordClose}>
                                    Fermer mot de passe
                                </Button>
                            </Box>
                            )}
                            {!showUpdatePassword && (
                            <Box marginTop={3} textAlign="center">
                                <Button variant="contained" color="secondary" onClick={handleUpdatePasswordClick}>
                                    Modifier le mot de passe
                                </Button>
                            </Box>
                            )}
                            {showUpdatePassword && (
                                <>
                                    <br />
                                    <br />
                                </>
                            )}
                             <Collapse in={isPasswordCollapseOpen} timeout={500}>
                                <Box className={showUpdatePassword ? 'animate-open' : 'animate-close'}>
                                <UpdatePassword />
                                </Box>
                            </Collapse>
                        
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

export default UpdateInformation;
