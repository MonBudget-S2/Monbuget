import React, { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import 'moment/locale/fr';
import CustomAlert from 'ui-component/alert/CustomAlert';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { useEffect } from 'react';
import { meetingService } from 'service/meetingService';
import AppointementDialog from './AppointementDialog';
import MeetingInfoDialog from './MeetingInfoDialog';

const PlanningCalendar = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ open: false, type: '', message: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [meetings, setMeetings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null); // Added state to track the selected meeting
  const [isOpenMeetingInfo, setIsOpenMeetingInfo] = useState(false);
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleCloseMeetingInfo = () => {
    setIsOpenMeetingInfo(false);
  };

  const handleMeetingClick = (info) => {
    const meetingId = info.event.extendedProps.meetingId;

    // Make an Axios call to fetch the meeting details based on the meetingId
    meetingService
      .getMeetingDetails(meetingId)
      .then((response) => {
        const meetingDetails = response.data;
        setSelectedMeeting(meetingDetails);
        setIsOpenMeetingInfo(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getCalendarEvents = () => {
    const events = [];

    for (let i = 0; i < meetings.length; i++) {
      const meeting = meetings[i];
      const startTime = moment(meeting.date).toDate();
      const endTime = moment(meeting.date).add(1, 'hour').toDate();

      events.push({
        title: `Meeting with ${meeting.advisor?.username}`,
        start: startTime,
        end: endTime,
        allDay: false,
        backgroundColor: 'red', // Different color for meetings
        extendedProps: {
          meetingId: meeting.id,
          advisorId: meeting.advisorId,
          clientId: meeting.clientId,
          client: meeting.client,
          advisor: meeting.advisor
        }
      });
    }

    return events;
  };

  useEffect(() => {
    // Simulated API call to fetch schedule data
    const fetchScheduleData = async () => {
      const res = await meetingService.getSchedules();
      if (res.status === 200) {
        setSchedules(res.data);
      }
    };

    const fetchMeetingData = async () => {
      const response = await meetingService.getMeetings();
      if (response.status === 200) {
        const meetingsData = response.data;
        setMeetings(meetingsData);
      }
    };

    fetchScheduleData();
    fetchMeetingData();
    setIsLoading(false);
  }, []);

  return (
    <Grid container spacing={2}>
      <CustomAlert open={alertMessage.open} message={alertMessage.message} type={alertMessage.type} setMessage={setAlertMessage} />

      <Grid item xs={12}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <h1>Prenez un rendez-vous avec un conseiller</h1>
          <Button variant="contained" startIcon={<AccessTimeFilledIcon />} onClick={handleDialogOpen}>
            Prendreun rendez-vous
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
          eventClick={handleMeetingClick} // Add eventClick handler to handle meeting click
        />
      </Grid>
      <AppointementDialog
        isOpen={openDialog}
        handleClose={handleDialogClose}
        meetingDetails={selectedMeeting}
        setAlertMessage={setAlertMessage}
        isLoading={isLoading}
      />
      {selectedMeeting !== null && isOpenMeetingInfo && (
        <MeetingInfoDialog isOpen={isOpenMeetingInfo} handleClose={handleCloseMeetingInfo} meetingDetails={selectedMeeting} />
      )}
    </Grid>
  );
};

export default PlanningCalendar;
