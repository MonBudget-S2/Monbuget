import React from 'react';
import { Dialog, DialogContent, DialogActions, DialogTitle, Button, Typography, Grid } from '@mui/material';
import { format } from 'date-fns';

const MeetingInfoDialog = ({ isOpen, handleClose, meetingDetails }) => {
  const { startTime, endTime, advisor, client, status } = meetingDetails;

  const formatDateTime = (dateTime) => {
    return format(new Date(dateTime), 'yyyy-MM-dd HH:mm:ss');
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'primary';
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Meeting Details</DialogTitle>
      <DialogContent>
        <Button variant="contained" color={getStatusColor(status)}>
          {status}
        </Button>

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
