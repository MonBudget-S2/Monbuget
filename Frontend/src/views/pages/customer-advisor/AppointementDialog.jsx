import { Dialog, DialogContent, DialogActions, DialogTitle, Button } from '@mui/material';
import React from 'react';

export default function AppointementDialog({ isOpen, handleClose, setAlertMessage, isLoading }) {
  console.log(setAlertMessage, isLoading);
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Appointement</DialogTitle>
      <DialogContent>
        <p>Vous avez un rendez-vous avec un conseiller</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
}
