import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import PopularCard from './PopularCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import { gridSpacing } from 'store/constant';
import IncomeCard from 'views/pages/income/IncomeCard';
import expenseChartData from 'views/pages/expense/expense-chart-data';
import incomeChartData from 'views/pages/income/income-chart-data';
import ExpenseCard from 'views/pages/expense/ExpenseCard';
import IncomeExpenseChart from './IncomeExpenseChart';


// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [totalRealExpenses, setTotalRealExpenses] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    setLoading(false);

    const incomes = incomeChartData.series[0].data.reduce((acc, value) => acc + value, 0);
    setTotalIncome(incomes);

    const realExpenses = expenseChartData.series[0].data.reduce((acc, value) => acc + value, 0);
    setTotalRealExpenses(realExpenses);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <IncomeCard 
              isLoading={isLoading}
              title="Total des revenus"
              total={totalIncome} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
          <ExpenseCard 
              isLoading={isLoading}
              title="Total des dépenses"
              total={totalRealExpenses} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeDarkCard isLoading={isLoading} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeLightCard isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <IncomeExpenseChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    
  );
};

export default Dashboard;
