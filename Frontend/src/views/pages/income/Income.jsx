import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import IncomeChart from './IncomeChart';
import { gridSpacing } from 'store/constant';
// import chartData from './income-chart-data';
import IncomeHistory from './IncomeHistory';
import IncomeTable from './IncomeTable';
import AddIncome from './AddIncome';
import CustomAlert from 'ui-component/alert/CustomAlert';
// import CreateButton from 'ui-component/buttons/CreateButton';

// ==============================|| INCOME PAGE ||============================== //

const Income = () => {
  const [alertMessage, setAlertMessage] = useState({ open: false, type: '', message: '' });
  const [isNewIncomeAdded, setIsNewIncomeAdded] = useState(false);

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isNewIncomeAdded) {
      setIsNewIncomeAdded(false);
    }
  }, [isNewIncomeAdded]);

  return (
    <Grid container spacing={gridSpacing}>
      <CustomAlert open={alertMessage.open} message={alertMessage.message} type={alertMessage.type} setMessage={setAlertMessage} />

      <Grid item xs={12}>
        {/* <CreateButton to="/addexpense" title="Ajouter un revenu" /> */}
        <AddIncome setAlertMessage={setAlertMessage} setIsNewIncomeAdded={setIsNewIncomeAdded} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <IncomeChart isLoading={isLoading} key={isNewIncomeAdded} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <IncomeHistory key={isNewIncomeAdded} />
      </Grid>
      <Grid item xs={12}>
        <IncomeTable key={isNewIncomeAdded} />
      </Grid>
    </Grid>
  );
};

export default Income;
