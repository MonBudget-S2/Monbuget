import React from 'react';
import eventService from '../../../service/eventService';
import MainCard from 'ui-component/cards/MainCard';
import { Button, Table, TableCell, TableContainer, TableRow, TableBody, Paper, TableHead } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

export default function EventInvitation({ setAlertMessage }) {
  const [eventInvitations, setEventInvitations] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const acceptInvitation = async (id) => {
    const res = await eventService.acceptInvitation(id);
    if (res.status === 200) {
      setAlertMessage({ open: true, type: 'success', message: 'Invitation acceptée' });
    } else {
      setAlertMessage({ open: true, type: 'error', message: "Erreur lors de l'acceptation de l'invitation" });
    }
  };

  const refuserInvitation = async (id) => {
    const res = await eventService.rejectInvitation(id);
    if (res.status === 200) {
      setAlertMessage({ open: true, type: 'success', message: 'Invitation refusée' });
    } else {
      setAlertMessage({ open: true, type: 'error', message: "Erreur lors du refus de l'invitation" });
    }
  };

  useEffect(() => {
    const getAllInvitations = async () => {
      const res = await eventService.getAllInvitations();
      if (res.status === 200) {
        setEventInvitations(res.data);
      }
      setLoading(false);
    };
    getAllInvitations();
  }, []);

  return (
    !isLoading && (
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
                    <TableCell>{row.owner.username}</TableCell>
                    <TableCell align="center">{row.event.name}</TableCell>
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
