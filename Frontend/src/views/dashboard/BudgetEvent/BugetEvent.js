import Grid from '@mui/material/Grid'
import CreateButton from "../../../ui-component/buttons/CreateButton";
import MainCard from "../../../ui-component/cards/MainCard";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import datas from "./BudgetEventData";
import SeeAllButton from "../../../ui-component/buttons/SeeAllButton";
const BugetEvent = () =>{
    const redirecter = (id)=>{
        console.log(id)
    }

    return(
        <Grid container>
            <h1>Budget event</h1>
            <Grid item xs={12}>
                <CreateButton to="/AddBudgetEvenementiel" title="Ajouter un budget Evenementiel" />
            </Grid>
            <Grid item xs={6} container alignItems="center" justifyContent="flex-start">
                <MainCard>
                    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Nom du budget</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Montant alloué</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Start Date</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>End Date</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Action</TableCell>


                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {datas.slice(-3).map((row) => (
                                    <TableRow key={row.id} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell align="center">{row.amount}</TableCell>
                                        <TableCell align="center">{row.startDate}</TableCell>
                                        <TableCell align="center">{row.endDate}</TableCell>
                                        <TableCell align="center">
                                            <Button variant="outlined" color="primary" onClick={() => redirecter(row.id)} sx={{ marginRight: '8px' }}>
                                                Voir
                                            </Button>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {datas.length > 5 && (
                            <SeeAllButton to="/budgetEvenementielAll/" title="Tout afficher" sx={{ marginTop: '16px' }} />
                        )}
                    </TableContainer>
                </MainCard>
            </Grid>
            <Grid item xs={6} container alignItems="center" justifyContent="flex-start">
                <MainCard>
                    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                        <h1>My Expense</h1>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Nom du budget</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Expense</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Amount</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Date</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {datas.slice(-3).map((row) => (
                                    <TableRow key={row.id} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell align="center">{row.amount}</TableCell>
                                        <TableCell align="center">{row.startDate}</TableCell>
                                        <TableCell align="center">{row.endDate}</TableCell>
                                        <TableCell align="center">
                                            <Button variant="outlined" color="primary" onClick={() => redirecter(row.id)} sx={{ marginRight: '8px' }}>
                                                Voir
                                            </Button>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {datas.length > 5 && (
                            <SeeAllButton to="/BudgetEventExpense" title="Tout afficher" sx={{ marginTop: '16px' }} />
                        )}
                    </TableContainer>
                </MainCard>
            </Grid>

        </Grid>

    );
}
export default BugetEvent;
