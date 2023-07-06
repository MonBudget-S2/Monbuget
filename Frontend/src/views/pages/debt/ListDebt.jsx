import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CardContent, Grid, Button, Chip } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

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
};

ListDebt.propTypes = {
  isLoading: PropTypes.bool
};

export default ListDebt;
