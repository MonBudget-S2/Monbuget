import React from 'react';
import { useEffect, useState } from 'react';

import { gridSpacing } from 'store/constant';
import { Grid } from '@mui/material';

import AddDebt from './DebtPayment';
import CustomAlert from 'ui-component/alert/CustomAlert';
import TotalDebt from './TotalDebt';
import ListDebt from './ListDebt';
import NbUnifinishedDebt from './NbUnifinishedDebt';
import NbFinishedDebt from './NbFinishedDebt';
import debtService from 'service/debtService';

// ==============================|| DEBT PAGE ||============================== //

const Debt = () => {
  const [alertMessage, setAlertMessage] = useState({ open: false, type: '', message: '' });
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [debts, setDebts] = useState([]);
  const [isDebtChanged, setIsDebtChanged] = useState(false);

  useEffect(() => {
    const getDebts = async () => {
      const res = await debtService.getDebts();
      if (res.status !== 200) {
        setAlertMessage({ open: true, type: 'error', message: 'Erreur lors de la récupération des dettes' });
        return;
      }
      setDebts(res.data);

      setLoading(false);
    };

    getDebts();
  }, [isDebtChanged]);

  return (
    <Grid container spacing={gridSpacing}>
      <CustomAlert open={alertMessage.open} message={alertMessage.message} type={alertMessage.type} setMessage={setAlertMessage} />
      <Grid item xs={12}>
        <AddDebt setAlertMessage={setAlertMessage} isAddFormOpen={isAddFormOpen} setIsAddFormOpen={setIsAddFormOpen} />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalDebt isLoading={isLoading} debts={debts} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <NbUnifinishedDebt isLoading={isLoading} debts={debts} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <NbFinishedDebt isLoading={isLoading} debts={debts} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <ListDebt debts={debts} setAlertMessage={setAlertMessage} setIsDebtChanged={setIsDebtChanged} />
      </Grid>
    </Grid>
  );
};

export default Debt;
