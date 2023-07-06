import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Grid from "@mui/material/Grid"
import ExpenseCard from "../../pages/expense/ExpenseCard";
import chartData from "views/pages/expense/expense-chart-data";
import DataBudget from "views/dashboard/BudgetEvent/BudgetEventData";
import BudgetEventParticipate from "./BudgetEventParticipate";
import {gridSpacing} from "../../../store/constant";
import BudgetEventDateBetweenCard from "./BudgetEventDateBetweenCard";
import BudgetEventNbParticipantCard from "./BudgetEventNbParticipantCard";
import {Button, Typography} from "@mui/material";
import BudgetEventMostExpensiveCard from "./BudgetEventMostExpensiveCard";
import ListeBudgetExpenseCard from "./ListeBudgetExpenseCard";
import CustomAlert from "../../../ui-component/alert/CustomAlert";
import BudgetInviteParticipantCard from "./BudgetEventInvitePartipantCard";
import eventService from '../../../service/eventService';

export default function BudgetEventShow(){
    const {id} = useParams();
    const [totalRealExpenses, setTotalRealExpenses] = useState(0);
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
        fetchEvent();
        fetchExpenses();
        setLoading(false);
        
    }, [id]);
    
    
    useEffect(() => {
        setLoading(false);
        const realBudgetFixee = DataBudget[0].amount;
        setBudgetFixee(realBudgetFixee);
        const realExpenses = chartData.series[0].data.reduce((acc, value) => acc + value, 0);
        setTotalRealExpenses(realExpenses);
    }, []);

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
    return(
        <Grid>
        {!isLoading ? (
            <>
            <CustomAlert open={alertMessage.open} message={alertMessage.message} type={alertMessage.type} setMessage={setAlertMessage} />
            <Typography variant="h3" sx={{ pb:3 }}>
                Evenement : { event.name }
            </Typography>
            <Grid item xs={12} mb={2} >
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    <Typography style={{ color: 'white' }} variant="subtitle1">
                        Inviter une Participant
                    </Typography>
                </Button>
                <BudgetInviteParticipantCard
                    setAlertMessage={setAlertMessage}
                    setIsInvited={setIsInvited}
                    isAddFormOpen={isInviteFormOpen}
                    setIsAddFormOpen={setIsInviteFormOpen}
                />
            </Grid>
            <Grid container spacing={2}>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                    <ExpenseCard isLoading={isLoading} title="Total des dépenses réelles" total={totalRealExpenses} />
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                    <ExpenseCard isLoading={isLoading} title="Budget Fixée" total={budgetFixee} />
                </Grid>
                <Grid item lg={4} md={12} sm={12} xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item sm={6} xs={12} md={6} lg={12}>
                            <BudgetEventDateBetweenCard
                                isLoading={isLoading}
                                dateStart={ startDate }
                                dateEnd={ endDate }
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} md={6} lg={12}>
                            <BudgetEventNbParticipantCard
                                isLoading={isLoading}
                                NbParticipant={"6"}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                    <BudgetEventParticipate />
                </Grid>
                <Grid item xs={12} md={6}>
                    <BudgetEventMostExpensiveCard />
                </Grid>
                <Grid item xs={12}>
                    <ListeBudgetExpenseCard expenses={expenses}
                    />
                </Grid>
            </Grid>
            </>
        ) : (
            <Typography variant="h3" sx={{ pb:3 }}>
                Chargement...
            </Typography>
            )}
            </Grid>

    )


}
