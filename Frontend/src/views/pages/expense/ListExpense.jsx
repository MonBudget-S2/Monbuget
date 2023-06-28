import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CardContent, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import { DataGrid, frFR, GridToolbar } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import expenseData from './expensive-history-data';

const ListExpense = ({ isLoading }) => {
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setShowTable(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { field: 'expenseCategory', headerName: 'Catégorie de dépense', width: 200, resizable: true },
    {
      field: 'amount',
      headerName: 'Montant',
      width: 130,
      valueFormatter: (params) => `- ${params.value}€`,
    },
    { field: 'date', headerName: 'Date de réception', width: 180, headerAlign: 'center' },
    { field: 'description', headerName: 'Description', width: 200, headerAlign: 'center' },
    { field: 'paymentMethod', headerName: 'Méthode de paiement', width: 200, headerAlign: 'center' },
    { field: 'location', headerName: 'Lieu', width: 200, headerAlign: 'center' },
    { field: 'receiptImage', headerName: 'Image du reçu', width: 200, headerAlign: 'center' },
    { field: 'createdAt', headerName: 'Créé le', width: 200, headerAlign: 'center' },
    { field: 'updatedAt', headerName: 'Mis à jour le', width: 200, headerAlign: 'center' },
    { field: 'userId', headerName: 'Utilisateur', width: 200, headerAlign: 'center' },
    { field: 'categoryId', headerName: 'Catégorie', width: 200, headerAlign: 'center' },
    { field: 'eventBudgetId', headerName: 'Budget', width: 200, headerAlign: 'center' },
  ];

  const theme = createTheme(
    {
      palette: {
        primary: { main: '#1976d2' },
      },
      components: {
        MuiDataGrid: {
          styleOverrides: {
            root: {
              '& .MuiDataGrid-cell': {
                color: '#333',
              },
              '& .MuiDataGrid-row:hover .MuiDataGrid-cell': {
                backgroundColor: '#f5f5f5',
              },
              '& .MuiDataGrid-row.Mui-selected .MuiDataGrid-cell': {
                backgroundColor: '#e3f2fd',
              },
            },
          },
        },
      },
    },
    frFR
  );

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Paper sx={{ boxShadow: 'none' }}>
                  <ThemeProvider theme={theme}>
                    {!showTable ? (
                      <Grid container justifyContent="center" alignItems="center" sx={{ height: 400 }}>
                        <CircularProgress />
                        <Typography variant="body2" align="center">
                          Chargement en cours...
                        </Typography>
                      </Grid>
                    ) : (
                      <DataGrid
                        initialState={{
                          ...expenseData.initialState,
                          pagination: { paginationModel: { pageSize: 5 } },
                        }}
                        rows={expenseData}
                        columns={columns}
                        slots={{ toolbar: GridToolbar }}
                        autoHeight
                        style={{ animation: 'fadeIn 0.5s' }}
                      />
                    )}
                  </ThemeProvider>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

ListExpense.propTypes = {
  isLoading: PropTypes.bool,
};

export default ListExpense;
