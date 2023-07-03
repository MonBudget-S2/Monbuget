import React from 'react';

export default function EventInvitation() {
    
  return (
    <Grid item xs={12} md={5}>
      <MainCard>
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <h1>Mes Invitations Budgets</h1>
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
              {BudgetEventInvitationData.slice(-3).map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                  <TableCell>{row.userId}</TableCell>
                  <TableCell align="center">{row.eventId}</TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" color="primary" onClick={() => acceptInvitation(row.id)} sx={{ marginRight: '8px' }}>
                      Accepter
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => refuserInvitation(row.id)} sx={{ marginRight: '8px' }}>
                      Refuser
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>
    </Grid>
  );
}
