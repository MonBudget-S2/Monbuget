import Grid from '@mui/material/Grid'
import CreateButton from "../../../ui-component/buttons/CreateButton";
import MainCard from "../../../ui-component/cards/MainCard";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import datas from "./BudgetEventData";
const BugetEventIndex = () =>{
    const redirecter = (id)=>{
        console.log(id)
    }

    return(
        <Grid>
            <h1>Budget event</h1>
            <Grid item xs={12}>
                <CreateButton to="/AddBudgetEvenementiel" title="Ajouter un budget Evenementiel" />
            </Grid>
            <Grid item xs={12} container alignItems="center" justifyContent="flex-start">
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
                                {datas.map((row) => (
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
                    </TableContainer>
                </MainCard>
            </Grid>

        </Grid>

    );
}
export default BugetEventIndex;
