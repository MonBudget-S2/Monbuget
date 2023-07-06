import React from 'react';
import { Dialog, DialogContent, DialogActions, DialogTitle, Button, Typography, Grid } from '@mui/material';

const MeetingInfoDialog = ({ isOpen, handleClose, meetingDetails }) => {
  let startTime = null;
  let endTime = null;
  let advisorId = null;
  let clientId = null;
  if (meetingDetails) {
    startTime = meetingDetails?.startTime?.toLocaleString();
    endTime = meetingDetails?.endTime?.toLocaleString();
    advisorId = meetingDetails?.advisorId;
    clientId = meetingDetails?.clientId;
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Meeting Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Start Time:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{startTime}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">End Time:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{endTime}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Advisor ID:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{advisorId}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Client ID:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{clientId}</Typography>
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
