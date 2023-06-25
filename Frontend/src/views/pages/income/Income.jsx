import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import IncomeChart from './IncomeChart';
import { gridSpacing } from 'store/constant';
import chartData from './income-chart-data';
import IncomeHistory from './IncomeHistory';
import IncomeTable from './IncomeTable';
import CreateButton from 'ui-component/buttons/CreateButton';
import IncomeCard from './IncomeCard';

// ==============================|| INCOME PAGE ||============================== //

const Income = () => {
    const [isLoading, setLoading] = useState(true);
    const [totalIncome, setTotalIncome] = useState(0);

    useEffect(() => {
        setLoading(false);

        const incomes = chartData.series[0].data.reduce((acc, value) => acc + value, 0);
        setTotalIncome(incomes);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <IncomeCard
                            isLoading={isLoading}
                            title="Total des revenus"
                            total={totalIncome}
                        />
                    </Grid>
                    {/* TODO: Faire le plus haut revenus recu */}
                    {/* <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalExpenseByMonth
                            isLoading={isLoading}
                            title="Total des dépenses réelles"
                            total={totalIncome}
                        />
                    </Grid> */}
                </Grid>
                <CreateButton to="/addincome" title="Ajouter un revenu" />
            </Grid>
            <Grid item xs={12} md={8}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <IncomeChart series={chartData.series} isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
                <IncomeHistory />
            </Grid>
            <Grid item xs={12}>
                <IncomeTable />
            </Grid>
        </Grid>
    );
};

export default Income;
