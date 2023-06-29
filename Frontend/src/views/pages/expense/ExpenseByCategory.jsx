import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import expenseService from 'service/expenseService';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

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
  const [totalExpense, setTotalExpense] = useState(0);
  const customization = useSelector((state) => state.customization);
  console.log(customization);

  const [chartData, setChartData] = useState({
    labels: [],
    series: [],
    options: chartConfig.options,
    type: chartConfig.type,
    height: chartConfig.height
  });

  const [currentDate, setCurrentDate] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });

  const handlePrevious = () => {
    if (period === 'month') {
      setCurrentDate((prevDate) => {
        const newMonth = prevDate.month === 1 ? 12 : prevDate.month - 1;
        const newYear = prevDate.month === 1 ? prevDate.year - 1 : prevDate.year;
        const newDate = {
          month: newMonth,
          year: newYear
        };
        return newDate;
      });
    } else if (period === 'year') {
      setCurrentDate((prevDate) => {
        const newYear = prevDate.year - 1;
        const newDate = {
          month: null,
          year: newYear
        };
        return newDate;
      });
    }
  };

  const handleNext = () => {
    if (period === 'month') {
      setCurrentDate((prevDate) => {
        const newMonth = prevDate.month === 12 ? 1 : prevDate.month + 1;
        const newYear = prevDate.month === 12 ? prevDate.year + 1 : prevDate.year;
        const newDate = {
          month: newMonth,
          year: newYear
        };
        return newDate;
      });
    } else if (period === 'year') {
      setCurrentDate((prevDate) => {
        const newYear = prevDate.year + 1;
        const newDate = {
          month: null,
          year: newYear
        };
        return newDate;
      });
    }
  };

  const getPeriodLabel = () => {
    if (period === 'month') {
      const monthName = new Date(currentDate.year, currentDate.month - 1, 1).toLocaleString('default', { month: 'long' });
      return `${monthName} - ${currentDate.year}`;
    } else if (period === 'year') {
      return currentDate.year.toString();
    }
    return '';
  };

  useEffect(() => {
    const fetchData = async () => {
      const year = currentDate.year;
      let month = null;
      if (period === 'month') {
        month = currentDate.month;
      }
      try {
        const response = await expenseService.getExpensesByCategoryAndPeriod(year, month);
        const series = response.data.map((item) => item.totalAmount);
        const labels = response.data.map((item) => item.category);

        const total = response.data.reduce((sum, item) => sum + item.totalAmount, 0);
        setTotalExpense(total);

        setChartData((prevChartData) => ({
          ...prevChartData,
          labels,
          series,
          options: {
            ...prevChartData.options,
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                    total: {
                      // showAlways: true,
                      show: true,
                      formatter: function () {
                        return total + ' €';
                      },
                      fontSize: '22px',
                      fontWeight: 'bold'
                    },

                    value: {
                      show: true,
                      formatter: function (val) {
                        return val + ' €';
                      },
                      fontSize: '22px',
                      fontWeight: 'bold'
                    }
                  }
                }
              }
            }
          }

          // annotations: {
          //   position: 'front',
          //   yaxis: [
          //     {
          //       y: '50%', // Adjust the y position as needed
          //       borderColor: '#ccc',
          //       label: {
          //         text: `Total: ${total} €`,
          //         style: {
          //           fontSize: '14px',
          //           color: '#777'
          //         }
          //       }
          //     }
          //   ]
          // }
        }));

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching budget data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentDate, period]);

  useEffect(() => {
    ApexCharts.exec('donut-chart', 'updateOptions', {
      labels: chartData.labels,
      series: chartData.series
      // options: {
      //   ...chartData.options,
      //   dataLabels: {
      //     enabled: true,
      //     formatter: function (val) {
      //       const depenseTotal = chartData.series.reduce((sum, value) => sum + value, 0);
      //       return (val / depenseTotal) * 100 + '%';
      //     }
      //   }
      // }
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
                    <Grid item>
                      <Grid container direction="column" spacing={1}>
                        <Grid item>
                          <Typography variant="subtitle2">Total Dépense</Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="h3">{totalExpense}€</Typography>
                        </Grid>
                      </Grid>
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
              <Grid container justifyContent="space-between">
                <Grid item>
                  <IconButton onClick={handlePrevious}>
                    <KeyboardArrowLeft />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography variant="h5">{getPeriodLabel()}</Typography>
                </Grid>
                <Grid item>
                  <IconButton onClick={handleNext}>
                    <KeyboardArrowRight />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {chartData.series.length > 0 ? (
                <Chart options={chartData.options} series={chartData.series} type={chartData.type} height={chartData.height} />
              ) : (
                <Typography variant="subtitle2">Aucune dépense pour le moment.</Typography>
              )}
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
