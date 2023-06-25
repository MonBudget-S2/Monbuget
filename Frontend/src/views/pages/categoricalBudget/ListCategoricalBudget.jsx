import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { format } from 'date-fns';
import categoricalBudgetData from './categorical-budget-data';
import UpdateButton from 'ui-component/buttons/UpdateButton';
import DeleteButton from 'ui-component/buttons/DeleteButton';
import DetailButton from 'ui-component/buttons/DetailButton';
import { isBefore, isAfter, parseISO } from 'date-fns';

// ==============================|| LIST CATEGORICAL BUDGET ||============================== //

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    boxShadow: 'none',
    '& table': {
        borderCollapse: 'separate',
        borderSpacing: `0 ${theme.spacing(2)}px`,
    },
    '& th': {
        backgroundColor: theme.palette.secondary.dark,
        color: '#fff',
        fontWeight: 'bold',
        borderBottom: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(1.5, 2),
    },
    '& td': {
        padding: theme.spacing(1.5, 2),
    },
    '& tbody tr': {
        backgroundColor: theme.palette.background.default,
    },
    '& tbody tr:nth-of-type(even)': {
        backgroundColor: theme.palette.background.paper,
    },
}));

const ListCategoricalBudget = ({ isLoading }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [setSelectedBudgetId] = useState(null);

    const handleClickPage = (page) => {
        setCurrentPage(page);
    };

    // Calcul du nombre total de pages
    const totalPages = Math.ceil(categoricalBudgetData.length / itemsPerPage);

    // Index des items à afficher sur la page courante
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Les budgets à afficher sur la page courante
    const currentBudgets = categoricalBudgetData
        .slice(startIndex, endIndex)
        .map((row) => {
            const today = new Date();
            const startDate = parseISO(row.startDate);
            const endDate = parseISO(row.endDate);

            if (isBefore(today, startDate)) {
                return { ...row, status: 'Inactif', statusColor: '#757575' };
            } else if (isAfter(today, endDate)) {
                return { ...row, status: 'Terminé', statusColor: '#4caf50' };
            } else {
                return { ...row, status: 'Actif', statusColor: '#ff9800' };
            }
        });

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <StyledTableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Nom du budget</TableCell>
                                                <TableCell align="center">Catégorie</TableCell>
                                                <TableCell align="center">Allocation totale</TableCell>
                                                <TableCell align="center">Période</TableCell>
                                                <TableCell align="center">Status</TableCell>
                                                <TableCell align="center">Suivi</TableCell>
                                                <TableCell align="center">Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {currentBudgets.map((row) => (
                                                <TableRow key={row.id}>
                                                    <TableCell>{row.budgetName}</TableCell>
                                                    <TableCell align="center">{row.category}</TableCell>
                                                    <TableCell align="center">{row.totalAllocation} €</TableCell>
                                                    <TableCell align="center">
                                                        {format(new Date(row.startDate), 'dd-MM-yyyy')} - {format(new Date(row.endDate), 'dd-MM-yyyy')}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <span
                                                            style={{
                                                                display: 'inline-block',
                                                                padding: '4px 8px',
                                                                borderRadius: '4px',
                                                                color: '#fff',
                                                                backgroundColor: row.statusColor,
                                                            }}
                                                        >
                                                            {row.status}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell align="center">{row.tracking}%</TableCell>
                                                    <TableCell align="center">
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <UpdateButton to="/listexpense" />
                                                            <DetailButton to="/detailcategoricalbudget" budgetId={row.id} onClick={() => setSelectedBudgetId(row.id)} />
                                                            <DeleteButton to="/listexpense" />
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </StyledTableContainer>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                    <Typography variant="body2" color="textSecondary">
                                        Page {currentPage} sur {totalPages}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <Button
                                            key={index}
                                            variant={index + 1 === currentPage ? 'contained' : 'outlined'}
                                            onClick={() => handleClickPage(index + 1)}
                                        >
                                            {index + 1}
                                        </Button>
                                    ))}
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    );
};

ListCategoricalBudget.propTypes = {
    isLoading: PropTypes.bool,
};

export default ListCategoricalBudget;
