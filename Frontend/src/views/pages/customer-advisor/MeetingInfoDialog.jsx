import React from 'react';
import { Dialog, DialogContent, DialogActions, DialogTitle, Button, Typography, Grid } from '@mui/material';
import { format } from 'date-fns';

const MeetingInfoDialog = ({ isOpen, handleClose, meetingDetails }) => {
  const { startTime, endTime, advisor, client } = meetingDetails;

  const formatDateTime = (dateTime) => {
    return format(new Date(dateTime), 'yyyy-MM-dd HH:mm:ss');
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Meeting Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Start Time:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{formatDateTime(startTime)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">End Time:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{formatDateTime(endTime)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Advisor:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{advisor?.username}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Client:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{client?.username}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MeetingInfoDialog;
