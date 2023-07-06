import React from 'react';
import { Button, ListItem, ListItemText, Typography, Dialog, DialogTitle, DialogContent, DialogActions, List } from '@mui/material';
import { format } from 'date-fns';
import { meetingService } from 'service/meetingService';

const PendingRequestsDialog = ({ isOpen, handleClose, pendingRequests, setAlertMessage, setIsMeetingChanged }) => {
  //   const [pendingRequests, setPendingRequests] = useState([]);

  //   useEffect(() => {
  //     const pendingRequests = meetings.filter((meeting) => meeting.status === 'pending');
  //     setPendingRequests(pendingRequests);
  //   }, [meetings]);

  const handleAcceptRequest = async (request) => {
    console.log(request);
    const res = await meetingService.acceptMeetingRequest(request.meetingId);
    if (res.status === 200) {
      setAlertMessage({ open: true, type: 'success', message: 'Meeting request accepted successfully.' });
      setIsMeetingChanged(true);
      handleClose();
    } else {
      setAlertMessage({ open: true, type: 'error', message: 'Failed to accept meeting request.' });
    }

    // Handle accept request logic here
  };

  const handleRejectRequest = (request) => {
    console.log(request);

    // Handle reject request logic here
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Pending Requests</DialogTitle>
      <DialogContent>
        <List>
          {pendingRequests && pendingRequests.length > 0 ? (
            pendingRequests.map((request) => (
              <ListItem key={request.meetingId}>
                <ListItem key={request.meetingId}>
                  <ListItemText
                    primary={request.client?.username}
                    secondary={
                      <>
                        <Typography variant="body2">Start Time: {format(new Date(request.startTime), 'yyyy-MM-dd HH:mm:ss')}</Typography>
                        <Typography variant="body2">End Time: {format(new Date(request.endTime), 'yyyy-MM-dd HH:mm:ss')}</Typography>
                      </>
                    }
                  />
                  <Button variant="contained" color="success" onClick={() => handleAcceptRequest(request)}>
                    Accept
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleRejectRequest(request)}>
                    Reject
                  </Button>
                </ListItem>
              </ListItem>
            ))
          ) : (
            <Typography variant="body2">No pending requests</Typography>
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PendingRequestsDialog;
