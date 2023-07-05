import React, { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import 'moment/locale/fr';
import ScheduleDialog from './ScheduleDialog';
import CustomAlert from 'ui-component/alert/CustomAlert';

const CustomerAdvisor = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [slotSettings, setSlotSettings] = useState({});
  const [alertMessage, setAlertMessage] = useState({ open: false, type: '', message: '' });

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSaveSlotSettings = (newSettings) => {
    setSlotSettings(newSettings);
    setOpenDialog(false);
  };

  const getCalendarEvents = () => {
    const events = [];

    // Simulated data from the database
    const meetings = [
      { meetingId: '1', date: '2023-07-07T09:00:00', advisorId: '123', clientId: '875' },
      { meetingId: '2', date: '2023-07-07T10:00:00', advisorId: '123', clientId: '876' },
      { meetingId: '3', date: '2023-07-08T11:00:00', advisorId: '123', clientId: '877' },
      { meetingId: '4', date: '2023-07-08T15:00:00', advisorId: '123', clientId: '878' },
      { meetingId: '5', date: '2023-07-09T10:00:00', advisorId: '123', clientId: '879' },
      { meetingId: '6', date: '2023-07-09T14:00:00', advisorId: '123', clientId: '880' },
      { meetingId: '7', date: '2023-07-12T10:00:00', advisorId: '123', clientId: '881' },
      { meetingId: '8', date: '2023-07-13T10:00:00', advisorId: '123', clientId: '882' },
      { meetingId: '9', date: '2023-07-14T14:00:00', advisorId: '123', clientId: '883' },
      { meetingId: '10', date: '2023-07-15T14:00:00', advisorId: '123', clientId: '884' }
    ];

    // find next Monday
    let date = moment().startOf('week').add(1, 'week');

    // iterate for the next 14 days
    for (let i = 0; i < 14; i++) {
      const day = date.locale('fr').format('dddd');
      const daySettings = slotSettings[day];

      if (daySettings) {
        Object.keys(daySettings).forEach((slot) => {
          const startTime = date.hour(parseInt(slot)).minutes(0).seconds(0).toDate();
          const endTime = moment(startTime).add(1, 'hours').toDate();

          // Check if there is a meeting scheduled for this slot
          const meeting = meetings.find((m) => {
            const meetingDate = moment(m.date);
            return meetingDate.isSame(startTime, 'hour');
          });

          if (meeting) {
            // If a meeting is scheduled, add it to the calendar
            events.push({
              title: 'Meeting',
              start: startTime,
              end: endTime,
              allDay: false,
              backgroundColor: 'red' // Different color for meetings
            });
          } else if (daySettings[slot]) {
            // If no meeting is scheduled and the advisor is available, add an available slot
            events.push({
              title: 'Disponible',
              start: startTime,
              end: endTime,
              allDay: false
            });
          }
        });
      }

      // advance to the next day
      date = date.add(1, 'days');
    }
    return events;
  };

  return (
    <Grid container spacing={2}>
      <CustomAlert open={alertMessage.open} message={alertMessage.message} type={alertMessage.type} setMessage={setAlertMessage} />

      <Grid item xs={12}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <h1>Prenez un rendez-vous avec un conseiller</h1>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleDialogOpen}>
            Ajouter des créneaux
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={getCalendarEvents()}
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
          }}
          buttonText={{
            today: "aujourd'hui",
            month: 'mois',
            week: 'semaine',
            day: 'jour'
          }}
          locale="fr"
          allDaySlot={false}
          firstDay={1} // The week starts on Monday
        />
      </Grid>
      <ScheduleDialog
        isOpen={openDialog}
        handleClose={handleDialogClose}
        setAlertMessage={setAlertMessage}
        onSave={handleSaveSlotSettings}
        initialSettings={slotSettings}
      />
    </Grid>
  );
};

export default CustomerAdvisor;
