import PropTypes from 'prop-types';
import { useEffect } from 'react';

// material-ui
import { Grid, Typography } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import IncomeExpenseChartData from './chart-data/income-expense-chart';

// ==============================|| DASHBOARD DEFAULT - GRAPH INCOME EXPENSE ||============================== //

const IncomeExpenseChart = ({ isLoading }) => {
    useEffect(() => {
    
    }, []);

    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle1">Statistique</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Chart {...IncomeExpenseChartData} />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

IncomeExpenseChart.propTypes = {
    isLoading: PropTypes.bool,
};

export default IncomeExpenseChart;
