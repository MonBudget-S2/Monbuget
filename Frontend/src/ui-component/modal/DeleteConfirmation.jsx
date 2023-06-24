import { Close } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export default function DeleteConfirmation({ onSubmit, message = 'Voulez vous vraiment supprimer cet élément ?', isOpen, setIsOpen }) {
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleSubmit = () => {
    onSubmit();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Confirmation</DialogTitle>

      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={handleClose}>
          Annuler
        </Button>
        <Button color="secondary" variant="contained" onClick={handleSubmit}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
