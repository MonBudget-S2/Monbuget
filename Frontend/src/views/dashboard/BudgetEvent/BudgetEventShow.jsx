import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Grid from "@mui/material/Grid"
import ExpenseCard from "../../pages/expense/ExpenseCard";
import BudgetEventParticipate from "./BudgetEventParticipate";
import { gridSpacing } from "../../../store/constant";
import BudgetEventDateBetweenCard from "./BudgetEventDateBetweenCard";
import BudgetEventNbParticipantCard from "./BudgetEventNbParticipantCard";
import { Button, Typography, Card, CardContent } from "@mui/material";
import BudgetEventMostExpensiveCard from "./BudgetEventMostExpensiveCard";
import ListeBudgetExpenseCard from "./ListeBudgetExpenseCard";
import CustomAlert from "../../../ui-component/alert/CustomAlert";
import BudgetInviteParticipantCard from "./BudgetEventInvitePartipantCard";
import eventService from '../../../service/eventService';
import LoadingSpinner from '../../../ui-component/loader/Loader';
import EndEventBudget from './EndEventBudget';
import SumUpEvent from './SumUpEvent';
import { useSelector } from 'react-redux';
import { getUser } from 'store/authSlice';


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
    const [isEventEnded, setIsEventEnded] = useState(false);
    const [sumUpData, setSumUpData] = useState(null);

    const user = useSelector(getUser);


    useEffect(() => {
        const fetchEvent = async () => {
            const event = await eventService.getEventById(id);
            setEvent(event.data);
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

    const handleClickOpen = () => {
        // console.log('ID de l\'événement au moment de l\'ouverture de la modale :', id);
        setIsInviteFormOpen(true);
    };

    const handleEventEnded = async () => {
        try {
            const response = await eventService.endEvent(id);
            if (response.status === 200) {
                console.log("Réponse de l'API :", response.data);  // Ajout de cette ligne
                setSumUpData(response.data);
                setIsEventEnded(true);
                setAlertMessage({
                    open: true,
                    type: 'success',
                    message: "L'événement a été terminé avec succès."
                });
            } else {
                console.log('Erreur de statut non 200:', response);  // Ajout de cette ligne
                setAlertMessage({
                    open: true,
                    type: 'error',
                    message: "Erreur lors de la terminaison de l'événement."
                });
            }
        } catch (error) {
            console.error('Erreur lors de la capture:', error);  // Ajout de cette ligne
            setAlertMessage({
                open: true,
                type: 'error',
                message: "Erreur lors de la terminaison de l'événement."
            });
        }
    };


    const currentDate = new Date();
    const eventEndDate = new Date(event.endDate);
    const eventEndDateFormatted = eventEndDate.toLocaleDateString();


    if (currentDate > eventEndDate) {
        return (
            <Card>
            <CardContent>
                <Typography variant="h2" align="center" style={{ color: '#ff0000' }}>
                    Cet Événement est terminé depuis le {eventEndDateFormatted}
                </Typography>
            </CardContent>
        </Card>
        )
        
    } else {

        return (
            <Grid container spacing={gridSpacing}>
                {!isLoading ? (
                    <>
                        <CustomAlert open={alertMessage.open} message={alertMessage.message} type={alertMessage.type} setMessage={setAlertMessage} />
                        <Grid item xs={12} md={6}>
                            {isEventEnded && <SumUpEvent eventId={id} sumUpData={sumUpData} participants={event.eventParticipants} />}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h1" sx={{ pb: 3, textAlign: "center" }}>
                                Évènement : {event.name}
                            </Typography>
                        </Grid>
                        {event.userId === user.id && !isEventEnded && (
                            <Grid item xs={12} mb={2} >
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
                                <EndEventBudget eventId={id} onEventEnded={handleEventEnded} onClick={handleClickOpen} isEventEnded={isEventEnded} />
                            </Grid>
                        )}
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
        );
    }
}
