import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// data
import expenseHistoryData from './expensive-history-data';

// ===========================|| MOST EXPENSIVE CHART ||=========================== //

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
        <Card >
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
                        id: 'area-chart',
                        toolbar: {
                            show: true // Masquer la barre d'outils du graphique
                        }
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
                    colors: ['#FF4560'], // Couleur de la série de données
                    dataLabels: {
                        enabled: false // Masquer les étiquettes de données sur le graphique
                    },
                    stroke: {
                        curve: 'smooth' // Courbe lissée pour les lignes du graphique
                    },
                    fill: {
                        type: 'gradient', // Utiliser un dégradé pour remplir l'aire sous la courbe
                        gradient: {
                            shadeIntensity: 1,
                            opacityFrom: 0.7,
                            opacityTo: 0.9,
                            stops: [0, 90, 100]
                        }
                    },
                    markers: {
                        size: 4, // Taille des marqueurs sur les points de données
                        colors: ['#FF4560'], // Couleur des marqueurs
                        strokeWidth: 0, // Largeur de la bordure des marqueurs
                        hover: {
                            size: 6 // Taille des marqueurs au survol
                        }
                    },
                }}
                series={[
                    {
                        name: 'Montant',
                        data: expenseHistoryData.map((data) => data.amount),
                    }
                ]}
                type="area"
                height={460}
            />

        </Card>
    );
};

export default MostExpensive;
