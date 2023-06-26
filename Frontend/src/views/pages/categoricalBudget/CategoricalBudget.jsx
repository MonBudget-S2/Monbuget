import { useEffect, useState } from 'react';

// material-ui
import { Button, Grid, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import datas from './categorical-budget-data';
import chartData from './categorical-budget-chart';
import MainCard from 'ui-component/cards/MainCard';
import CategoricalBudgetChart from './CategoricalBudgetChart';
import SeeAllButton from 'ui-component/buttons/SeeAllButton';
import MostExpenseCategoryBudget from './MostExpenseCategoryBudget';
import AddCategoricalBudget from './AddCategoricalBudget';
import CustomAlert from 'ui-component/alert/CustomAlert';

// ==============================|| CATEGORICAL BUDGET PAGE ||============================== //

const CategoricalBudget = () => {
  const [alertMessage, setAlertMessage] = useState({ open: false, type: '', message: '' });
  const [isBudgetChanged, setIsBudgetChanged] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const [mostSpentCategory, setMostSpentCategory] = useState('');
  const [isLoading, setLoading] = useState(true);

  const handleClickOpen = () => {
    setIsAddFormOpen(true);
  };

  useEffect(() => {
    const maxSpent = Math.max(...chartData.series);
    const maxSpentIndex = chartData.series.findIndex((value) => value === maxSpent);
    const mostSpentCategoryName = chartData.options.labels[maxSpentIndex];
    setMostSpentCategory(mostSpentCategoryName);

    setLoading(false);
  }, []);

  useEffect(() => {
    if (isBudgetChanged) {
      setIsBudgetChanged(false);
    }
  }, [isBudgetChanged]);

  return (
    <Grid container spacing={gridSpacing}>
      <CustomAlert open={alertMessage.open} message={alertMessage.message} type={alertMessage.type} setMessage={setAlertMessage} />

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <MostExpenseCategoryBudget isLoading={isLoading} title="Catégorie la plus dépensée" total={mostSpentCategory} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          <Typography style={{ color: 'white' }} variant="subtitle1">
            Ajouter un budget
          </Typography>
        </Button>
        <AddCategoricalBudget
          setAlertMessage={setAlertMessage}
          setIsBudgetChanged={setIsBudgetChanged}
          isAddFormOpen={isAddFormOpen}
          setIsAddFormOpen={setIsAddFormOpen}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CategoricalBudgetChart
          isLoading={isLoading}
          options={chartData.options}
          series={chartData.series}
          type={chartData.type}
          height={chartData.height}
          key={isBudgetChanged}
        />
      </Grid>
      <Grid item xs={12} md={6} container alignItems="center" justifyContent="center">
        <MainCard sx={{ mx: 3 }}>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Nom du budget</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                    Catégorie
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                    Montant alloué
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datas.slice(-5).map((row) => (
                  <TableRow key={row.id} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                    <TableCell>{row.budgetName}</TableCell>
                    <TableCell align="center">{row.category}</TableCell>
                    <TableCell align="center" sx={{ color: '#f44336', fontWeight: 'bold' }}>
                      {row.totalAllocation} €
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {datas.length > 5 && <SeeAllButton to="/listcategoricalbudget" title="Tout afficher" sx={{ marginTop: '16px' }} />}
          </TableContainer>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default CategoricalBudget;
