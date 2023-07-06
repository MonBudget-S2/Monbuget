import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogActions, DialogTitle, Button, Grid, Typography, CircularProgress } from '@mui/material';
import { meetingService } from 'service/meetingService';
// const availabilityData = [
//   new Date('2023-07-06T09:00:00.000Z'),
//   new Date('2023-07-06T10:00:00.000Z'),
//   new Date('2023-07-06T11:00:00.000Z')
//   // ...
// ];
export default function AppointmentDialog({ isOpen, handleClose, setAlertMessage }) {
  const [isLoading, setIsLoading] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    // Simulating API call to fetch availability
    const fetchAvailability = async () => {
      setIsLoading(true);
      const advisorId = 'eea473e1-f0d6-4d46-8306-7e8bee1dea86';
      const res = await meetingService.getAvailableSlotsForAppointment(advisorId);
      if (res.status === 200) {
        setAvailability(res.data);
        console.log('res.data', res.data);
      } else {
        setAlertMessage({ open: true, type: 'error', message: 'Erreur lors de la récupération des créneaux disponibles.' });
      }
      setIsLoading(false);
    };

    if (isOpen) {
      fetchAvailability();
    }
  }, [isOpen, setAlertMessage]);

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
  };

  const handleRequestAppointment = async () => {
    if (selectedSlot) {
      // Perform appointment booking logic here
      console.log('Selected slot:', selectedSlot);
      const dataToSend = {
        advisorId: 'eea473e1-f0d6-4d46-8306-7e8bee1dea86',
        customerId: 'eea473e1-f0d6-4d46-8306-7e8bee1dea86',
        startTime: selectedSlot
      };
      const res = await meetingService.requestMeeting(dataToSend);
      if (res.status === 201) {
        console.log('res.data', res.data);
        handleClose();
        setAlertMessage({ open: true, type: 'success', message: 'Votre demande de rendez-vous a été envoyée avec succès.' });
      } else {
        setAlertMessage({ open: true, type: 'error', message: 'Erreur lors de la demande de rendez-vous.' });
      }
      // ...
    } else {
      setAlertMessage('Please select a slot');
    }
  };

  const renderSlots = () => {
    if (isLoading) {
      return <CircularProgress />;
    }

    if (availability.length === 0) {
      return <Typography>No available slots</Typography>;
    }

    return availability.map((slot) => {
      const dateObject = new Date(slot);
      const formattedDate = dateObject.toLocaleDateString();
      const formattedTime = dateObject.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

      return (
        <Grid item key={slot}>
          <Button variant={selectedSlot === slot ? 'contained' : 'outlined'} onClick={() => handleSelectSlot(slot)}>
            {formattedDate} - {formattedTime}
          </Button>
        </Grid>
      );
    });
  };
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Appointment</DialogTitle>
      <DialogContent>
        <Typography variant="body1">You have an appointment with an advisor.</Typography>
        <Typography variant="body1">Please select a slot:</Typography>
        <Grid container spacing={1}>
          {renderSlots()}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRequestAppointment} disabled={isLoading}>
          Request Appointment
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
