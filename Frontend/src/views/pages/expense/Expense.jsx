import React, { useEffect, useState } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import ExpenseChart from './ExpenseChart';
import ExpenseCard from './ExpenseCard';
import ExpenseByCategory from './ExpenseByCategory';
import CreateButton from 'ui-component/buttons/CreateButton';
import TotalExpenseByMonth from './TotalExpenseByMonth';
import MostExpensive from './MostExpensive';
// import SeeAllButton from 'ui-component/buttons/SeeAllButton';

import expenseByCategoryData from './expense-by-category';
import chartData from './expense-chart-data';
import expenseHistoryData from './expensive-history-data';

const Expense = () => {
  const [totalRealExpenses, setTotalRealExpenses] = useState(0);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);

    const realExpenses = chartData.series[0].data.reduce((acc, value) => acc + value, 0);
    setTotalRealExpenses(realExpenses);
  }, []);

  const handleEdit = () => {
    // Logique pour modifier une dépense
  };

  const handleDelete = () => {
    // Logique pour supprimer une dépense
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <ExpenseCard isLoading={isLoading} title="Total des dépenses réelles" total={totalRealExpenses} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalExpenseByMonth isLoading={isLoading} title="Total des dépenses réelles" total={totalRealExpenses} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <CreateButton to="/addincome" title="Ajouter une dépense" />
      </Grid>
      <Grid item xs={12} md={6}>
        <MostExpensive />
      </Grid>
      <Grid item xs={12} md={6}>
        <MainCard sx={{ mx: 3 }}>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Catégorie de dépense</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                    Montant reçu
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                    Date de réception
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenseHistoryData.slice(-5).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.expenseCategory}</TableCell>
                    <TableCell align="center">-{row.amount}€</TableCell>
                    <TableCell align="center">{new Date(row.date).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell align="center">
                      <Button variant="outlined" color="primary" onClick={() => handleEdit(row.id)} sx={{ marginRight: '8px' }}>
                        Voir
                      </Button>
                      <Button variant="outlined" color="secondary" onClick={() => handleDelete(row.id)}>
                        Supprimer
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {expenseHistoryData.length > 5 && (
              <Button variant="outlined" color="primary" onClick={() => console.log('Afficher tout')}>
                Afficher tout
              </Button>
            )}
          </TableContainer>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={6}>
        <ExpenseByCategory expenses={expenseByCategoryData} series={chartData.series} isLoading={isLoading} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ExpenseChart series={chartData.series} isLoading={isLoading} />
      </Grid>
    </Grid>
  );
};

export default Expense;
