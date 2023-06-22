import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import datas from './categorical-budget-data';
import chartData from './categorical-budget-chart';
import MainCard from 'ui-component/cards/MainCard';
import CategoricalBudgetChart from './CategoricalBudgetChart';
import CreateButton from 'ui-component/buttons/CreateButton';


// ==============================|| CATEGORICAL BUDGET PAGE ||============================== //

const CategoricalBudget = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <CreateButton to="/budgetallocation" title="Ajouter un budget catégorique" />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <MainCard sx={{ mx: 3 }}>
                        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Nom du budget</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Catégorie</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Montant alloué</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Date </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Suivi (slider)</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {datas.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.budgetName}</TableCell>
                                            <TableCell align="center">{row.category}</TableCell>
                                            <TableCell align="center">{row.totalAllocation}</TableCell>
                                            <TableCell align="center">{row.dateSpent}</TableCell>
                                            <TableCell align="center">{row.tracking}</TableCell>
                                            <TableCell align="center">
                                                <Button variant="outlined" color="primary" onClick={() => onEdit(row.id)} sx={{ marginRight: '8px' }}>
                                                    Modifier
                                                </Button>
                                                <Button variant="outlined" color="secondary" onClick={() => onDelete(row.id)}>
                                                    Supprimer
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </MainCard>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <CategoricalBudgetChart isLoading={isLoading} options={chartData.options} series={chartData.series} type={chartData.type} height={chartData.height} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        
    );
};

export default CategoricalBudget;
