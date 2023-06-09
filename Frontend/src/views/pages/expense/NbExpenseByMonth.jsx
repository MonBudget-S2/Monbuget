import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Button, Grid, Typography, Fade } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { useEffect } from 'react';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  background: `linear-gradient(45deg, #FF00FF, #00FFFF)`,
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
  const theme = useTheme();

  const [timeValue, setTimeValue] = useState(false);
  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
  };
  const [expenseCountByMonth, setExpenseCountByMonth] = useState(0);
  const [expenseCountByYear, setExpenseCountByYear] = useState(0);

  useEffect(() => {
    if (expenses) {
      let expenseCountByMonth = 0;
      let expenseCountByYear = 0;
      expenses.forEach((expense) => {
        if (new Date(expense.date).getMonth() === new Date().getMonth()) {
          expenseCountByMonth += 1;
        }
        if (new Date(expense.date).getFullYear() === new Date().getFullYear()) {
          expenseCountByYear += 1;
        }
      });
      setExpenseCountByMonth(expenseCountByMonth);
      setExpenseCountByYear(expenseCountByYear);
    }
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
                          {timeValue ? expenseCountByMonth : expenseCountByYear}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Avatar
                          sx={{
                            ...theme.typography.smallAvatar,
                            cursor: 'pointer',
                            backgroundColor: theme.palette.primary[200],
                            color: "#fff"

                          }}
                        >
                          <ArrowDownwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                        </Avatar>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: "#fff"

                          }}
                        >
                          Nombre de dépenses {timeValue ? 'mois' : 'année'}
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
  isLoading: PropTypes.bool,
  expenses: PropTypes.array
};

export default TotalExpenseByMonth;
