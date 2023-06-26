import { useEffect, useState } from 'react';
import React from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import chartData from './categorical-budget-chart';
import CategoricalBudgetChart from './CategoricalBudgetChart';
import CreateButton from 'ui-component/buttons/CreateButton';
import MostExpenseCategoryBudget from './MostExpenseCategoryBudget';
import ListCategoricalBudget from './ListCategoricalBudget';
import CategoricalBudgetFinished from './CategoricalBudgetFinished';
import CategoricalBudgetActive from './CategoricalBudgetActive';

//project datas
// import categoricalBudgetData from './categorical-budget-data';



// ==============================|| CATEGORICAL BUDGET PAGE ||============================== //

const CategoricalBudget = () => {
    const [nbCategoricalBudgetFinished, setNbCategoricalBudgetFinished] = React.useState(0);
    const [nbCategoricalBudgetActive, setNbCategoricalBudgetActive] = React.useState(0);
    const [mostSpentCategory, setMostSpentCategory] = useState('');
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const maxSpent = Math.max(...chartData.series);
        const maxSpentIndex = chartData.series.findIndex((value) => value === maxSpent);
        const mostSpentCategoryName = chartData.options.labels[maxSpentIndex];
        setMostSpentCategory(mostSpentCategoryName);

        setLoading(false);
    }, []);


    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <CreateButton to="/budgetallocation" title="Ajouter un budget catégorique" />
            </Grid>
            <Grid item xs={12} md={6}>
                <CategoricalBudgetChart isLoading={isLoading} options={chartData.options} series={chartData.series} type={chartData.type} height={chartData.height} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <MostExpenseCategoryBudget
                            isLoading={isLoading}
                            title="Catégorie la plus dépensée"
                            total={mostSpentCategory}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CategoricalBudgetFinished
                            isLoading={isLoading}
                            title="Budgets terminés"
                            nbCategoricalBudgetFinished={nbCategoricalBudgetFinished}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CategoricalBudgetActive
                            isLoading={isLoading}
                            title="Budgets actifs"
                            nbCategoricalBudgetActive={nbCategoricalBudgetActive}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <ListCategoricalBudget setNbCategoricalBudgetFinished={setNbCategoricalBudgetFinished} setNbCategoricalBudgetActive={setNbCategoricalBudgetActive} />
            </Grid>
        </Grid>

    );
};

export default CategoricalBudget;
