import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {  Box, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

import HourglassTopIcon from '@mui/icons-material/HourglassTop';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    background: 'linear-gradient(45deg, #051937, #004d7a, #008793, #00bf72, #a8eb12)',
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    height: '160px',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary[800],
        borderRadius: '50%',
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
        width: 210,
        height: 210,
        background: theme.palette.secondary[800],
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

const HourglassTopWrapper = styled(HourglassTopIcon)({
    position: 'absolute',
    top: '50%',
    left: '55%',
    transform: 'translate(-50%, -50%)',
    fontSize: '8rem',
    opacity: 0.3,
  });
  

const CategoricalBudgetActive = ({ isLoading, title, nbCategoricalBudgetActive }) => {

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <HourglassTopWrapper />
                    <Box sx={{ p: 2.25 }}>
                    <Fade in={true} timeout={600}>
                        <Grid container direction="column">
                            
                            <Grid item>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontSize: '2.125rem',
                                                fontWeight: 500,
                                                mr: 1,
                                                mt: 1.75,
                                                mb: 0.75,
                                                color: '#fff'
                                            }}
                                        >
                                            {nbCategoricalBudgetActive}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 1.25 }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color: '#fff'
                                    }}
                                >
                                    {title}
                                </Typography>
                            </Grid>
                        </Grid>
                        </Fade>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

CategoricalBudgetActive.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    nbCategoricalBudgetActive: PropTypes.number.isRequired
};

export default CategoricalBudgetActive;
