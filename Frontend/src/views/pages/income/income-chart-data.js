const chartData = {
    height: 480,
    type: 'line',
    options: {
        chart: {
            id: 'bar-chart',
            stacked: true,
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }
        ],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%'
            }
        },
        xaxis: {
            type: 'category',
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: {
                style: {
                    colors: ['#777', '#777', '#777', '#777', '#777', '#777', '#777', '#777', '#777', '#777', '#777', '#777']
                }
            }
        },
        legend: {
            show: true,
            fontSize: '14px',
            fontFamily: `'Roboto', sans-serif`,
            position: 'bottom',
            offsetX: 20,
            labels: {
                useSeriesColors: false
            },
            markers: {
                width: 16,
                height: 16,
                radius: 5
            },
            itemMargin: {
                horizontal: 15,
                vertical: 8
            }
        },
        fill: {
            type: 'solid'
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            show: true
        }
    },
    series: [
        {
            name: 'Salaire',
            data: [1000, 1500, 1200, 2000, 1800, 2200, 2400, 1900, 1700, 2300, 2100, 2500]
        },
        {
            name: 'Revenus d\'investissement',
            data: [500, 800, 700, 900, 1000, 1200, 1500, 1400, 1100, 1300, 1700, 1600]
        },
        {
            name: 'Revenus locatifs',
            data: [200, 300, 400, 600, 500, 700, 800, 900, 800, 1000, 1200, 1100]
        },
        {
            name: 'Revenus d\'entreprise',
            data: [400, 500, 600, 800, 700, 900, 1000, 1200, 1100, 1300, 1500, 1400]
        },
        {
            name: 'Revenus de retraite',
            data: [300, 400, 200, 500, 600, 400, 700, 800, 600, 900, 1000, 800]
        },
        {
            name: 'Autres revenus',
            data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 800, 900]
        }
    ]
};

export default chartData;
