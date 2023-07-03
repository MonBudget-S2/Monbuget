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
import { isSameMonth, isSameYear } from 'date-fns';

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
  options: {
    chart: {
      id: 'donut-chart'
    },
    labels: [],
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
  },
  series: [], // Dépenses mensuelles par défaut
  type: 'donut',
  height: 500
};
const BudgetEventChart = ({ isLoading, events }) => {
  const [value, setValue] = useState('month');
  const [chartData, setChartData] = useState(chartConfig);

  useEffect(() => {
    if (!isLoading) {
      let filteredEvents = [];
      if (value === 'month') {
        // Filter events by month
        const currentDate = new Date();
        filteredEvents = events.filter((event) => {
          const eventStartDate = new Date(event.startDate);
          const eventEndDate = new Date(event.endDate);
          return isSameMonth(eventStartDate, currentDate) || isSameMonth(eventEndDate, currentDate);
        });
      } else if (value === 'year') {
        // Filter events by year
        const currentYear = new Date().getFullYear();
        filteredEvents = events.filter((event) => {
          const eventStartDate = new Date(event.startDate);
          const eventEndDate = new Date(event.endDate);
          return isSameYear(eventStartDate, currentYear) || isSameYear(eventEndDate, currentYear);
        });
      }

      console.log('filteredEvents', filteredEvents);

      setChartData({
        ...chartData,
        labels: filteredEvents.map((event) => event.name),
        series: filteredEvents.map((event) => event.amount)
      });
    }
  }, [isLoading, events, value]);

  useEffect(() => {
    console.log(chartData);
    if (chartData.series.length > 0) {
      ApexCharts.exec('donut-chart', 'updateOptions', chartData);
    }
  }, [chartData]);
  return (
    <>
      {isLoading ? (
        <>
          Loading
          <SkeletonTotalGrowthBarChart />
        </>
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
              <Chart options={chartData.options} series={chartData.series} type={chartData.type} height={chartData.height} />
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
