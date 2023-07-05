import Grid from '@mui/material/Grid'
import MainCard from "../../../ui-component/cards/MainCard";
import {
    Button,
    CardContent,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {gridSpacing} from "../../../store/constant";
import Data from "views/dashboard/BudgetEvent/BudgetEventExpenseData";
const BugetEventExpense = () =>{
    const redirecter = (id)=>{
        console.log(id)
    }

    return (
        <MainCard content={false}>
            <CardContent>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Nom de Budget</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Montant €</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Description</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Date</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Action</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Data.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.eventBudgetName}</TableCell>
                                            <TableCell align="center">{row.amount} €</TableCell>
                                            <TableCell align="center">{row.description}</TableCell>
                                            <TableCell align="center">{row.date}</TableCell>
                                            <TableCell align="center">
                                                <Button variant="outlined" color="primary" onClick={() => redirecter(row.id)} sx={{ marginRight: '8px' }}>
                                                    Edit
                                                </Button>
                                                <Button variant="outlined" color="secondary" >
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
    );
}
export default BugetEventExpense;
