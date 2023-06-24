import React, { useEffect, useState } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import ExpenseChart from './ExpenseChart';
import ExpenseCard from './ExpenseCard';
import ExpenseByCategory from './ExpenseByCategory';
import CreateButton from 'ui-component/buttons/CreateButton';
import TotalExpenseByMonth from './TotalExpenseByMonth';
import MostExpensive from './MostExpensive';
import SeeAllButton from 'ui-component/buttons/SeeAllButton';

import expenseByCategoryData from './expense-by-category';
import chartData from './expense-chart-data';
import expenseHistoryData from './expensive-history-data';

const Expense = () => {
    const [totalRealExpenses, setTotalRealExpenses] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [recentExpenses, setRecentExpenses] = useState([]);

    useEffect(() => {
        setLoading(false);
    
        const realExpenses = chartData.series[0].data.reduce((acc, value) => acc + value, 0);
        setTotalRealExpenses(realExpenses);
    
        // Récupérer les 5 dernières transactions créées dans l'ordre décroissant
        const sortedExpenses = [...expenseHistoryData].sort((a, b) => new Date(b.date) - new Date(a.date));
        const lastFiveExpenses = sortedExpenses.slice(0, 5);
        setRecentExpenses(lastFiveExpenses.reverse());
    }, []);
    

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <ExpenseCard
                            isLoading={isLoading}
                            title="Total des dépenses réelles"
                            total={totalRealExpenses}
                            totalColor="#ff0000" // Couleur rouge
                        />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalExpenseByMonth
                            isLoading={isLoading}
                            title="Total des dépenses réelles"
                            total={totalRealExpenses}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <CreateButton to="/addincome" title="Ajouter une dépense" />
            </Grid>
            <Grid item xs={12} md={6}>
                <MostExpensive />
            </Grid>
            <Grid item xs={12} md={6}>
                <MainCard sx={{ mx: 3 }}>
                    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                                        Catégorie de dépense
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                                        Montant reçu
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                                        Date de réception
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {recentExpenses.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.expenseCategory}</TableCell>
                                        <TableCell align="center" style={{ color: '#ff0000' }}>- {row.amount}€</TableCell>
                                        <TableCell align="center">{new Date(row.date).toLocaleDateString('fr-FR')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {expenseHistoryData.length > 5 && <SeeAllButton to="/listexpense" title="Tout afficher" />}
                    </TableContainer>
                </MainCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <ExpenseByCategory expenses={expenseByCategoryData} series={chartData.series} isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={6}>
                <ExpenseChart series={chartData.series} isLoading={isLoading} />
            </Grid>
        </Grid>
    );
};

export default Expense;
