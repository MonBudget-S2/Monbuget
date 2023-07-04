import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CardContent, Grid, Button, Chip } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { cloneDeep } from 'lodash';

import SelectedDebt from './SelectedDebt';
import DataTable from 'ui-component/table/DataTable';

const ListDebt = ({ isLoading, debts }) => {
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRembourser = (debt) => {
    // const updatedDebtState = debtState.map((item) => {
    //   if (item.id === debt.id) {
    //     return { ...item, remainingAmount: debt.remainingAmount };
    //   }
    //   return item;
    // });

    // setDebtState(updatedDebtState);
    setSelectedDebt(debt);
    setIsModalOpen(true);
  };

  const updateDebtInTable = (updatedDebt) => {
    const index = debtState.findIndex((debt) => debt.id === updatedDebt.id);
    if (index !== -1) {
      // Update the debt in the state
      const newDebtData = cloneDeep(debtState); // Make a deep copy of the state to not mutate the original state
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
                <DataTable isLoading={isLoading} rows={debts} columns={columns} autoHeight style={{ animation: 'fadeIn 0.5s' }} />
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
  isLoading: PropTypes.bool
};

export default ListDebt;
