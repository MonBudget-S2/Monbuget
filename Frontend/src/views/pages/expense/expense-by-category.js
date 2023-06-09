const chartData = {
    options: {
        tooltip: {
            y: {
              formatter: function (value) {
                return value + ' €'; 
              },
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
            const depenseTotal = 200
            return (val/depenseTotal)*100 + "%"
            }
        },
        chart: {
            id: 'donut-chart'
        },
        labels: ['Ciné', 'Courses', 'Shopping', 'Jeux video'],
        colors: ['#00E396', '#775DD0', '#FF4560', '#D3D3D3'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100]
            }
        }
    },
    series: [40, 25, 15, 120],
    type: 'donut',
    height: 400
};

export default chartData;
