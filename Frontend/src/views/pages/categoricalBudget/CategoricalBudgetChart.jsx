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
import categoricalBudgetService from 'service/categoricalBudgetService';

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

const chartConfig = {
  type: 'donut',
  height: 500,
  options: {
    chart: {
      id: 'donut-chart'
    },
    labels: ['Transport', 'Logement', 'Loisir', 'Nourriture'],
    colors: ['#00E396', '#775DD0', '#FF4560', '#D3D3D3'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100]
      }
    }
  }
};

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //
const CategoricalBudgetChart = ({ isBudgetChanged }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState('month');
  const [chartData, setChartData] = useState({
    labels: [],
    series: [],
    options: chartConfig.options,
    type: chartConfig.type,
    height: chartConfig.height
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoricalBudgetService.getBudgets();
        const budgets = response.data;

        const categories = {}; // Store categories as keys in an object for grouping

        budgets.forEach((budget) => {
          const categoryName = budget.category.name;
          if (!categories[categoryName]) {
            categories[categoryName] = budget.amount;
          } else {
            categories[categoryName] += budget.amount;
          }
        });

        const labels = Object.keys(categories);
        let series = [];

        if (value === 'month') {
          series = labels.map((label) => categories[label]);
        } else if (value === 'year') {
          series = labels.map((label) => categories[label] * 12);
        }

        setChartData((prevChartData) => ({
          ...prevChartData,
          labels,
          series
        }));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching budget data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [value, isBudgetChanged]);

  useEffect(() => {
    ApexCharts.exec('donut-chart', 'updateOptions', {
      labels: chartData.labels,
      series: chartData.series
    });
  }, [chartData]);

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
                      <Typography variant="subtitle2">Répartitions des budgets par catégorie</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField id="standard-select-currency" select value={value} onChange={(e) => setValue(e.target.value)}>
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
              {chartData.series.length > 0 ? (
                <Chart options={chartData.options} series={chartData.series} type={chartData.type} height={chartData.height} />
              ) : (
                <Typography variant="subtitle2">Aucun budget n&apos;a été créé pour le moment.</Typography>
              )}
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

export default CategoricalBudgetChart;
