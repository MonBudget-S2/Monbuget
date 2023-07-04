import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import 'moment/locale/fr';

const ClientCalendar = ({ clientId }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Simulated data from the database
    const meetings = [
      { "meetingId":"1", "date": "2023-07-11T00:00:00", "adviserId":"123", "clientId":"875" },
      { "meetingId":"2", "date": "2023-07-12T00:00:00", "adviserId":"123", "clientId":"876" },
      { "meetingId":"3", "date": "2023-07-13T00:00:00", "adviserId":"123", "clientId":"877" },
      // add more meetings...
    ];

    // filter meetings for this client
    //const clientMeetings = meetings.filter(m => m.clientId === clientId);
const clientMeetings = meetings
    // map meetings to events
    const eventList = clientMeetings.map(m => {
      const startTime = moment(m.date).toDate();
      const endTime = moment(startTime).add(1, 'hours').toDate();

      return {
        title: 'Meeting',
        start: startTime,
        end: endTime,
        allDay: false,
        backgroundColor: 'red', // Different color for meetings
      };
    });

    setEvents(eventList);
  }, [clientId]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      headerToolbar={{
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      }}
      buttonText={{
        today: 'aujourd\'hui',
        month: 'mois',
        week: 'semaine',
        day: 'jour'
      }}
      locale="fr"
      allDaySlot={false}
      firstDay={1} // The week starts on Monday
    />
  );
};

export default ClientCalendar;
