import { useEffect, useState } from 'react';

// material-ui
import { Button, Grid, Typography } from '@mui/material';

// project imports
import IncomeChart from './IncomeChart';
import { gridSpacing } from 'store/constant';
// import chartData from './income-chart-data';
import IncomeHistory from './IncomeHistory';
import IncomeTable from './IncomeTable';
import AddIncome from './AddIncome';
import CustomAlert from 'ui-component/alert/CustomAlert';
import IncomeCard from './IncomeCard';
// import CreateButton from 'ui-component/buttons/CreateButton';

// ==============================|| INCOME PAGE ||============================== //

const Income = () => {
  const [alertMessage, setAlertMessage] = useState({ open: false, type: '', message: '' });
  const [isIncomeChanged, setIsIncomeChanged] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isIncomeChanged) {
      setIsIncomeChanged(false);
    }
  }, [isIncomeChanged]);

  const handleClickOpen = () => {
    setIsAddFormOpen(true);
  };

  return (
    <Grid container spacing={gridSpacing}>
      <CustomAlert open={alertMessage.open} message={alertMessage.message} type={alertMessage.type} setMessage={setAlertMessage} />

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <IncomeCard isLoading={isLoading} title="Revenus cumulés" total={252} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {/* <CreateButton to="/addexpense" title="Ajouter un revenu" /> */}
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          <Typography style={{ color: 'white' }} variant="subtitle1">
            Ajouter un revenu
          </Typography>
        </Button>
        <AddIncome
          setAlertMessage={setAlertMessage}
          setIsIncomeChanged={setIsIncomeChanged}
          isAddFormOpen={isAddFormOpen}
          setIsAddFormOpen={setIsAddFormOpen}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <IncomeChart isLoading={isLoading} key={isIncomeChanged} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <IncomeHistory key={isIncomeChanged} />
      </Grid>
      <Grid item xs={12}>
        <IncomeTable
          setAlertMessage={setAlertMessage}
          setIsIncomeChanged={setIsIncomeChanged}
          isAddFormOpen={isAddFormOpen}
          setIsAddFormOpen={setIsAddFormOpen}
          key={isIncomeChanged}
        />
      </Grid>
    </Grid>
  );
};

export default Income;
