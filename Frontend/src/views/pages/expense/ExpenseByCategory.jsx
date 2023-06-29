import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import expenseService from 'service/expenseService';

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
    tooltip: {
      y: {
        formatter: function (value) {
          return value + ' €';
        }
      }
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

const ExpenseByCategory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriode] = useState('month');
  const customization = useSelector((state) => state.customization);
  console.log(customization);

  const [chartData, setChartData] = useState({
    labels: [],
    series: [],
    options: chartConfig.options,
    type: chartConfig.type,
    height: chartConfig.height
  });

  useEffect(() => {
    const fetchData = async () => {
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      try {
        const response = await expenseService.getExpensesByCategoryAndPeriod(year, month);
        const series = response.data.map((item) => item.totalAmount);
        const labels = response.data.map((item) => item.category);

        // if (value === 'month') {
        //   series = labels.map((label) => categories[label]);
        // } else if (value === 'year') {
        //   series = labels.map((label) => categories[label] * 12);
        // }

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
  }, [period]);

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
                      <Typography variant="subtitle2">Dépense par catégorie</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField id="standard-select-currency" select value={period} onChange={(e) => setPeriode(e.target.value)}>
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
              <Chart options={chartData.options} series={chartData.series} type={chartData.type} height={chartData.height} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

ExpenseByCategory.propTypes = {
  isLoading: PropTypes.bool
};

export default ExpenseByCategory;
