import React from 'react';
import PropTypes from 'prop-types';
import { CardContent, Grid, Chip } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { CheckCircle, HourglassEmpty, Block } from '@mui/icons-material';
import DataTable from 'ui-component/table/DataTable';
import { useEffect } from 'react';
import { useState } from 'react';
import categoricalBudgetService from 'service/categoricalBudgetService';

const ListCategoricalBudget = ({ setNbCategoricalBudgetFinished, setNbCategoricalBudgetActive }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [budgets, setBudgets] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await categoricalBudgetService.getBudgets();

      if (response.status === 200) {
        console.log('test', response.data);
        setBudgets(response.data);
        // const finishedBudgets = response.data.filter((budget) => getDateStatus(budget.startDate, budget.endDate) === 'Terminé');

        setIsLoading(false);
      } else {
        console.log('Erreur lors de la récupération des revenus');
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (budgets?.length > 0) {
      const finishedBudgets = budgets.filter((budget) => getDateStatus(budget.startDate, budget.endDate) === 'Terminé');
      setNbCategoricalBudgetFinished(finishedBudgets.length);

      const activeBudgets = budgets.filter((budget) => getDateStatus(budget.startDate, budget.endDate) === 'Actif');
      setNbCategoricalBudgetActive(activeBudgets.length);
    }
  }, [budgets]);

  const currentDate = new Date();

  const getDateStatus = (startDate, endDate) => {
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (currentDate < parsedStartDate) {
      return 'Inactif';
    } else if (currentDate <= parsedEndDate) {
      return 'Actif';
    } else {
      return 'Terminé';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Inactif':
        return 'error';
      case 'Actif':
        return 'warning';
      case 'Terminé':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Inactif':
        return <Block />;
      case 'Actif':
        return <HourglassEmpty />;
      case 'Terminé':
        return <CheckCircle />;
      default:
        return null;
    }
  };

  const columns = [
    { field: 'name', headerName: 'Nom du budget', width: 200 },
    { field: 'amount', headerName: 'Montant alloué', width: 130 },
    { field: 'startDate', headerName: 'Débute le', width: 180 },
    { field: 'endDate', headerName: 'Se termine le', width: 180 },
    { field: 'categoryId', headerName: 'Catégorie', width: 200 },
    { field: 'tracking', headerName: 'Suivi', width: 200 },
    {
      field: 'status',
      headerName: 'Statut',
      width: 200,
      renderCell: (params) => {
        const status = getDateStatus(params.row.startDate, params.row.endDate);
        const color = getStatusColor(status);
        const icon = getStatusIcon(status);

        return <Chip variant="outlined" label={status} color={color} size="small" icon={icon} />;
      }
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
                <DataTable rows={budgets} columns={columns} status={status} isLoading={isLoading} />
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

ListCategoricalBudget.propTypes = {
  isLoading: PropTypes.bool
};

export default ListCategoricalBudget;
