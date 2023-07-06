import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';

// material-ui
import { Grid, Typography } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const IncomeExpenseChart = ({ isLoading, incomes, expenses }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      const filteredIncomes = filterDataByMonth(incomes);
      const filteredExpenses = filterDataByMonth(expenses);

      const currentMonth = new Date().getMonth() + 1;
      const months = Array.from({ length: currentMonth }, (_, index) => index + 1);

      const incomeData = months.map((month) => {
        const foundIndex = filteredIncomes.findIndex((income) => {
          const incomeDate = parseISO(income.date);
          const incomeMonth = incomeDate.getMonth() + 1;
          return incomeMonth === month;
        });
        return foundIndex !== -1 ? filteredIncomes[foundIndex].amount : 0;
      });

      const expenseData = months.map((month) => {
        const foundIndex = filteredExpenses.findIndex((expense) => {
          const expenseDate = parseISO(expense.date);
          const expenseMonth = expenseDate.getMonth() + 1;
          return expenseMonth === month;
        });
        return foundIndex !== -1 ? filteredExpenses[foundIndex].amount : 0;
      });

      const updatedSeries = [
        {
          name: 'Revenus',
          type: 'area',
          data: incomeData
        },
        {
          name: 'Dépenses',
          type: 'area',
          data: expenseData
        }
      ];

      setChartData({
        options: {
          chart: {
            toolbar: {
              show: false
            }
          },
          stroke: {
            curve: 'smooth',
            width: 2
          },
          colors: ['#00E396', '#FF4560'],
          xaxis: {
            categories: months.map((month) => format(new Date(2023, month - 1, 1), 'MMM')),
            labels: {
              style: {
                colors: '#000000'
              }
            },
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            }
          },
          yaxis: {
            labels: {
              style: {
                colors: '#000000'
              }
            }
          },
          legend: {
            labels: {
              colors: '#000000'
            }
          },
          grid: {
            borderColor: '#CCCCCC'
          },
          tooltip: {
            theme: 'light'
          },
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9
            }
          }
        },
        series: updatedSeries
      });
    }
  }, [isLoading, incomes, expenses]);

  const filterDataByMonth = (data) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const filteredData = data.filter((item) => {
      const itemDate = parseISO(item.date);
      const itemMonth = itemDate.getMonth() + 1;
      const itemYear = itemDate.getFullYear();
      return itemYear === currentYear && itemMonth <= currentMonth;
    });
    return filteredData;
  };

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
                      <Typography variant="subtitle1">Statistique</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {chartData && <Chart {...chartData} />}
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

IncomeExpenseChart.propTypes = {
  isLoading: PropTypes.bool,
  incomes: PropTypes.array,
  expenses: PropTypes.array
};

export default IncomeExpenseChart;
