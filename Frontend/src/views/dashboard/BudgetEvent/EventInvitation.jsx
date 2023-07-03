import React from 'react';
import eventService from '../../../service/eventService';
import MainCard from 'ui-component/cards/MainCard';
import { Button, Table, TableCell, TableContainer, TableRow, TableBody, Paper, TableHead } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

export default function EventInvitation() {
  const [eventInvitations, setEventInvitations] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const acceptInvitation = (id) => {
    console.log(id);
  };

  const refuserInvitation = (id) => {
    console.log(id);
  };

  useEffect(() => {
    const getEventInvitations = async () => {
      const eventInvitationsFromServer = await eventService.getEventInvitations();
      setEventInvitations(eventInvitationsFromServer);
      setLoading(false);
    };
    getEventInvitations();
  }, []);

  return (
    isLoading && (
      <MainCard>
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <h3>Mes Invitations</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Organisateur</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                  Nom du Buget
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {eventInvitations?.length > 0 &&
                eventInvitations.map((row) => (
                  <TableRow key={row.id} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                    <TableCell>{row.userId}</TableCell>
                    <TableCell align="center">{row.eventId}</TableCell>
                    <TableCell align="center">
                      <Button variant="outlined" color="success" onClick={() => acceptInvitation(row.id)} sx={{ marginRight: '8px' }}>
                        Accepter
                      </Button>
                      <Button variant="outlined" color="error" onClick={() => refuserInvitation(row.id)} sx={{ marginRight: '8px' }}>
                        Refuser
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>
    )
  );
}
