import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CardContent, Grid, Paper, Typography, CircularProgress, Button } from '@mui/material';
import { DataGrid, frFR, GridToolbar } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// data
import debtData from './debt-table-data';

import SelectedDebt from './SelectedDebt';

const ListDebt = ({ isLoading }) => {
    const [showTable, setShowTable] = useState(false);
    const [selectedDebt, setSelectedDebt] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Simulate loading for 1.5 seconds
        const timer = setTimeout(() => {
            setShowTable(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const handleRembourser = (debt) => {
        setSelectedDebt(debt);
        setIsModalOpen(true);
    };

    const getStatus = (amount, remainingAmount) => {
        if (amount > 0 && amount < remainingAmount) {
            return <span>Remboursé partiellement</span>;
        } else if (amount === remainingAmount) {
            return <span>Remboursé</span>;
        } else {
            return (
                <span>
                    Non remboursé
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleRembourser({ amount, remainingAmount })}
                    >
                        Rembourser
                    </Button>
                </span>
            );
        }
    };

    const columns = [
        { field: 'debtType', headerName: 'Type de dette', width: 200, flex: 1 },
        { field: 'motif', headerName: 'Motif', width: 200, flex: 1 },
        { field: 'amount', headerName: 'Montant', width: 200, flex: 1 },
        { field: 'remainingAmount', headerName: 'Montant restant', width: 180, flex: 1 },
        { field: 'dueDate', headerName: 'Date d\'échéance', width: 180, flex: 1 },
        { field: 'status', headerName: 'Statut', width: 180, flex: 1 },
        { field: 'action', headerName: 'Action', width: 180, flex: 1,
        renderCell: (params) => (
            <Button
                variant="outlined"
                size="small"
                onClick={() => handleRembourser(params.row)}
            >
                Rembourser
            </Button>
        ), },

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

    const updatedDebtData = debtData.map((item) => {
        const { amount, remainingAmount } = item;
        const status = getStatus(amount, remainingAmount);
        return { ...item, status };
    });

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
                                                    ...debtData.initialState,
                                                    pagination: { paginationModel: { pageSize: 5 } },
                                                }}
                                                rows={updatedDebtData}
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

            <SelectedDebt
                selectedDebt={selectedDebt}
                setSelectedDebt={setSelectedDebt}
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
            />
        </>
    );
};

ListDebt.propTypes = {
    isLoading: PropTypes.bool,
};

export default ListDebt;
