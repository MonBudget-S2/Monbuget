const chartData = {
    options: {
        chart: {
            id: 'donut-chart',
        },
        labels: ['Transport', 'Logement', 'Loisir', 'Nourriture'],
        colors: ['#00E396', '#775DD0', '#FF4560', '#D3D3D3'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100],
            },
        },
    },
    series: [5000, 3000, 8000, 6000], // Dépenses mensuelles par défaut
    type: 'donut',
    height: 400,
};

export default chartData;
