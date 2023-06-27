import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid"
import ExpenseCard from "../../pages/expense/ExpenseCard";
import chartData from "views/pages/expense/expense-chart-data";
import DataBudget from "views/dashboard/BudgetEvent/BudgetEventData"

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
        <Grid container spacing={2}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
                <ExpenseCard isLoading={isLoading} title="Total des dépenses réelles" total={totalRealExpenses} />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
                <ExpenseCard isLoading={isLoading} title="Budget Fixée" total={budgetFixee} />
            </Grid>
        </Grid>
    );
}

