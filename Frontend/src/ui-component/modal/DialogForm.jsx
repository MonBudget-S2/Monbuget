import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
export default function DialogForm({ title, isOpen, setIsOpen, onSubmit = null, onCancel = () => {}, isSubmitting = false, children }) {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form refresh
    if (onSubmit) {
      onSubmit();
    }
    onSubmit();
  };
  const handleCancel = () => {
    setIsOpen(false);
    onCancel();
  };
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle align="center" sx={{ fontSize: '1.4em', fontWeight: 500 }}>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
              '& .MuiTextField-root': { my: 2, mx: 4, width: '18ch' },
              '& .MuiSelectField-root': { my: 2, mx: 4, width: '18ch' }
            }}
          >
            {children}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button size="large" type="submit" variant="contained" color="secondary">
            Valider
          </Button>
          <Button onClick={handleCancel} disabled={isSubmitting}>
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
