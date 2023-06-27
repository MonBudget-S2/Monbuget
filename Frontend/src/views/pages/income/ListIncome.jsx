// import PropTypes from 'prop-types';

// // material-ui
// import { Button, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// // project imports
// import MainCard from 'ui-component/cards/MainCard';
// import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
// import { gridSpacing } from 'store/constant';

// // assets
// import { format } from 'date-fns';
// import incomeData from './income-data';


// // ==============================|| LIST INCOME ||============================== //

// const ListIncome = ({ isLoading }) => {
//     return (
//         <>
//             {isLoading ? (
//                 <SkeletonPopularCard />
//             ) : (
//                 <MainCard content={false}>
//                     <CardContent>
//                         <Grid container spacing={gridSpacing}>
//                             <Grid item xs={12}>
//                                 <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
//                                     <Table>
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Catégorie de revenus</TableCell>
//                                                 <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Montant reçu</TableCell>
//                                                 <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Date de réception</TableCell>
//                                                 <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Description</TableCell>
//                                                 <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Actions</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {incomeData.map((row) => (
//                                                 <TableRow key={row.id}>
//                                                     <TableCell>{row.incomeName}</TableCell>
//                                                     <TableCell align="center">{row.amountEarned}€</TableCell>
//                                                     <TableCell align="center">{format(new Date(row.dateEarned), 'dd-MM-yyyy')}</TableCell>
//                                                     <TableCell align="center">{row.description}</TableCell>
//                                                     <TableCell align="center">
//                                                         <Button variant="outlined" color="primary" onClick={() => onEdit(row.id)} sx={{ marginRight: '8px' }}>
//                                                             Voir
//                                                         </Button>
//                                                         <Button variant="outlined" color="secondary" onClick={() => onDelete(row.id)}>
//                                                             Supprimer
//                                                         </Button>
//                                                     </TableCell>
//                                                 </TableRow>
//                                             ))}
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             </Grid>
//                         </Grid>
//                     </CardContent>
//                 </MainCard>
//             )}
//         </>
//     );
// };

// ListIncome.propTypes = {
//     isLoading: PropTypes.bool
// };

// export default ListIncome;
