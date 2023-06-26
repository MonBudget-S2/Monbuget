import React from 'react';
import { Grid, Typography, CardContent, Divider } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import SeeAllButton from 'ui-component/buttons/SeeAllButton';

import { gridSpacing } from 'store/constant';
import { incomeHistoryData } from './income-history-data';

const IncomeHistory = ({ isLoading }) => {
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
                                        <Typography variant="h4">Derniers revenus</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                {incomeHistoryData.slice(-5).map((income, index) => (
                                    <Grid container direction="column" key={index} sx={{ my: 1 }}>
                                        <Grid item>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="textPrimary" fontWeight="bold">
                                                        {income.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {income.category}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="success.dark" fontWeight="bold">
                                                        {income.amount.toFixed(2)}€
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" >
                                                        {new Date(income.date).toLocaleDateString()}
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
                    <Grid item>
                        {incomeHistoryData.length > 5 && (
                            <SeeAllButton to="/listincomehistory" title="Tout afficher" />
                        )}
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

export default IncomeHistory;
