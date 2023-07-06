import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import CustomAlert from 'ui-component/alert/CustomAlert';



const EndEventBudget = ({eventId, onEventEnded }) => {
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ open: false, type: '', message: '' });
    const [isEventEnded, setIsEventEnded] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
        console.log(eventId, 'eventId'); 
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleEndEvent = () => {
        try {
            setIsEventEnded(true); 
            onEventEnded(); 
        } catch (error) {
            setAlertMessage({ open: true, type: 'error', message: 'Erreur lors de la terminaison de l\'événement' });
        }
    };
    

    return (
        <>
        <CustomAlert open={alertMessage.open} message={alertMessage.message} type={alertMessage.type} setMessage={setAlertMessage} />
        <Button variant="contained" color="error" onClick={handleClickOpen}>
            <Typography>
                Terminer l&apos;événement
            </Typography>
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Terminer l&apos;événement</DialogTitle>
            <DialogContent>
                {isEventEnded ? (
                    <Typography>
                        L&apos;événement est terminé.
                    </Typography>
                ) : (
                    <Typography>
                        Êtes-vous sûr de vouloir terminer cet événement budgétaire ?
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                {!isEventEnded && (
                    <Button onClick={handleClose} color="primary">
                        Annuler
                    </Button>
                )}
                {isEventEnded ? (
                    <Button onClick={handleClose} color="primary">
                        Fermer
                    </Button>
                ) : (
                    <Button onClick={handleEndEvent} color="error" autoFocus>
                        Terminer
                    </Button>
                )}
            </DialogActions>
        </Dialog>
        </>
    );
};

export default EndEventBudget;
