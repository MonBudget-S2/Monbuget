import React, { useEffect, useState } from 'react';
import { CardContent, Box, Button, TextField, Snackbar, Alert, Collapse, Card } from '@mui/material';
import userImage from '../../../assets/images/users/user-round.svg';
import { getUser } from 'store/authSlice';
import { useSelector } from 'react-redux';
import UpdatePassword from './UpdatePassword';
import userService from 'service/userService';


const UpdateInformation = () => {
    const user= useSelector(getUser);
    const [alertMessage, setAlertMessage] = useState({ open: false, type: 'info', message: '' });
    const [isCardOpen, setCardOpen] = useState(false);
    const [showUpdatePassword, setShowUpdatePassword] = useState(false);
    const [isPasswordCollapseOpen, setPasswordCollapseOpen] = useState(false);
    /*const [setImageFile] = useState(null);*/
    const [imageData, setImageData] = useState(null);


    const [editedUser, setEditedUser] = useState({
        firstname: user?.userInfo?.firstname,
        lastName: user?.userInfo?.lastname,
        username: user?.userInfo?.username,
        email: user?.userInfo?.email,
        avatarUrl:user?.userInfo?.avatarUrl,
    });
    const fetchImage = async () => {
        // Effectuez votre requête pour obtenir les données de l'image (par exemple, via Axios)
        if (user.userInfo.avatarUrl)
        {
            const response = await userService.getAvatar(user.userInfo.avatarUrl);
            // Convertissez les données binaires en une chaîne Base64
            const base64Image = btoa(
                new Uint8Array(response.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ''
                )
            );

            // Créez l'URL d'objet à partir de la chaîne Base64
            const imageUrl = `data:image/png;base64,${base64Image}`;
            // Mettez à jour l'état avec l'URL de l'image
            setImageData(imageUrl);
        }
        else {
            setImageData(null);
        }



    };

    useEffect(() => {
        setCardOpen(true); // Ouvrir la carte une fois le composant monté
    }, []);

    useEffect(() => {
        fetchImage();
    }, []);

    const handleFieldChange = (event) => {
        const { name, value } = event.target;
        setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
    };
    const handleSaveClick = async () => {
        try {
            const res = await userService.update(user?.id, {
                firstname: editedUser.firstname,
                lastname: editedUser.lastName,
                username: editedUser.username,
                email: editedUser.email,
            });
            console.log("zad",res);
           // Ignorer la réponse en utilisant une variable `_`


        setAlertMessage({ open: true, type: 'success', message: 'Modification prise en compte' });
        } catch (error) {
            if (error.response && error.response.data) {
                setAlertMessage({ open: true, type: 'error', message: error.response.data.message });
            } else {
                setAlertMessage({ open: true, type: 'error', message: "Une erreur s'est produite lors de la modification" });
                }
        }
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
        const formData = new FormData();
        if (file) {
            formData.append('file',file);
            userService.uploadAvatar(user.id,formData);
            window.location.reload()
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
                                {imageData ? (
                                <img
                                    src={imageData}
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
                                value={editedUser.firstname}
                                onChange={handleFieldChange}
                                margin="normal"
                                fullWidth
                                disabled={showUpdatePassword}
                                />
                                <TextField
                                name="lastName"
                                label="Nom"
                                value={editedUser.lastName}
                                onChange={handleFieldChange}
                                margin="normal"
                                fullWidth
                                disabled={showUpdatePassword}
                                />
                                <TextField
                                name="username"
                                label="Nom d'utilisateur"
                                value={editedUser.username}
                                onChange={handleFieldChange}
                                margin="normal"
                                fullWidth
                                disabled={showUpdatePassword}
                                />
                        </Box>
                        <TextField
                            name="email"
                            label="Email"
                            value={editedUser.email}
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
                                    Changer mot de passe
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
