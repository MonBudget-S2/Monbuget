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
    TableRow,
} from "@mui/material";
import {gridSpacing} from "../../../store/constant";
import Data from "views/dashboard/BudgetEvent/BudgetEventData";
import { Link } from 'react-router-dom';

const BugetEventPartage = () =>{
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
                                        <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Date Start</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Date End</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Data.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell align="center">{row.amount}€</TableCell>
                                            <TableCell align="center">{row.startDate}</TableCell>
                                            <TableCell align="center">{row.endDate}</TableCell>
                                            <TableCell align="center">
                                                <Button component={Link} variant="outlined" color="primary" to={'/budgetEvent/'+row.id} sx={{ marginRight: '8px' }}>
                                                    Voir
                                                </Button>
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
export default BugetEventPartage;
