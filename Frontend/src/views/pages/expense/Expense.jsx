import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
// import ExpenseChart from './ExpenseChart';
import ExpenseCard from './ExpenseCard';
import ExpenseByCategory from './ExpenseByCategory';
import CreateButton from 'ui-component/buttons/CreateButton';
import AverageExpenseByMonth from './AverageExpenseByMonth';
import MostExpensive from './MostExpensive';
import NbExpenseByMonth from './NbExpenseByMonth';
// import SeeAllButton from 'ui-component/buttons/SeeAllButton';

import expenseByCategoryData from './expense-by-category';
import chartData from './expense-chart-data';
import ListExpense from './ListExpense';

const Expense = () => {
  const [totalRealExpenses, setTotalRealExpenses] = useState(0);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);

    const realExpenses = chartData.series[0].data.reduce((acc, value) => acc + value, 0);
    setTotalRealExpenses(realExpenses);

  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <ExpenseCard isLoading={isLoading} title="Total des dépenses réelles" total={totalRealExpenses} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <AverageExpenseByMonth isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <NbExpenseByMonth isLoading={isLoading} />
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
        <ExpenseByCategory expenses={expenseByCategoryData} series={chartData.series} isLoading={isLoading} />
      </Grid>
      {/* <Grid item xs={12} md={6}>
        <ExpenseChart series={chartData.series} isLoading={isLoading} />
      </Grid> */}
      <Grid item xs={12}>
        <ListExpense />
      </Grid>
    </Grid>
  );
};

export default Expense;
