import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { format } from 'date-fns';
import expenseHistoryData from './expensive-history-data';
import DetailButton from 'ui-component/buttons/DetailButton';
import DeleteButton from 'ui-component/buttons/DeleteButton';
import UpdateButton from 'ui-component/buttons/UpdateButton';

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
    '& .expense': {
        color: 'red',
    },
}));

const ListExpense = ({ isLoading }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleClickPage = (page) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(expenseHistoryData.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentExpenses = expenseHistoryData.slice(startIndex, endIndex);

    const totalExpenses = expenseHistoryData.reduce((acc, expense) => acc + expense.amount, 0);

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
                                                <TableCell>Catégorie de revenus</TableCell>
                                                <TableCell align="center">Montant reçu</TableCell>
                                                <TableCell align="center">Date de réception</TableCell>
                                                <TableCell align="center">Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {currentExpenses.map((row) => (
                                                <TableRow key={row.id}>
                                                    <TableCell>{row.expenseCategory}</TableCell>
                                                    <TableCell align="center" className={row.amount > 0 ? 'expense' : ''}>
                                                        - {row.amount}€
                                                    </TableCell>
                                                    <TableCell align="center">{format(new Date(row.date), 'dd-MM-yyyy')}</TableCell>
                                                    <TableCell align="center">
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                                                            <UpdateButton to="/editExpense" />
                                                            <DetailButton to="/detailExpense" />
                                                            <DeleteButton to="/deleteExpense" />
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </StyledTableContainer>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                    <Typography variant="body2" color="textSecondary">
                                        Total des dépenses : {totalExpenses}€
                                    </Typography>
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

ListExpense.propTypes = {
    isLoading: PropTypes.bool,
};

export default ListExpense;
