// ==============================|| INCOME TABLE ||============================== //

import PropTypes from 'prop-types';
import { CardContent, Grid, Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import incomeService from '../../../service/incomeService';
import AddIncome from './AddIncome';
import UpdateButton from 'ui-component/buttons/UpdateButton';
import DeleteButton from 'ui-component/buttons/DeleteButton';
import DataTable from 'ui-component/table/DataTable';

const IncomeTable = ({ setAlertMessage, setIsIncomeChanged, isAddFormOpen, setIsAddFormOpen }) => {
  const [incomes, setIncomes] = useState([{}]);
  const [editingIncome, setEditingIncome] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await incomeService.getIncomes();

      if (response.status === 200) {
        console.log('test', response.data);
        setIncomes(response.data);
        setIsLoading(false);
      } else {
        console.log('Erreur lors de la récupération des revenus');
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { field: 'type', headerName: 'Type de revenus', flex: 1 },
    { field: 'amount', headerName: 'Montant', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    {
      field: 'actions',
      sortable: false,
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
          <UpdateButton to="/listexpense" onClick={() => onEdit(params.row.id)} />
          <DeleteButton to="listexpense" onClick={() => onDelete(params.row.id)} />
        </Box>
      )
    }
  ];

  const onEdit = (id) => {
    const income = incomes.find((income) => income.id === id);
    income.date = format(parseISO(income.date), 'yyyy-MM-dd');
    setEditingIncome(income); // Set the editing income data
    setIsAddFormOpen(true); // Open the form
  };

  const onDelete = async (id) => {
    const response = await incomeService.deleteIncome(id);
    console.log('response', response);
    if (response.status === 200) {
      console.log('Revenu supprimé avec succès');
      setAlertMessage({ open: true, message: 'Revenu supprimé avec succès', type: 'success' });
      setIsIncomeChanged(true);
    } else {
      setAlertMessage({ open: true, message: 'Erreur lors de la suppression du revenu', type: 'error' });
    }
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          {isAddFormOpen && (
            <AddIncome
              setAlertMessage={setAlertMessage}
              setIsIncomeChanged={setIsIncomeChanged}
              isAddFormOpen={isAddFormOpen}
              setIsAddFormOpen={setIsAddFormOpen}
              income={editingIncome}
            />
          )}
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <DataTable rows={incomes} columns={columns} isLoading={isLoading} />
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

IncomeTable.propTypes = {
  isLoading: PropTypes.bool
};

export default IncomeTable;
