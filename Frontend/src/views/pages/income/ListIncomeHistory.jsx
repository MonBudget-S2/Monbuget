
// ==============================|| LIST HISTORY INCOME ||============================== //

import PropTypes from 'prop-types';
import { Button, CardContent, Grid, Paper } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { incomeHistoryData } from './income-history-data';
import MUIDataTable from 'mui-datatables';

const ListIncomeHistory = ({ isLoading }) => {
    const columns = [
        {
            name: 'Nom',
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: 'Montant',
            options: {
                filter: false,
                sort: true,
            },
        },
        {
            name: 'Date',
            options: {
                filter: false,
                sort: true,
            },
        },
        {
            name: 'Actions',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    const rowId = tableMeta.rowData[4]; // Assuming the row ID is stored at index 4
                    return (
                        <>
                            <Button variant="outlined" color="primary" onClick={() => handleEdit(rowId)} sx={{ marginRight: '8px' }}>
                                Voir
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={() => handleDelete(rowId)}>
                                Supprimer
                            </Button>
                        </>
                    );
                },
            },
        },
    ];

    const options = {
        filter: true,
        filterType: 'dropdown',
        responsive: 'vertical',
        selectableRows: 'none', // Change this if you want to enable row selection
        print: false,
        download: false,
        elevation: 0, // Remove box shadow
        tableBodyMaxHeight: 'calc(100vh - 300px)', // Set max height for the table body
        
    };

    const handleEdit = (rowId) => {
        // Logique pour gérer l'événement de modification
        console.log('Éditer la ligne avec l\'ID :', rowId);
    };

    const handleDelete = (rowId) => {
        // Logique pour gérer l'événement de suppression
        console.log('Supprimer la ligne avec l\'ID :', rowId);
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
                                    <MUIDataTable
                                        data={incomeHistoryData}
                                        columns={columns}
                                        options={options}
                                        className="custom-datatable" // Add a custom class for styling
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    );
};

ListIncomeHistory.propTypes = {
    isLoading: PropTypes.bool,
};

export default ListIncomeHistory;
