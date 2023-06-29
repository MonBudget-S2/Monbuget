import React from 'react';
import PropTypes from 'prop-types';
import { CardContent, Grid, IconButton } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import DataTable from 'ui-component/table/DataTable';
import expenseService from 'service/expenseService';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddExpense from './AddExpense';
import { useState } from 'react';
import { format, parseISO } from 'date-fns';

const ListExpense = ({ expenses, isLoading, setAlertMessage, setIsExpenseChanged }) => {
  const [editingExpense, setEditingExpense] = useState(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const columns = [
    {
      field: 'actions',
      sortable: false,
      headerName: 'Actions',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
          <IconButton color="info" aria-label="Modifier" onClick={() => onEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" aria-label="Supprimer" onClick={() => onDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    },
    { field: 'expenseCategory', headerName: 'Catégorie de dépense' },
    {
      field: 'amount',
      headerName: 'Montant',
      valueFormatter: (params) => `- ${params.value}€`
    },
    { field: 'date', headerName: 'Date de réception', headerAlign: 'center' },
    { field: 'description', headerName: 'Description', headerAlign: 'center' },
    { field: 'paymentMethod', headerName: 'Méthode de paiement', headerAlign: 'center' },
    { field: 'location', headerName: 'Lieu', headerAlign: 'center' },
    { field: 'receiptImage', headerName: 'Image du reçu', headerAlign: 'center' },
    { field: 'createdAt', headerName: 'Créé le', headerAlign: 'center' },
    { field: 'updatedAt', headerName: 'Mis à jour le', headerAlign: 'center' },
    { field: 'categoryId', headerName: 'Catégorie', headerAlign: 'center' },
    { field: 'eventBudgetId', headerName: 'Budget', headerAlign: 'center' }
  ];

  const onEdit = (id) => {
    const expense = expenses.find((expense) => expense.id === id);
    expense.date = format(parseISO(expense.date), 'yyyy-MM-dd');
    setEditingExpense(expense); // Set the editing expense data
    setIsAddFormOpen(true); // Open the form
  };

  const onDelete = async (id) => {
    const response = await expenseService.deleteExpense(id);
    console.log('response', response);
    if (response.status === 200) {
      console.log('Expense deleted');
      setAlertMessage({ open: true, message: 'La dépense a été supprimée avec succès', type: 'success' });
      setIsExpenseChanged(true);
    } else {
      setAlertMessage({ open: true, message: 'Erreur lors de la suppression de la dépense', type: 'error' });
    }
  };

  return (
    <>
      <MainCard content={false}>
        {isAddFormOpen && (
          <AddExpense
            setAlertMessage={setAlertMessage}
            setIsExpenseChanged={setIsExpenseChanged}
            isAddFormOpen={isAddFormOpen}
            setIsAddFormOpen={setIsAddFormOpen}
            expense={editingExpense}
          />
        )}
        <CardContent>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <DataTable rows={expenses} columns={columns} isLoading={isLoading} />
            </Grid>
          </Grid>
        </CardContent>
      </MainCard>
    </>
  );
};

ListExpense.propTypes = {
  expenses: PropTypes.array,
  isLoading: PropTypes.bool
};

export default ListExpense;
