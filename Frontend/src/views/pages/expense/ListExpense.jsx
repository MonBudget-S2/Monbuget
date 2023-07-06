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
import DownloadIcon from '@mui/icons-material/Download';
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
      flex: 1,
      headerName: 'Actions',
      width:150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
          <IconButton color="info" aria-label="Modifier" onClick={() => onEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" aria-label="Supprimer" onClick={() => onDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
          {params.row.receiptImage && (
              <IconButton color="info" aria-label="Download Facture" onClick={() => onDownload(params.row.receiptImage)}>
                <DownloadIcon />
              </IconButton>
          )}

        </Box>
      )
    },
    {
      field: 'amount',
      headerName: 'Montant',
      flex: 1,
      valueFormatter: (params) => `- ${params.value}€`
    },
    {
      field: 'date',
      headerName: 'Date de réception',
      flex: 1,
      valueFormatter: (params) => format(new Date(params.value), 'dd/MM/yyyy'),
    },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'location', headerName: 'Lieu',  flex: 1, },
    { field: 'receiptImage', headerName: 'Image du reçu',  flex: 1, },
    { field: 'category', headerName: 'Catégorie',  flex: 1,valueGetter: (params) => params.row.category?.name },
    { field: 'eventBudget', headerName: 'Budget', flex: 1,valueGetter: (params) => params.row.eventBudget?.name }
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

  const onDownload = async (id) =>{
    const res = await expenseService.downloadFile(id);
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', id); // Remplacez 'file.png' par le nom de fichier souhaité

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

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
