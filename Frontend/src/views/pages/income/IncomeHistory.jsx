import React from 'react';
import { Grid, Typography, CardContent, Divider } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import SeeAllButton from 'ui-component/buttons/SeeAllButton';

import { gridSpacing } from 'store/constant';
import { useEffect } from 'react';
import debtService from 'service/debtService';
import { useState } from 'react';

const IncomeHistory = ({ isLoading }) => {
  const [incomeHistory, setIncomeHistory] = useState([]);
  console.log('incomeHistory', incomeHistory);
  useEffect(() => {
    const fetchData = async () => {
      const response = await debtService.getReceivables();
      if (response.status === 200) {
        setIncomeHistory(response.data);
      } else {
        console.log('Erreur lors de la récupération des remboursements');
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false} sx={{ bgcolor: '#f9f9f9', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Les remboursements à venir </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {incomeHistory &&
                  incomeHistory?.length > 0 &&
                  incomeHistory.slice(-5).map((income, index) => (
                    <Grid container direction="column" key={index} sx={{ my: 1 }}>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="textPrimary" fontWeight="bold">
                              {income.debtor.username}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle1" color="success.dark" fontWeight="bold">
                              {income.amount}€
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {new Date(income.dueDate).toLocaleDateString()}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      {index !== 4 && <Divider sx={{ my: 1.5 }} />}
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </CardContent>
          <Grid item>{incomeHistory.length > 5 && <SeeAllButton to="/listincomehistory" title="Tout afficher" />}</Grid>
        </MainCard>
      )}
    </>
  );
};

export default IncomeHistory;
