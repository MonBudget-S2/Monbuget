import React from 'react';
import PropTypes from 'prop-types';
import { CardContent, Grid, Chip, IconButton } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { CheckCircle, HourglassEmpty, Block, Edit, Delete } from '@mui/icons-material';
import DataTable from 'ui-component/table/DataTable';
import { useEffect } from 'react';
import { useState } from 'react';
import categoricalBudgetService from 'service/categoricalBudgetService';
import { format, parseISO } from 'date-fns';
import AddCategoricalBudget from './AddCategoricalBudget';
import { getDateStatus, getStatusColor } from 'utils/budget';

const ListCategoricalBudget = ({
  setAlertMessage,
  setIsBudgetChanged,
  setNbCategoricalBudgetFinished,
  setNbCategoricalBudgetActive,
  setMostSpentCategory
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [budgets, setBudgets] = useState({});
  const [editingBudget, setEditingBudget] = useState(true);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await categoricalBudgetService.getBudgets();

      if (response.status === 200) {
        console.log('test 2', response.data);
        setBudgets(response.data);
        setIsLoading(false);
      } else {
        console.log('Erreur lors de la récupération des revenus');
        setIsLoading(false);
      }
    };
    console.log('test', budgets);
    fetchData();
  }, []);

  useEffect(() => {
    if (budgets?.length > 0) {
      const finishedBudgets = budgets.filter((budget) => getDateStatus(budget.startDate, budget.endDate) === 'Terminé');
      setNbCategoricalBudgetFinished(finishedBudgets.length);

      const activeBudgets = budgets.filter((budget) => getDateStatus(budget.startDate, budget.endDate) === 'Actif');
      setNbCategoricalBudgetActive(activeBudgets.length);

      const maxSpent = Math.max(budgets.map((budget) => budget.amount));
      const maxSpentIndex = budgets.findIndex((value) => value.amount === maxSpent);
      const mostSpentCategoryName = budgets[maxSpentIndex]?.category.name;
      setMostSpentCategory(mostSpentCategoryName);
    }
  }, [budgets]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Inactif':
        return <Block />;
      case 'Actif':
        return <HourglassEmpty />;
      case 'Terminé':
        return <CheckCircle />;
      default:
        return null;
    }
  };

  const handleEdit = (budgetId) => {
    const budget = budgets.find((budget) => budget.id === budgetId);
    budget.startDate = format(parseISO(budget.startDate), 'yyyy-MM-dd');
    budget.endDate = format(parseISO(budget.endDate), 'yyyy-MM-dd');
    setEditingBudget(budget); // Set the editing income data
    setIsAddFormOpen(true); // Open the form

    // Handle edit action
    console.log('Edit budget with ID:', budgetId);
  };

  const handleDelete = async (budgetId) => {
    const response = await categoricalBudgetService.deleteBudget(budgetId);
    if (response.status === 200) {
      console.log('Budget deleted with ID:', budgetId);
      setAlertMessage({ open: true, message: 'Budget supprimé avec succès', type: 'success' });
      setIsBudgetChanged(true);
    } else {
      setAlertMessage({ open: true, message: 'Erreur lors de la suppression du budget', type: 'error' });
    }
  };

  const columns = [
    { field: 'name', headerName: 'Nom du budget', width: 200 },
    { field: 'amount', headerName: 'Montant alloué', width: 130 },
    { field: 'startDate', headerName: 'Débute le', width: 180 },
    { field: 'endDate', headerName: 'Se termine le', width: 180 },
    {
      field: 'category',
      headerName: 'Catégorie',
      width: 200,
      renderCell: (params) => params.row.category?.name || 'N/A'
    },
    { field: 'tracking', headerName: 'Suivi', width: 200 },
    {
      field: 'status',
      headerName: 'Statut',
      width: 200,
      renderCell: (params) => {
        const status = getDateStatus(params.row.startDate, params.row.endDate);
        const color = getStatusColor(status);
        const icon = getStatusIcon(status);

        return <Chip variant="outlined" label={status} color={color} size="small" icon={icon} />;
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <Delete />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          {isAddFormOpen && (
            <AddCategoricalBudget
              setAlertMessage={setAlertMessage}
              setIsBudgetChanged={setIsBudgetChanged}
              isAddFormOpen={isAddFormOpen}
              setIsAddFormOpen={setIsAddFormOpen}
              budget={editingBudget}
            />
          )}
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <DataTable rows={budgets} columns={columns} status={status} isLoading={isLoading} />
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

ListCategoricalBudget.propTypes = {
  isLoading: PropTypes.bool
};

export default ListCategoricalBudget;
