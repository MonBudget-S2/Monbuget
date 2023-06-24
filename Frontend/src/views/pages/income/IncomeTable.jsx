import PropTypes from 'prop-types';

// material-ui
import { Button, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import { format, parseISO } from 'date-fns';
// import datas from './income-data';
import { useEffect } from 'react';
import { useState } from 'react';
import incomeService from '../../../service/incomeService';
// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const IncomeTable = ({ isLoading }) => {
  const [incomes, setIncomes] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      const reponse = await incomeService.getIncomes();

      if (reponse.status === 200) {
        console.log('test', reponse.data);
        setIncomes(reponse.data);
      } else {
        console.log('Erreur lors de la récupération des revenus');
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                          Catégorie de revenus
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                          Montant reçu
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                          Date de réception
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {incomes.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.type}</TableCell>
                          <TableCell align="center">{row.amount}€</TableCell>
                          <TableCell align="center">{format(parseISO('2023-06-23T00:00:00.000Z'), 'dd-MM-yyyy')}</TableCell>
                          <TableCell align="center">
                            <Button variant="outlined" color="primary" onClick={() => onEdit(row.id)} sx={{ marginRight: '8px' }}>
                              Voir
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={() => onDelete(row.id)}>
                              Supprimer
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
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
