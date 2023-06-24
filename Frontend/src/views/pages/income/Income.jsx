import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import IncomeChart from './IncomeChart';
import { gridSpacing } from 'store/constant';
import chartData from './income-chart-data';
import IncomeHistory from './IncomeHistory';
import IncomeTable from './IncomeTable';
import AddIncome from './AddIncome';
// import CreateButton from 'ui-component/buttons/CreateButton';

// ==============================|| INCOME PAGE ||============================== //

const Income = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {/* <CreateButton to="/addexpense" title="Ajouter un revenu" /> */}
        <AddIncome />
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <IncomeChart series={chartData.series} isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <IncomeHistory />
      </Grid>
      <Grid item xs={12}>
        <IncomeTable />
      </Grid>
    </Grid>
  );
};

export default Income;
