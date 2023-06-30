import React, { useEffect, useState } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';
// import ExpenseChart from './ExpenseChart';
import ExpenseCard from './ExpenseCard';
import ExpenseByCategory from './ExpenseByCategory';
// import CreateButton from 'ui-component/buttons/CreateButton';
import AverageExpenseByMonth from './AverageExpenseByMonth';
import MostExpensive from './MostExpensive';
import NbExpenseByMonth from './NbExpenseByMonth';
// import SeeAllButton from 'ui-component/buttons/SeeAllButton';

import ListExpense from './ListExpense';
import AddExpense from './AddExpense';
import CustomAlert from 'ui-component/alert/CustomAlert';
import expenseService from 'service/expenseService';

const Expense = () => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState({ open: false, type: '', message: '' });
  const [isExpenseChanged, setIsExpenseChanged] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await expenseService.getExpenses();

      if (response.status === 200) {
        console.log('test', response.data);
        setExpenses(response.data);
        const totalAmount = response.data.reduce((acc, value) => acc + value.amount, 0);
        console.log('totalAmount', totalAmount);
        setTotalExpense(totalAmount);
      } else {
        console.log('Erreur lors de la récupération des dépenses');
      }
      setIsLoading(false);
    };
    fetchData();
  }, [isExpenseChanged]);

  const handleClickOpen = () => {
    setIsAddFormOpen(true);
  };

  useEffect(() => {
    console.log('isExpenseChanged', isExpenseChanged);
    if (isExpenseChanged) {
      setIsExpenseChanged(false);
    }
  }, [isExpenseChanged]);

  return (
    <Grid container spacing={gridSpacing}>
      <CustomAlert open={alertMessage.open} message={alertMessage.message} type={alertMessage.type} setMessage={setAlertMessage} />

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <ExpenseCard isLoading={isLoading} title="Total des dépenses réelles" total={totalExpense} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <AverageExpenseByMonth isLoading={isLoading} key={isExpenseChanged} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <NbExpenseByMonth isLoading={isLoading} key={isExpenseChanged} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          <Typography style={{ color: 'white' }} variant="subtitle1">
            Ajouter une dépense
          </Typography>
        </Button>
        <AddExpense
          setAlertMessage={setAlertMessage}
          setIsExpenseChanged={setIsExpenseChanged}
          isAddFormOpen={isAddFormOpen}
          setIsAddFormOpen={setIsAddFormOpen}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <MostExpensive />
      </Grid>
      <Grid item xs={12} md={6}>
        <ExpenseByCategory key={isExpenseChanged} />
      </Grid>
      {/* <Grid item xs={12} md={6}>
        <ExpenseChart series={chartData.series} isLoading={isLoading} />
      </Grid> */}
      <Grid item xs={12}>
        <ListExpense
          expenses={expenses}
          isLoading={isLoading}
          setAlertMessage={setAlertMessage}
          setIsExpenseChanged={setIsExpenseChanged}
        />
      </Grid>
    </Grid>
  );
};

export default Expense;
