import Grid from '@mui/material/Grid'
import CreateButton from "../../../ui-component/buttons/CreateButton";
import MainCard from "../../../ui-component/cards/MainCard";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import datas from "./BudgetEventData";
import SeeAllButton from "../../../ui-component/buttons/SeeAllButton";
import chartData from "views/dashboard/BudgetEvent/BudgetEventChartDate";
import React, {useEffect, useState} from "react";
import BudgetEventChart from "views/dashboard/BudgetEvent/BudgetEventChart";
import BudgetEventInvitationData from "./BudgetEventInvitationData"
const BugetEvent = () =>{
    const redirecter = (id)=>{
        console.log(id)
    };

    const acceptInvitation = (id) =>{
        console.log(id)
    };

    const refuserInvitation = (id) =>{
        console.log(id)
    };

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return(
        <Grid container alignItems="flex-start"  sx={{ flexWrap: 'wrap' }} spacing={3}>
            <h1>Budget event</h1>
            <Grid item xs={12}>
                <CreateButton to="/AddBudgetEvenementiel" title="Ajouter un budget Evenementiel" />
            </Grid>
            <Grid item xs={12} md={7}>
                <BudgetEventChart
                    isLoading={isLoading}
                    options={chartData.options}
                    series={chartData.series}
                    type={chartData.type}
                    height={chartData.height}
                />
            </Grid>
            <Grid item xs={12} md={5}>
                <MainCard>
                    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                        <h1>Mes Invitations Budgets</h1>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Organisateur</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Nom du Buget</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {BudgetEventInvitationData.slice(-3).map((row) => (
                                    <TableRow key={row.id} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                                        <TableCell>{row.userId}</TableCell>
                                        <TableCell align="center">{row.eventId}</TableCell>
                                        <TableCell align="center">
                                            <Button variant="outlined" color="primary" onClick={() => acceptInvitation(row.id)} sx={{ marginRight: '8px' }}>
                                                Accepter
                                            </Button>
                                            <Button variant="outlined" color="primary" onClick={() => refuserInvitation(row.id)} sx={{ marginRight: '8px' }}>
                                                Refuser
                                            </Button>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </MainCard>
            </Grid>
            <Grid item xs={12} md={6} container alignItems="center" justifyContent="flex-start">
                <MainCard>
                    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                        <h1>My BudgetEvent</h1>
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
            <Grid item xs={12} md={6} container alignItems="center" justifyContent="flex-start" >
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
