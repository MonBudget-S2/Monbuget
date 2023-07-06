import PropTypes from 'prop-types';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Typography, Fade } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
import { useEffect } from 'react';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.error.dark}, ${theme.palette.primary[800]})`,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&>div': {
    position: 'relative',
    zIndex: 5
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.error[800],
    borderRadius: '50%',
    zIndex: 1,
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    zIndex: 1,
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

const TotalExpenseByMonth = ({ isLoading, expenses }) => {
  const [averageExpenseByMonth, setAverageExpenseByMonth] = useState(0);
  const [totalExpenseByYear, setTotalExpenseByYear] = useState(0);

  const [timeValue, setTimeValue] = useState(false);
  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
  };

  useEffect(() => {
    console.log('expenses', expenses);
    if (expenses.length === 0) return;

    // Calculate total expense of the current year
    const currentYear = new Date().getFullYear();
    const currentYearExpenses = expenses.filter((item) => new Date(item.date).getFullYear() === currentYear);
    const totalExpenseByYear = currentYearExpenses.reduce((sum, item) => sum + item.amount, 0);

    // Calculate total number of months passed, including the current month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const monthsPassed = (currentYear - currentDate.getFullYear()) * 12 + currentMonth;

    // Calculate average expense per month
    const averageExpenseByMonth = (totalExpenseByYear / monthsPassed).toFixed(2);

    setTotalExpenseByYear(totalExpenseByYear);
    setAverageExpenseByMonth(averageExpenseByMonth);
  }, [expenses]);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Fade in={true} timeout={600}>
              <Grid container direction="column">
                <Grid item>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Button
                        disableElevation
                        variant={timeValue ? 'contained' : 'text'}
                        size="small"
                        sx={{ color: 'inherit' }}
                        onClick={(e) => handleChangeTime(e, true)}
                      >
                        Mois
                      </Button>
                      <Button
                        disableElevation
                        variant={!timeValue ? 'contained' : 'text'}
                        size="small"
                        sx={{ color: 'inherit' }}
                        onClick={(e) => handleChangeTime(e, false)}
                      >
                        Année
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ mb: 0.75 }}>
                  <Grid container alignItems="center">
                    <Grid item xs={6}>
                      <Grid container alignItems="center">
                        <Grid item>
                          <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                            {timeValue ? `${averageExpenseByMonth} €` : `${totalExpenseByYear} €`}
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <Typography
                            sx={{
                              fontSize: '1rem',
                              fontWeight: 500,
                              color: '#fff'
                            }}
                          >
                            {timeValue ? "Dépense moyenne par mois de l'année en cours" : "Dépense total de l'année en cours"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Fade>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalExpenseByMonth.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalExpenseByMonth;
