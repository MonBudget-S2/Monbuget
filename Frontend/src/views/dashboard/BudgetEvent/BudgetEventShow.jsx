import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Grid from "@mui/material/Grid"
import ExpenseCard from "../../pages/expense/ExpenseCard";
import BudgetEventParticipate from "./BudgetEventParticipate";
import { gridSpacing } from "../../../store/constant";
import BudgetEventDateBetweenCard from "./BudgetEventDateBetweenCard";
import BudgetEventNbParticipantCard from "./BudgetEventNbParticipantCard";
import { Button, Typography } from "@mui/material";
import BudgetEventMostExpensiveCard from "./BudgetEventMostExpensiveCard";
import ListeBudgetExpenseCard from "./ListeBudgetExpenseCard";
import CustomAlert from "../../../ui-component/alert/CustomAlert";
import BudgetInviteParticipantCard from "./BudgetEventInvitePartipantCard";
import eventService from '../../../service/eventService';
import LoadingSpinner from '../../../ui-component/loader/Loader';

export default function BudgetEventShow() {
    const { id } = useParams();
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [budgetFixee, setBudgetFixee] = useState(0);
    const [alertMessage, setAlertMessage] = useState({ open: false, type: '', message: '' });
    const [isInviteFormOpen, setIsInviteFormOpen] = useState(false);
    const [isInvited, setIsInvited] = useState(false);
    const [event, setEvent] = useState({});
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchEvent = async () => {
            const event = await eventService.getEventById(id);
            setEvent(event.data);
            // console.log(event.data, "event");
        };

        const fetchExpenses = async () => {
            const expenses = await eventService.getAllExpensesByEventId(id);
            setExpenses(expenses.data);
        };

        const fetchTotalExpenses = async () => {
            const totalExpenses = await eventService.getAllExpensesByEventId(id);
            if (totalExpenses.status === 200) {
                setExpenses(totalExpenses.data);
                const totalAmount = totalExpenses.data.reduce((acc, value) => acc + value.amount, 0);
                setTotalExpenses(totalAmount);
            } else {
                console.log('Erreur lors de la récupération des dépenses');
            }
        };

        const fetchBudgetFixee = async () => {
            const response = await eventService.getEventById(id);
            if (response.status === 200) {
                const budgetAmount = response.data.amount;
                setBudgetFixee(budgetAmount);
            } else {
                console.log('Erreur lors de la récupération du budget fixe');
            }
        };



        fetchTotalExpenses();
        fetchEvent();
        fetchExpenses();
        fetchBudgetFixee();
        setLoading(false);

    }, [id]);


    useEffect(() => {
        if (isInvited) {
            setIsInvited(false);
        }
    }, [isInvited]);

    const startDate = new Date(event.startDate).toLocaleDateString();
    const endDate = new Date(event.endDate).toLocaleDateString();

    /*Get Id Event
    const { id } = useParams();
    */
    const handleClickOpen = () => {
        setIsInviteFormOpen(true);
    };
    return (
        <Grid container spacing={gridSpacing}>
            {!isLoading ? (
                <>
                    <CustomAlert open={alertMessage.open} message={alertMessage.message} type={alertMessage.type} setMessage={setAlertMessage} />
                    <Grid item xs={12}>
                        <Typography variant="h1" sx={{ pb: 3, textAlign: "center" }}>
                            Évènement : {event.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} mb={2}>
                        <Button variant="contained" color="primary" onClick={handleClickOpen}>
                            <Typography style={{ color: 'white' }} variant="subtitle1">
                                Inviter un Participant
                            </Typography>
                        </Button>
                        <BudgetInviteParticipantCard
                            setAlertMessage={setAlertMessage}
                            setIsInvited={setIsInvited}
                            isAddFormOpen={isInviteFormOpen}
                            setIsAddFormOpen={setIsInviteFormOpen}
                        />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <ExpenseCard isLoading={isLoading} title="Total des dépenses" total={totalExpenses} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <ExpenseCard isLoading={isLoading} title="Budget Fixée" total={budgetFixee} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <BudgetEventDateBetweenCard
                                    isLoading={isLoading}
                                    dateStart={startDate}
                                    dateEnd={endDate}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <BudgetEventNbParticipantCard
                                    isLoading={isLoading}
                                    NbParticipant={event.eventParticipants?.length ?? 0}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <BudgetEventParticipate participants={event.eventParticipants} isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <BudgetEventMostExpensiveCard />
                    </Grid>
                    <Grid item xs={12}>
                        <ListeBudgetExpenseCard expenses={expenses} participants={event.eventParticipants} isLoading={isLoading} />
                    </Grid>
                </>
            ) : (
                <Grid item xs={12}>
                    <LoadingSpinner />
                </Grid>
            )}
        </Grid>

    )


}
