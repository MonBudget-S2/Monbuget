import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import eventService from 'service/eventService';
import CustomAlert from 'ui-component/alert/CustomAlert';
import { Done } from '@mui/icons-material';



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

    const handleEndEvent = async () => {
        try {
            await eventService.endEvent(eventId);
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
                <Done />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Terminer l&apos;événement</DialogTitle>
                <DialogContent>
                    <Typography>
                        Êtes-vous sûr de vouloir terminer cet événement budgétaire ?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annuler
                    </Button>
                    {isEventEnded ? (
                    <Typography>
                        L&apos;événement a été terminé.
                    </Typography>
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
