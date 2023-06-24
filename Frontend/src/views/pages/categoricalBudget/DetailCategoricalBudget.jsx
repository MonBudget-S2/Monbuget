import React from 'react';
import { Typography } from '@mui/material';
import categoricalBudgetData from './categorical-budget-data';


const DetailCategoricalBudget = ({ budgetId }) => {
const selectedBudget = categoricalBudgetData.find((budget) => budget.id === budgetId);
    if (!selectedBudget) {
        return <Typography variant="h5">Aucun budget sélectionné</Typography>;
    }

    return (
        <div>
            <Typography variant="h5">{selectedBudget.budgetName}</Typography>
            <Typography variant="subtitle1">Catégorie: {selectedBudget.category}</Typography>
            <Typography variant="subtitle1">Allocation totale: {selectedBudget.totalAllocation} €</Typography>
            <Typography variant="subtitle1">Période: {selectedBudget.startDate} - {selectedBudget.endDate}</Typography>
            <Typography variant="subtitle1">Statut: {selectedBudget.status}</Typography>
            <Typography variant="subtitle1">Suivi: {selectedBudget.tracking}%</Typography>
            {/* Ajoutez d'autres éléments pour afficher les détails du budget */}
        </div>
    );
};

export default DetailCategoricalBudget;
