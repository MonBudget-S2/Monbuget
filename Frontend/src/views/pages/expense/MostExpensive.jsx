import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography, IconButton, TextField, MenuItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// third-party
import Chart from 'react-apexcharts';

// data
import expenseData from './expensive-history-data';

// ===========================|| MOST EXPENSIVE CHART ||=========================== //

const MostExpensive = () => {
    const theme = useTheme();

    const [viewMode, setViewMode] = useState('month');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [expenseHistoryData, setExpenseHistoryData] = useState(expenseData);

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

    useEffect(() => {
        setExpenseHistoryData(expenseData);
    }, []);


    useEffect(() => {
        setExpenseHistoryData(expenseData);
    }, []);


    const handleDateChange = (change) => {
        setSelectedDate((prevDate) => {
            const newDate = new Date(prevDate);
            if (viewMode === 'month') {
                newDate.setMonth(newDate.getMonth() + change);
            } else if (viewMode === 'year') {
                newDate.setFullYear(newDate.getFullYear() + change);
            }
            return newDate;
        });
    };

    const getViewModeData = () => {
        if (viewMode === 'month') {
            // Logique pour afficher les jours du mois sélectionné
            const year = selectedDate.getFullYear();
            const month = selectedDate.getMonth();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const startDate = new Date(year, month, 1);
            const endDate = new Date(year, month, daysInMonth);
            const filteredData = expenseHistoryData.filter((data) => {
                const currentDate = new Date(data.date);
                return currentDate >= startDate && currentDate <= endDate;
            });
            return filteredData.map((data) => ({
                x: new Date(data.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }),
                y: data.amount,
            }));
        } else if (viewMode === 'year') {
            // Logique pour afficher les mois sur une période d'un an
            const months = [
                'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
            ];
            return months.map((month, index) => {
                const expenseMonth = index + 1;
                const filteredData = expenseHistoryData.filter((data) => {
                    const currentYear = selectedDate.getFullYear();
                    const currentDate = new Date(data.date);
                    return (
                        currentDate.getFullYear() === currentYear &&
                        currentDate.getMonth() === expenseMonth - 1
                    );
                });
                const totalAmount = filteredData.reduce(
                    (sum, data) => sum + data.amount,
                    0
                );
                return {
                    x: month,
                    y: totalAmount,
                };
            });
        }
        return [];
    };

    const data = getViewModeData();


    return (
        <Card>
            <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle" sx={{ color: theme.palette.secondary.dark }}>
                                statistiques
                            </Typography>
                        </Grid>
                        <TextField
                            id="view-mode-select"
                            select
                            value={viewMode}
                            onChange={(e) => setViewMode(e.target.value)}
                        >
                            {status.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="space-between">
                        <IconButton onClick={() => handleDateChange(-1)}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="subtitle2">
                            {viewMode === 'year' ? selectedDate.getFullYear() : selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </Typography>
                        <IconButton onClick={() => handleDateChange(1)}>
                            <ArrowForwardIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {data.length > 0 ? (
                        <Chart
                            options={{
                                chart: {
                                    id: 'area-chart',
                                    toolbar: {
                                        show: true // Masquer la barre d'outils du graphique
                                    }
                                },
                                xaxis: {
                                    type: 'category',
                                    labels: {
                                        formatter: function (value) {
                                            return value;
                                        },
                                    },
                                },

                                tooltip: {
                                    x: {
                                        format: viewMode === 'year' ? undefined : 'dd/MM/yyyy',
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
                                    type: 'gradient',
                                    gradient: {
                                        shadeIntensity: 1,
                                        opacityFrom: 0.7,
                                        opacityTo: 0.9,
                                        stops: [0, 90, 100],
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: '#2196F3' // Couleur de départ du dégradé
                                            },
                                            {
                                                offset: 90,
                                                color: '#673AB7' // Couleur intermédiaire du dégradé
                                            },
                                            {
                                                offset: 100,
                                                color: '#F44336' // Couleur de fin du dégradé
                                            }
                                        ]
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
                                    data: getViewModeData(),
                                },
                            ]}
                            type="bar"
                            height={460}
                        />
                    ) : (
                        <Typography variant="body2" align="center">
                            Aucune donnée
                        </Typography>
                    )}
                </Grid>

            </Grid>
        </Card>
    );
};

export default MostExpensive;
