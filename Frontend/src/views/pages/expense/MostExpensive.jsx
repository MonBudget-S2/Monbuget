import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography, IconButton, TextField, MenuItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

import expenseService from 'service/expenseService';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const status = [
  {
    value: 'month',
    label: 'Mois'
  },
  {
    value: 'year',
    label: 'Année'
  }
];

const chartConfig = {
  options: {
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
        }
      }
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
    }
  },
  series: [
    {
      name: 'Montant',
      data: []
    }
  ],
  type: 'area',
  height: 460
};

const MostExpensive = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [totalExpense, setTotalExpense] = useState(0);
  const [period, setPeriod] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chartData, setChartData] = useState({
    ...chartConfig,
    labels: [],
    series: []
  });

  const handleDateChange = (change) => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (period === 'month') {
        newDate.setMonth(newDate.getMonth() + change);
      } else if (period === 'year') {
        newDate.setFullYear(newDate.getFullYear() + change);
      }
      return newDate;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const year = selectedDate.getFullYear();
        let month = null;
        if (period === 'month') {
          month = selectedDate.getMonth() + 1;
        }
        const response = await expenseService.getExpensesByPeriod(year, month);
        const data = response.data;
        // const labels = data.map((item) => item.period);
        const series = data.map((item) => item.totalAmount);
        const labels = data.map((item) => {
          const period = item.period;
          if (period.length === 7) {
            // Year and month period, format as month name
            const formattedMonth = format(parseISO(period), 'MMM', { locale: fr }); // Use the appropriate locale for the desired language
            return formattedMonth;
          }
          //  else if (period.length === 10) {
          //   // Year, month, and day period, format as date without year
          //   const formattedDate = format(parseISO(period), 'dd', { locale: fr }); // Use the appropriate locale for the desired language
          //   return formattedDate;
          // }
          return period;
        });

        const total = series.reduce((acc, curr) => acc + curr, 0);
        setTotalExpense(total);

        setChartData((prevState) => ({
          ...prevState,
          labels,
          series: [
            {
              ...prevState.series[0],
              data: series
            }
          ],
          options: {
            ...prevState.options,
            tooltip: {
              x: {
                format: period === 'year' ? undefined : 'dd/MM/yyyy'
              }
            }
          }
        }));
      } catch (error) {
        console.log(error);
        setChartData((prevState) => ({
          ...prevState,
          series: []
        }));
      }
      setIsLoading(false);
    };

    fetchData();
  }, [selectedDate, period]);

  useEffect(() => {
    if(chartData.series.length > 0) {
      ApexCharts.exec('area-chart', 'updateOptions', {
        labels: chartData.labels,
        series: chartData.series
      });
    }
  }, [chartData]);
  return (
    <Card>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="subtitle" sx={{ color: theme.palette.secondary.dark }}>
                  Total des dépenses
                </Typography>
                <Typography variant="subtitle">
                  <Typography variant="h4"> {totalExpense}€ </Typography>
                </Typography>
              </Grid>
              <TextField id="view-mode-select" select value={period} onChange={(e) => setPeriod(e.target.value)}>
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
                {period === 'year'
                  ? selectedDate.getFullYear()
                  : selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </Typography>
              <IconButton onClick={() => handleDateChange(1)}>
                <ArrowForwardIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {chartData.series.length > 0 ? (
              <Chart options={chartData.options} series={chartData.series} type={chartData.type} height={chartData.height} />
            ) : (
              // <Chart {...chartData} />
              <Typography variant="body2" align="center">
                Aucune donnée
              </Typography>
            )}
          </Grid>
        </Grid>
      )}
    </Card>
  );
};

export default MostExpensive;
