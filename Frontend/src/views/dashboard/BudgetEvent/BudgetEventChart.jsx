import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import chartData from './BudgetEventChartDate';
const status = [
    {
        value: 'month',
        label: 'Ce mois-ci'
    },
    {
        value: 'year',
        label: 'Cette année'
    }
];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const BudgetEventChart = ({ isLoading }) => {
    const [value, setValue] = useState('month'); // Par défaut, la valeur est 'month' pour afficher le graphique par mois

    useEffect(() => {
        // Mise à jour des options du graphique en fonction de la valeur sélectionnée
        if (value === 'month') {
            chartData.labels = ['Vacance Chine', 'Soirée', 'Anniversaire', 'Nourriture'];
            chartData.series = [5000, 3000, 8000, 6000];
        } else if (value === 'year') {
            chartData.labels = ['Vacance Chine', 'Soirée', 'Anniversaire', 'Nourriture'];
            chartData.series = [15000, 12000, 10000, 8000];
        }

        // Ne chargez pas le graphique lorsqu'il est en cours de chargement
        if (!isLoading) {
            ApexCharts.exec('donut-chart', 'updateOptions', chartData);
        }
    }, [isLoading, value]);
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
                                            <Typography variant="subtitle2">Répartitions des budgets par Event</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                    >
                                        {status.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Chart options={chartData.options} series={chartData.series} type={chartData.type} height={chartData.height}  />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

BudgetEventChart.propTypes = {
    isLoading: PropTypes.bool
};

export default BudgetEventChart;
