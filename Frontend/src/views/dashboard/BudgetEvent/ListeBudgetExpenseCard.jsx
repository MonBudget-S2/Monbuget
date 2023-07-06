import React from 'react';
import PropTypes from 'prop-types';
import { CardContent, Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import DataTable from 'ui-component/table/DataTable';

const ListeBudgetExpenseCard = ({ isLoading, expenses }) => {
    const columns = [
        { field: 'userId', headerName: 'Participant ID', width: 200 },
        { field: 'amountPaid', headerName: 'Montant Dépensé', width: 130 },
        
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
                                <DataTable rows={expenses} columns={columns}  />
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
    expenses: PropTypes.array.isRequired,
};

export default ListeBudgetExpenseCard;


