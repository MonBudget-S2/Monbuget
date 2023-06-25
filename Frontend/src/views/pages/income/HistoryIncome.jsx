import PropTypes from 'prop-types';

// material-ui
import { Button, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import { incomeHistoryData } from './income-history-data';

// ==============================|| LIST INCOME ||============================== //

const HistoryIncome = ({ isLoading }) => {
    
    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Nom</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Montant</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Date</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {incomeHistoryData.map((row) => (
                                                <TableRow key={row.id}>
                                                    <TableCell>{row.name}</TableCell>
                                                    <TableCell align="center">{row.amount}€</TableCell>
                                                    <TableCell align="center">{new Date(row.date).toLocaleDateString()}</TableCell>
                                                    <TableCell align="center">
                                                        <Button variant="outlined" color="primary" onClick={() => handleEdit(row.id)} sx={{ marginRight: '8px' }}>
                                                            Voir
                                                        </Button>
                                                        <Button variant="outlined" color="secondary" onClick={() => handleDelete(row.id)}>
                                                            Supprimer
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    );

};

HistoryIncome.propTypes = {
    isLoading: PropTypes.bool
};

export default HistoryIncome;