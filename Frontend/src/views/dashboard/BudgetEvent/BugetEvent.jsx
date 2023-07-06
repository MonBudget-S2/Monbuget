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
import { useNavigate } from 'react-router';
import EndEventBudget from './EndEventBudget';
import { Visibility, Check } from '@mui/icons-material';


const BugetEvent = () => {
  const [alertMessage, setAlertMessage] = useState({ open: false, type: '', message: '' });
  const [isBudgetEventChanged, setIsBudgetEventChanged] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();
  const [setEventId] = useState(null);

  const redirecter = (id) => {
    navigate('/dashboard/budgetEvent/' + id);
  };

  const handleClickOpen = (id) => {
    setIsAddFormOpen(true);
    setEventId(id);
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
  }, [isBudgetEventChanged]);

  const handleEventEnded = () => {
    setIsBudgetEventChanged(true);
    setAlertMessage({ open: true, type: 'success', message: 'L\'événement a été terminé avec succès.' });
  };

  return (
    <Grid container alignItems="flex-start" spacing={3}>
      <CustomAlert open={alertMessage.open} message={alertMessage.message} type={alertMessage.type} setMessage={setAlertMessage} />

      <Grid item xs={12}>
        <Grid item justifyContent="space-between" alignItems="center">
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            <Typography style={{ color: 'white' }} variant="subtitle1">
              Ajouter un événement budgétaire
            </Typography>
          </Button>
          <AddBudgetEvent
            setAlertMessage={setAlertMessage}
            setIsBudgetEventChanged={setIsBudgetEventChanged}
            isAddFormOpen={isAddFormOpen}
            setIsAddFormOpen={setIsAddFormOpen}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} md={7}>
        <BudgetEventChart isLoading={isLoading} events={events} />
      </Grid>

      <Grid item xs={12} md={5}>
        <EventInvitation setAlertMessage={setAlertMessage} />
        <Grid item xs={6} md={12} container alignItems="center" justifyContent="flex-start">
        <MainCard>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <h3>Mes dépenses</h3>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Nom du budget</TableCell>

                  <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                    Montant Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.length > 0 &&
                  expenses.slice(-5).map((row) => (
                    <TableRow key={row.id} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                      <TableCell>{row.eventBudget?.name}</TableCell>
                      <TableCell align="center">{row.amountPaid}€</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {expenses.length > 5 && <SeeAllButton to="dashboard/BudgetEventExpense" title="Tout afficher" sx={{ marginTop: '16px' }} />}
          </TableContainer>
        </MainCard>
      </Grid>
      </Grid>

      <Grid item xs={12}>
      <MainCard>
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
            Mes budgets événementiels
          </Typography>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Nom du budget</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Montant alloué
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Début
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Fin
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.length > 0 &&
                events.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="center">{row.amount}€</TableCell>
                    <TableCell align="center">{format(new Date(row.startDate), 'dd-MM-yyyy')}</TableCell>
                    <TableCell align="center">{format(new Date(row.endDate), 'dd-MM-yyyy')}</TableCell>
                    <TableCell align="center">
                      <Button variant="outlined" color="primary" onClick={() => redirecter(row.id)} sx={{ marginRight: '8px' }}>
                        <Visibility />
                      </Button>
                      <EndEventBudget eventId={row.id} onEventEnded={handleEventEnded} onClick={() => handleClickOpen(row.id)}>
                        <Check />
                      </EndEventBudget>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {events.length > 5 && <SeeAllButton to="dashboard/budgetEvenementielAll/" title="Tout afficher" sx={{ marginTop: '16px' }} />}
        </TableContainer>
      </MainCard>
    </Grid>
      
    </Grid>
  );
};

export default BugetEvent;
