import React, { useState } from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import { CardContent, Grid, Button, Chip } from '@mui/material';
=======
import { CardContent, Grid, Paper, Typography, CircularProgress, Button, Chip } from '@mui/material';
import { DataGrid, frFR } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
>>>>>>> feature/upload
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

<<<<<<< HEAD
import DataTable from 'ui-component/table/DataTable';
import DebtPayment from './DebtPayment';

const ListDebt = ({ isLoading, debts, setAlertMessage, setIsDebtChanged }) => {
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRembourser = (debt) => {
    setSelectedDebt(debt);
    setIsModalOpen(true);
  };

  const getStatus = (params) => {
    if (params && params.row) {
      const { amount, remainingAmount } = params.row;
      console.log('amount', amount, 'remainingAmount', remainingAmount);
      if (remainingAmount == 0) {
        return 'Remboursé';
      }
      if (amount === remainingAmount) {
        return 'Non remboursé';
      }
      if (amount > 0 && remainingAmount > 0) {
        return 'Remboursé partiellement';
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Non remboursé':
        return 'error';
      case 'Remboursé partiellement':
        return 'warning';
      case 'Remboursé':
        return 'success';
      default:
        return 'default';
    }
  };

  const columns = [
    { field: 'debtType', headerName: 'Type de dette', width: 200, flex: 1 },
    { field: 'motif', headerName: 'Motif', width: 200, flex: 1 },
    { field: 'amount', headerName: 'Montant', width: 200, flex: 1 },
    { field: 'remainingAmount', headerName: 'Montant restant', width: 180, flex: 1 },
    { field: 'dueDate', headerName: "Date d'échéance", width: 180, flex: 1 },
    {
      field: 'status',
      headerName: 'Statut',
      width: 200,
      renderCell: (params) => {
        const status = getStatus(params);
        const color = getStatusColor(status);
        return <Chip variant="outlined" label={status} color={color} size="small" />;
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 180,
      flex: 1,
      renderCell: (params) =>
        getStatus(params) !== 'Remboursé' ? (
          <Button variant="outlined" size="small" onClick={() => handleRembourser(params.row)}>
            Rembourser
          </Button>
        ) : null
    }
  ];

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <DataTable isLoading={isLoading} rows={debts} columns={columns} autoHeight style={{ animation: 'fadeIn 0.5s' }} />
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}

      <DebtPayment
        setAlertMessage={setAlertMessage}
        setIsDebtChanged={setIsDebtChanged}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        selectedDebt={selectedDebt}
      />
    </>
  );
=======
// data
import debtData from './debt-table-data';

import SelectedDebt from './SelectedDebt';

const ListDebt = ({ isLoading }) => {
    const [showTable, setShowTable] = useState(false);
    const [selectedDebt, setSelectedDebt] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [debtState, setDebtState] = useState(debtData);

    useEffect(() => {
        // Simulate loading for 1.5 seconds
        const timer = setTimeout(() => {
            setShowTable(true);
            setTotalDebt(calculateTotalDebt(debtState)); // Calculer la valeur totale de la dette initiale
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const handleRembourser = (debt) => {
        const updatedDebtState = debtState.map((item) => {
            if (item.id === debt.id) {
                return { ...item, remainingAmount: debt.remainingAmount };
            }
            return item;
        });

        setDebtState(updatedDebtState);
        setSelectedDebt(debt);
        setIsModalOpen(true);
    };

    const calculateTotalDebt = (debtList) => {
        return debtList.reduce((total, item) => total + item.remainingAmount, 0);
    };

    const updateDebtInTable = (updatedDebt) => {
        const index = debtState.findIndex(debt => debt.id === updatedDebt.id);
        if (index !== -1) {
            // Update the debt in the state
            const newDebtData = cloneDeep(debtState);  // Make a deep copy of the state to not mutate the original state
            newDebtData[index] = updatedDebt;

            // Update the status of the updated debt
            const status = getStatus({ row: updatedDebt });
            newDebtData[index].status = status;

            // Set the new data
            setDebtState(newDebtData);

            setIsModalOpen(false);
            // Afficher un message d'alerte indiquant que le remboursement a bien été effectué
            alert('Remboursement effectué avec succès !');
        }
    };


    const getStatus = (params) => {
        if (params && params.row) {
            const { amount, remainingAmount } = params.row;

            if (amount === 0) {
                return 'Non remboursé';
            } else if (amount > 0 && remainingAmount > 0) {
                return 'Remboursé partiellement';
            } else if (remainingAmount === 0) {
                return 'Remboursé';
            }
        }

        return 'Non remboursé';
    };



    const getStatusColor = (status) => {
        switch (status) {
            case 'Non remboursé':
                return 'error';
            case 'Remboursé partiellement':
                return 'warning';
            case 'Remboursé':
                return 'success';
            default:
                return 'default';
        }
    };


    const columns = [
        { field: 'debtType', headerName: 'Type de dette', width: 200, flex: 1 },
        { field: 'motif', headerName: 'Motif', width: 200, flex: 1 },
        { field: 'amount', headerName: 'Montant', width: 200, flex: 1 },
        { field: 'remainingAmount', headerName: 'Montant restant', width: 180, flex: 1 },
        { field: 'dueDate', headerName: 'Date d\'échéance', width: 180, flex: 1 },
        {
            field: 'status',
            headerName: 'Statut',
            width: 200,
            renderCell: (params) => {
                const status = getStatus(params);
                const color = getStatusColor(status);
                return <Chip variant="outlined" label={status} color={color} size="small" />;
            },
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 180,
            flex: 1,
            renderCell: (params) => (
                getStatus(params) !== 'Remboursé' ? (
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleRembourser(params.row)}
                        sx={{
                            // Ajoutez ici les styles personnalisés
                            color: 'red',
                            borderColor: 'red',
                            '&:hover': {
                                backgroundColor: 'red',
                                color: '#fff',
                            },
                        }}
                    >
                        Rembourser
                    </Button>
                ) : null
            ),
        },
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


    const handleModalClose = () => {
        setIsModalOpen(false);
    };

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
                                            <Grid
                                                container
                                                justifyContent="center"
                                                alignItems="center"
                                                sx={{ height: 400 }}
                                            >
                                                <CircularProgress />
                                                <Typography variant="body2" align="center">
                                                    Chargement en cours...
                                                </Typography>
                                            </Grid>
                                        ) : (
                                            <DataGrid
                                                initialState={{
                                                    ...debtData.initialState,
                                                    pagination: { paginationModel: { pageSize: 10 } },
                                                }}
                                                rows={debtState}
                                                columns={columns}
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

            <SelectedDebt
                selectedDebt={selectedDebt}
                updateSelectedDebt={setSelectedDebt}
                isOpen={isModalOpen}
                setIsOpen={handleModalClose}
                updateDebtInTable={updateDebtInTable}
            />

        </>
    );
>>>>>>> feature/upload
};

ListDebt.propTypes = {
  isLoading: PropTypes.bool
};

export default ListDebt;
