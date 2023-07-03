import Grid from '@mui/material/Grid';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import datas from './BudgetEventData';
import SeeAllButton from '../../../ui-component/buttons/SeeAllButton';
import chartData from 'views/dashboard/BudgetEvent/BudgetEventChartDate';
import React, { useEffect, useState } from 'react';
import BudgetEventChart from 'views/dashboard/BudgetEvent/BudgetEventChart';
import AddBudgetEvent from './AddBudgetEvent';
import MainCard from 'ui-component/cards/MainCard';
import CustomAlert from 'ui-component/alert/CustomAlert';
const BugetEvent = () => {
  const [alertMessage, setAlertMessage] = useState({ open: false, type: '', message: '' });
  const [isBudgetEventChanged, setIsBudgetEventChanged] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const redirecter = (id) => {
    console.log(id);
  };

  const handleClickOpen = () => {
    setIsAddFormOpen(true);
  };

  useEffect(() => {
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
      <Grid item xs={12} md={12}>
        <BudgetEventChart
          isLoading={isLoading}
          options={chartData.options}
          series={chartData.series}
          type={chartData.type}
          height={chartData.height}
          isBudgetEventChanged={isBudgetEventChanged}
        />
      </Grid>
      <Grid item xs={6} container alignItems="center" justifyContent="flex-start">
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
                {datas.slice(-3).map((row) => (
                  <TableRow key={row.id} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="center">{row.amount}</TableCell>
                    <TableCell align="center">{row.startDate}</TableCell>
                    <TableCell align="center">{row.endDate}</TableCell>
                    <TableCell align="center">
                      <Button variant="outlined" color="primary" onClick={() => redirecter(row.id)} sx={{ marginRight: '8px' }}>
                        Voir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {datas.length > 5 && <SeeAllButton to="/budgetEvenementielAll/" title="Tout afficher" sx={{ marginTop: '16px' }} />}
          </TableContainer>
        </MainCard>
      </Grid>
      <Grid item xs={6} container alignItems="center" justifyContent="flex-start">
        <MainCard>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <h1>My Expense</h1>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Nom du budget</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                    Expense
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                    Amount
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datas.slice(-3).map((row) => (
                  <TableRow key={row.id} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="center">{row.amount}</TableCell>
                    <TableCell align="center">{row.startDate}</TableCell>
                    <TableCell align="center">{row.endDate}</TableCell>
                    <TableCell align="center">
                      <Button variant="outlined" color="primary" onClick={() => redirecter(row.id)} sx={{ marginRight: '8px' }}>
                        Voir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {datas.length > 5 && <SeeAllButton to="/BudgetEventExpense" title="Tout afficher" sx={{ marginTop: '16px' }} />}
          </TableContainer>
        </MainCard>
      </Grid>
    </Grid>
  );
};
export default BugetEvent;
