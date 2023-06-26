import expenseChartData from '../../../pages/expense/expense-chart-data';
import incomeChartData from '../../../pages/income/income-chart-data';

const IncomeExpenseChartData = {
    options: {
        chart: {
            toolbar: {
                show: false,
            },
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        colors: ['#00E396', '#FF4560'],
        xaxis: {
            categories: incomeChartData.labels,
            labels: {
                style: {
                    colors: '#000000', // Couleur des labels de l'axe x
                },
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#000000', // Couleur des labels de l'axe y
                },
            },
        },
        legend: {
            labels: {
                colors: '#000000', // Couleur des labels de la légende
            },
        },
        grid: {
            borderColor: '#CCCCCC', // Couleur de la bordure de la grille
        },
        tooltip: {
            theme: 'light',
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
            },
        },
    },
    series: [
        {
            name: 'Revenus',
            type: 'area',
            data: incomeChartData.series[0].data,
        },
        {
            name: 'Dépenses',
            type: 'area',
            data: expenseChartData.series[0].data,
        },
    ],
};

export default IncomeExpenseChartData;
