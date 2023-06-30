import React from 'react';
import PropTypes from 'prop-types';
import { CardContent, Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import DataTable from 'ui-component/table/DataTable';
import BudgetParicipantExpenseDate from "./BudgetParicipantExpenseDate";

const ListeBudgetExpenseCard = ({ isLoading }) => {


    const columns = [
        { field: 'userName', headerName: 'Participant', width: 200 },
        { field: 'amount', headerName: 'Montant Dépensé', width: 130 },
        { field: 'description', headerName: 'description', width: 280  },
        { field: 'paymentMethod', headerName: 'Méthode de Paiement', width: 180 },
        { field: 'date', headerName: 'Date', width: 180  },
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
                                <DataTable rows={BudgetParicipantExpenseDate} columns={columns}  />
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    );
};

ListeBudgetExpenseCard.propTypes = {
    isLoading: PropTypes.bool,
};

export default ListeBudgetExpenseCard;
