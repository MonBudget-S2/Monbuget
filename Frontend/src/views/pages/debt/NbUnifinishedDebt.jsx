import React from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography, Fade } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


// ==============================|| TOTAL UNFINISHED DEBT CARD ||============================== //

const CardWrapper = styled(MainCard)(({ theme }) => ({
    background: 'linear-gradient(45deg, #DA4453, #89216B)',
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    height: '180px',
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

const NbUnifinishedDebt = ({ isLoading }) => {
    const theme = useTheme();

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Fade in={true} timeout={600}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            <Typography variant="subtitle2" sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75, color: '#fff' }}>
                                                15
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Avatar
                                                sx={{
                                                    cursor: 'pointer',
                                                    ...theme.typography.smallAvatar,
                                                    backgroundColor: theme.palette.secondary[200],
                                                    color: theme.palette.secondary.dark
                                                }}
                                            >
                                                <ArrowDownwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                                            </Avatar>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sx={{ mb: 1.25 }}>
                                    <Typography variant="h4" sx={{ fontSize: '1rem', fontWeight: 500, color: '#fff' }}>
                                        Dettes non remboursées
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

NbUnifinishedDebt.propTypes = {
    isLoading: PropTypes.bool.isRequired
};

export default NbUnifinishedDebt;
