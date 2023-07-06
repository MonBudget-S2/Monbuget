import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import IncomeCard from 'views/pages/income/IncomeCard';
import ExpenseCard from 'views/pages/expense/ExpenseCard';
import IncomeExpenseChart from './IncomeExpenseChart';
import AllBudgets from './AllBudgets';

// services
import eventService from '../../../service/eventService';
import categoricalBudgetService from '../../../service/categoricalBudgetService';
import incomeService from 'service/incomeService';
import expenseService from 'service/expenseService';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [totalRealExpenses, setTotalRealExpenses] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalBudgetsCategorical, setTotalBudgetsCategorical] = useState(0);
  const [totalBudgetsEvent, setTotalBudgetsEvent] = useState(0);
  const [allBudgets, setAllBudgets] = useState(0);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchBudgetCategorical = async () => {
      const response = await categoricalBudgetService.getBudgets();

      if (response.status === 200) {
        setTotalBudgetsCategorical(response.data.length);
      } else {
        console.log('Erreur lors de la récupération des budgets catégoriels');
      }
    };

    const fetchEventBudget = async () => {
      const response = await eventService.getEvents();

      if (response.status === 200) {
        setTotalBudgetsEvent(response.data.length);
      } else {
        console.log('Erreur lors de la récupération des budgets catégoriels');
      }
    };

    const fetchIncomes = async () => {
      const response = await incomeService.getIncomes();
      if (response.status === 200) {
        setIncomes(response.data);
        const totalIncome = response.data.reduce((acc, income) => acc + income.amount, 0);
        setTotalIncome(totalIncome);
      } else {
        console.log('Erreur lors de la récupération des revenus');
      }
    };

    const fetchExpenses = async () => {
      const response = await expenseService.getExpenses();
      if (response.status === 200) {
        setExpenses(response.data);
        console.log('expenses', response.data);
        const realExpenses = response.data.reduce((acc, expense) => acc + expense.amount, 0);
        setTotalRealExpenses(realExpenses);
      } else {
        console.log('Erreur lors de la récupération des dépenses');
      }
    };
    fetchEventBudget();
    fetchBudgetCategorical();
    fetchIncomes();
    fetchExpenses();
    setLoading(false);

    const allBudgetsTotal = totalBudgetsCategorical + totalBudgetsEvent;
    setAllBudgets(allBudgetsTotal);
  }, [totalBudgetsCategorical, totalBudgetsEvent]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <IncomeCard isLoading={isLoading} title="Revenus cumulés" total={totalIncome} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <ExpenseCard isLoading={isLoading} title="Total des dépenses" total={totalRealExpenses} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <AllBudgets isLoading={isLoading} title="Total des budgets crées" total={allBudgets} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <IncomeExpenseChart isLoading={isLoading} incomes={incomes} expenses={expenses} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
