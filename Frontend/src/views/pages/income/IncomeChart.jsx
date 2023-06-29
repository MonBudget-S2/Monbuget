import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import incomeService from 'service/incomeService';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
// import data from 'ui-component/table/data';

// chart data
// import chartData from './income-chart-data';

const status = [
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];

const chartConfig = {
  height: 480,
  type: 'line',
  options: {
    chart: {
      id: 'bar-chart',
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%'
      }
    },
    xaxis: {
      type: 'category',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          colors: ['#777', '#777', '#777', '#777', '#777', '#777', '#777', '#777', '#777', '#777', '#777', '#777']
        }
      }
    },
    legend: {
      show: true,
      fontSize: '14px',
      fontFamily: `'Roboto', sans-serif`,
      position: 'bottom',
      offsetX: 20,
      labels: {
        useSeriesColors: false
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8
      }
    },
    fill: {
      type: 'solid'
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: true
    }
  },
  series: []
};

// ==============================|| MANAGE INCOME- TOTAL GROWTH BAR CHART ||============================== //

const IncomeChart = ({ isLoading }) => {
  const [chartData, setChartData] = useState(chartConfig);
  const [year, setYear] = useState(new Date().getFullYear());
  const [totalIncome, setTotalIncome] = useState(0);

  const handleYearChange = (increment) => {
    const newYear = year + increment;
    setYear(newYear);
  };
  const [period, setPeriode] = useState(status[0].value);
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const { navType } = customization;
  const { primary } = theme.palette.text;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];

  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;

  useEffect(() => {
    const getData = async () => {
      const res = await incomeService.getIncomeByTypeForYear(year);

      if (res.data) {
        const series = Object.entries(res.data.incomesByType).map(([name, data]) => ({
          name,
          data
        }));
        const newChartData = {
          ...chartConfig,
          series
        };
        setChartData(newChartData);
        setTotalIncome(res.data.totalIncome);
      }
    };
    getData();
  }, [period, year]);

  useEffect(() => {
    chartData.options.colors = [primary200, primaryDark, secondaryMain, primary];
    chartData.options.grid.borderColor = grey200;
    chartData.options.legend.labels.colors = grey500;

    // Ne chargez pas le graphique lorsqu'il est en cours de chargement
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, 'updateOptions', chartData.options);
    }
  }, [navType, primary200, primaryDark, secondaryMain, primary, grey200, isLoading, grey500]);

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
                      <Typography variant="subtitle2">Total des Revenus</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h3">{totalIncome}€</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ArrowBack onClick={() => handleYearChange(-1)} sx={{ cursor: 'pointer' }} />
                    <Typography variant="h6" sx={{ mx: 2 }}>
                      {year}
                    </Typography>
                    <ArrowForward onClick={() => handleYearChange(1)} sx={{ cursor: 'pointer' }} />
                  </div>
                </Grid>
                <Grid item>
                  <TextField id="standard-select-currency" select period={period} onChange={(e) => setPeriode(e.target.value)}>
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
              <Chart {...chartData} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

IncomeChart.propTypes = {
  isLoading: PropTypes.bool
};

export default IncomeChart;
