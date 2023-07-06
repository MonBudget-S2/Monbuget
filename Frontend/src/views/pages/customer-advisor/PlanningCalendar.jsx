import React, { useState, useEffect } from 'react';
import { Badge, Box, Button, Grid } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import 'moment/locale/fr';
import ScheduleDialog from './ScheduleDialog';
import CustomAlert from 'ui-component/alert/CustomAlert';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { meetingService } from 'service/meetingService';
import PendingRequestsDialog from './PendingRequestDialog';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import MeetingInfoDialog from './MeetingInfoDialog';
const PlanningCalendar = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [alertMessage, setAlertMessage] = useState({ open: false, type: '', message: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isScheduleChanged, setIsScheduleChanged] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [isPendingRequestsOpen, setIsPendingRequestsOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null); // Added state to track the selected meeting
  const [isOpenMeetingInfo, setIsOpenMeetingInfo] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isMeetingChanged, setIsMeetingChanged] = useState(false);
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleClosePendingRequests = () => {
    setIsPendingRequestsOpen(false);
  };

  const handleOpenPendingRequests = () => {
    setIsPendingRequestsOpen(true);
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
      const startTime = moment(meeting.startTime).toDate();
      const endTime = moment(meeting.endTime).toDate();

      events.push({
        title: meeting.status === 'pending' ? `Rdv en attente ` : `Rdv avec ${meeting.client?.username}`,
        start: startTime,
        end: endTime,
        allDay: false,
        backgroundColor: meeting.status === 'pending' ? '#FFC107' : '#4CAF50',
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

        // Filter pending requests
        const pendingRequests = meetingsData.filter((meeting) => meeting.status === 'pending');

        setPendingRequests(pendingRequests);
      }
    };

    fetchScheduleData();
    fetchMeetingData();
    setIsLoading(false);
  }, [isScheduleChanged, isMeetingChanged]);

  return (
    <Grid container spacing={2}>
      <CustomAlert open={alertMessage.open} message={alertMessage.message} type={alertMessage.type} setMessage={setAlertMessage} />

      <Grid item xs={12}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <h1>Mon Agenda</h1>
          <Button variant="contained" color="secondary" startIcon={<HourglassBottomIcon />} onClick={handleOpenPendingRequests}>
            Voir les demandes en attente
            <Badge badgeContent={pendingRequests?.length} color="error" showZero />
          </Button>
          <Button variant="contained" startIcon={<AccessTimeFilledIcon />} onClick={handleDialogOpen}>
            Voir mon planning
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
      <ScheduleDialog
        isOpen={openDialog}
        handleClose={handleDialogClose}
        setAlertMessage={setAlertMessage}
        schedules={schedules}
        setIsScheduleChanged={setIsScheduleChanged}
        isLoading={isLoading}
      />
      {isPendingRequestsOpen && (
        <PendingRequestsDialog
          isOpen={isPendingRequestsOpen}
          handleClose={handleClosePendingRequests}
          pendingRequests={pendingRequests}
          setAlertMessage={setAlertMessage}
          setIsMeetingChanged={setIsMeetingChanged}
        />
      )}
      {selectedMeeting !== null && isOpenMeetingInfo && (
        <MeetingInfoDialog isOpen={isOpenMeetingInfo} handleClose={handleCloseMeetingInfo} meetings={meetings} />
      )}
    </Grid>
  );
};

export default PlanningCalendar;
