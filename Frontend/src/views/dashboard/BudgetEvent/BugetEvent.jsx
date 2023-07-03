import Grid from '@mui/material/Grid';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import SeeAllButton from '../../../ui-component/buttons/SeeAllButton';
import React, { useEffect, useState } from 'react';
import BudgetEventChart from 'views/dashboard/BudgetEvent/BudgetEventChart';
import AddBudgetEvent from './AddBudgetEvent';
import MainCard from 'ui-component/cards/MainCard';
import CustomAlert from 'ui-component/alert/CustomAlert';
import eventService from 'service/eventService';
import { format } from 'date-fns';
import EventInvitation from './EventInvitation';
const BugetEvent = () => {
  const [alertMessage, setAlertMessage] = useState({ open: false, type: '', message: '' });
  const [isBudgetEventChanged, setIsBudgetEventChanged] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [expenses, setExpenses] = useState([]);

  console.log(isBudgetEventChanged);
  const redirecter = (id) => {
    console.log(id);
  };

  const handleClickOpen = () => {
    setIsAddFormOpen(true);
  };

  useEffect(() => {
    const getEvents = async () => {
      const res = await eventService.getEvents();
      if (res.status === 200) {
        setEvents(res.data);
      } else {
        setAlertMessage({ open: true, type: 'error', message: 'Erreur lors de la récupération des événements' });
      }
    };

    const getExpenses = async () => {
      const res = await eventService.getAllExpenses();
      if (res.status === 200) {
        setExpenses(res.data);
      } else {
        setAlertMessage({ open: true, type: 'error', message: 'Erreur lors de la récupération des dépenses' });
      }
    };
    getEvents();
    getExpenses();
    setLoading(false);
  }, []);

  return (
    <Grid container alignItems="flex-start" spacing={3}>
      <CustomAlert open={alertMessage.open} message={alertMessage.message} type={alertMessage.type} setMessage={setAlertMessage} />

      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          <Typography style={{ color: 'white' }} variant="subtitle1">
            Ajouter un evénement budgétaire
          </Typography>
        </Button>
        <AddBudgetEvent
          setAlertMessage={setAlertMessage}
          setIsBudgetEventChanged={setIsBudgetEventChanged}
          isAddFormOpen={isAddFormOpen}
          setIsAddFormOpen={setIsAddFormOpen}
        />
      </Grid>

      <Grid item xs={12} md={7}>
        <BudgetEventChart isLoading={isLoading} events={events} />
      </Grid>
      <Grid item xs={12} md={5}>
        <EventInvitation setAlertMessage={setAlertMessage} />
      </Grid>
      <Grid item xs={6} md={12} container alignItems="center" justifyContent="flex-start">
        <MainCard>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <h1>My BudgetEvent</h1>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Nom du budget</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                    Montant alloué
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                    Start Date
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                    End Date
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.length > 0 &&
                  events.slice(-5).map((row) => (
                    <TableRow key={row.id} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="center">{row.amount}</TableCell>
                      <TableCell align="center">{format(new Date(row.startDate), 'dd-MM-yyyy')}</TableCell>
                      <TableCell align="center">{format(new Date(row.endDate), 'dd-MM-yyyy')}</TableCell>
                      <TableCell align="center">
                        <Button variant="outlined" color="primary" onClick={() => redirecter(row.id)} sx={{ marginRight: '8px' }}>
                          Voir
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {events.length > 5 && <SeeAllButton to="dashboard/budgetEvenementielAll/" title="Tout afficher" sx={{ marginTop: '16px' }} />}
          </TableContainer>
        </MainCard>
      </Grid>
      <Grid item xs={6} md={12} container alignItems="center" justifyContent="flex-start">
        <MainCard>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <h1>My Expense</h1>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Nom du budget</TableCell>

                  <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                    Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.length > 0 &&
                  expenses.slice(-5).map((row) => (
                    <TableRow key={row.id} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                      <TableCell>{row.eventBudget?.name}</TableCell>
                      <TableCell align="center">{row.amountPaid}</TableCell>
                      <TableCell align="center">
                        <Button variant="outlined" color="primary" onClick={() => redirecter(row.id)} sx={{ marginRight: '8px' }}>
                          Voir
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {expenses.length > 5 && <SeeAllButton to="dashboard/BudgetEventExpense" title="Tout afficher" sx={{ marginTop: '16px' }} />}
          </TableContainer>
        </MainCard>
      </Grid>
    </Grid>
  );
};
export default BugetEvent;
