import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid"
import ExpenseCard from "../../pages/expense/ExpenseCard";
import chartData from "views/pages/expense/expense-chart-data";
import DataBudget from "views/dashboard/BudgetEvent/BudgetEventData";
import BudgetEventParticipate from "./BudgetEventParticipate";
import {gridSpacing} from "../../../store/constant";
import BudgetEventDateBetweenCard from "./BudgetEventDateBetweenCard";
import BudgetEventNbParticipantCard from "./BudgetEventNbParticipantCard";
import {Typography} from "@mui/material";
import BudgetEventMostExpensiveCard from "./BudgetEventMostExpensiveCard";
import ListeBudgetExpenseCard from "./ListeBudgetExpenseCard";

export default function BudgetEventShow(){
    const [totalRealExpenses, setTotalRealExpenses] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [budgetFixee, setBudgetFixee] = useState(0);
    useEffect(() => {
        setLoading(false);
        const realBudgetFixee = DataBudget[0].amount;
        setBudgetFixee(realBudgetFixee);
        const realExpenses = chartData.series[0].data.reduce((acc, value) => acc + value, 0);
        setTotalRealExpenses(realExpenses);
    }, []);

    /*Get Id Event
    const { id } = useParams();
    */
    return(
        <Grid>
            <Typography variant="h3" sx={{ pb:3 }}>
                Evenement : { DataBudget[0].name }
            </Typography>
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
                                dateStart={ DataBudget[0].startDate }
                                dateEnd={ DataBudget[0].endDate }
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
                    <ListeBudgetExpenseCard
                    />
                </Grid>
            </Grid>
        </Grid>

    );
}

