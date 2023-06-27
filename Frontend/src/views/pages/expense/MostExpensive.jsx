import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import expenseHistoryData from './expensive-history-data';

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const MostExpensive = () => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const { navType } = customization;

    const orangeDark = theme.palette.secondary[800];

    useEffect(() => {
        const newSupportChart = {
            chart: {
                id: 'area-chart'
            },
            xaxis: {
                type: 'datetime',
                categories: expenseHistoryData.map((data) => data.date),
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yyyy',
                },
            },
            colors: [orangeDark]
        };
        ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
    }, [navType, orangeDark]);

    // Trouver la dépense la plus chère
    const mostExpensiveExpense = expenseHistoryData.reduce((maxExpense, currentExpense) => {
        if (currentExpense.amount > maxExpense.amount) {
            return currentExpense;
        }
        return maxExpense;
    }, { amount: 0 });

    return (
        <Card sx={{ bgcolor: 'secondary.light' }}>
            <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle" sx={{ color: theme.palette.secondary.dark }}>
                                Dépense la plus chère
                            </Typography>
                            <Typography variant="subtitle2" sx={{ color: theme.palette.secondary }}>
                            {mostExpensiveExpense.expenseCategory}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                                {mostExpensiveExpense.amount}€
                            </Typography>
                        </Grid>
                        
                    </Grid>
                </Grid>
            </Grid>
            <Chart
                options={{
                    chart: {
                        id: 'area-chart'
                    },
                    xaxis: {
                        type: 'datetime',
                        categories: expenseHistoryData.map((data) => data.date),
                    },
                    tooltip: {
                        x: {
                            format: 'dd/MM/yyyy',
                        },
                    },
                }}
                series={[
                    {
                        name: 'Montant',
                        data: expenseHistoryData.map((data) => data.amount),
                    }
                ]}
                type="area"
                height={400}
            />
        </Card>
    );
};

export default MostExpensive;
