import React from 'react';
import PropTypes from 'prop-types';
import { CardContent, Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import DataTable from 'ui-component/table/DataTable';

const ListeBudgetExpenseCard = ({ isLoading, expenses, participants }) => {

    const participantsById = React.useMemo(() => {
        const result = {};
        participants?.forEach(participant => {
            result[participant.user.id] = participant.user;
        });
        return result;
    }, [participants]);


    const rows = expenses.map(expense => {
        const participant = participantsById[expense.userId];
        return {
            ...expense,
            firstname: participant ? participant.firstname : '',
            lastname: participant ? participant.lastname : '',
            // Ajoutez ici toute autre information de participant que vous voulez utiliser
        };
    });

    const columns = [
        {
            field: 'fullname',
            headerName: 'Participants',
            width: 150,
            flex: 1,
            valueGetter: (params) => {
                return `${params.row.firstname} ${params.row.lastname}`;
            },
        },
        { field: 'amount', headerName: 'Montant Dépensé', width: 130, flex: 1 },
        { 
            field: 'date',
            headerName: 'Date de dépense',
            flex: 1,
            width: 130,
            valueGetter: (params) => {
                const date = new Date(params.value);
                const formattedDate = date.toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                });

                return formattedDate;
            },
        },
        { field: 'description', headerName: 'Description', width: 130, flex: 1 },
        

        
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
                                <DataTable rows={rows} columns={columns}  />
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
    participants: PropTypes.array.isRequired, 
};

export default ListeBudgetExpenseCard;


