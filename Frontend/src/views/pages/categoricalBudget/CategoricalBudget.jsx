import { useEffect, useState } from 'react';
import React from 'react';

// material-ui
import { Grid, Button, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import CategoricalBudgetChart from './CategoricalBudgetChart';
import MostExpenseCategoryBudget from './MostExpenseCategoryBudget';
import CustomAlert from 'ui-component/alert/CustomAlert';
import ListCategoricalBudget from './ListCategoricalBudget';
import CategoricalBudgetFinished from './CategoricalBudgetFinished';
import CategoricalBudgetActive from './CategoricalBudgetActive';
import AddCategoricalBudget from './AddCategoricalBudget';

//project datas
// import categoricalBudgetData from './categorical-budget-data';

// ==============================|| CATEGORICAL BUDGET PAGE ||============================== //

const CategoricalBudget = () => {
  const [alertMessage, setAlertMessage] = useState({ open: false, type: '', message: '' });
  const [isBudgetChanged, setIsBudgetChanged] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const [mostSpentCategory, setMostSpentCategory] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [nbCategoricalBudgetFinished, setNbCategoricalBudgetFinished] = React.useState(0);
  const [nbCategoricalBudgetActive, setNbCategoricalBudgetActive] = React.useState(0);

  const handleClickOpen = () => {
    setIsAddFormOpen(true);
  };

  useEffect(() => {
    if (isBudgetChanged) {
      setIsBudgetChanged(false);
      setLoading(false);
    }
  }, [isBudgetChanged]);

  return (
    <Grid container spacing={gridSpacing}>
      <CustomAlert open={alertMessage.open} message={alertMessage.message} type={alertMessage.type} setMessage={setAlertMessage} />

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
        <CategoricalBudgetChart isBudgetChanged={isBudgetChanged} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MostExpenseCategoryBudget isLoading={isLoading} title="Catégorie la plus dépensée" total={mostSpentCategory} />
          </Grid>
          <Grid item xs={12}>
            <CategoricalBudgetFinished
              isLoading={isLoading}
              title="Budgets terminés"
              nbCategoricalBudgetFinished={nbCategoricalBudgetFinished}
            />
          </Grid>
          <Grid item xs={12}>
            <CategoricalBudgetActive isLoading={isLoading} title="Budgets actifs" nbCategoricalBudgetActive={nbCategoricalBudgetActive} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <ListCategoricalBudget
          setAlertMessage={setAlertMessage}
          setIsBudgetChanged={setIsBudgetChanged}
          // isAddFormOpen={isAddFormOpen}
          // setIsAddFormOpen={setIsAddFormOpen}
          setNbCategoricalBudgetFinished={setNbCategoricalBudgetFinished}
          setNbCategoricalBudgetActive={setNbCategoricalBudgetActive}
          setMostSpentCategory={setMostSpentCategory}
          key={isBudgetChanged}
        />
      </Grid>
    </Grid>
  );
};

export default CategoricalBudget;
