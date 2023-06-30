import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CardContent, Grid, Paper, Typography, CircularProgress, Button, Chip} from '@mui/material';
import { DataGrid, frFR } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { cloneDeep } from 'lodash';

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
        const index = debtData.findIndex(debt => debt.id === updatedDebt.id);
        if (index !== -1) {
            // Update the debt in the original table
            const newDebtData = cloneDeep(debtData);  // Make a deep copy of the data to not mutate the original data
            newDebtData[index].amount = updatedDebt.amount;  // Updating the 'amount' field in the data table
            newDebtData[index].remainingAmount = updatedDebt.remainingAmount;
    
            // Update the status of the updated debt
            const status = getStatus({ row: updatedDebt });
            newDebtData[index].status = status;
            
            // Set the new data
            setDebtState(newDebtData);
    
            setIsModalOpen(false);
            // Afficher un message d'alerte indiquant que le remboursement a bien été effectué
            alert('Remboursement effectué avec succès !');

             setTotalDebt(calculateTotalDebt(newDebtState)); // Recalculer la valeur totale de la dette mise à jour
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
                    <Button variant="outlined" size="small" onClick={() => handleRembourser(params.row)}>
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
};

ListDebt.propTypes = {
    isLoading: PropTypes.bool,
};

export default ListDebt;
