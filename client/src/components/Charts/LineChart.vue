<template>
    <div>
        <app-line-chart-base :chartData="chartData" ></app-line-chart-base>
    </div>
</template>

<script>
import LineChartBase from '../ChartBases/LineChartBase';
export default {
    components: {
        appLineChartBase: LineChartBase
    },
    props: ['chartData'],
    data() {
        return {
            dummyData: {
                // hoverBackgroundColor: "blue",
                hoverBorderWidth: 10,
                labels: ["Project 1", "Project 2", "Project 3"],
                datasets: [
                    {
                        label: "Projects",
                        backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
                        data: [1, 10, 5]
                    }
                ]
            },
            dummyOptions: {
                hoverBorderWidth: 10
            },
            // options: {
            //     tooltips: {
            //         callbacks: {
            //             label: (tooltipItem, data) => {
            //                 // let label = data.datasets[tooltipItem.datasetIndex].label || '';
            //                 let label = data.labels[tooltipItem.index] || '';
            //                 console.log('tooltipItem',tooltipItem);
            //                 console.log('data',data);
            //                 if (label) {
            //                     label += ': ';
            //                 }
            //                 const hours = Math.floor(tooltipItem.yLabel / (60*60));
            //                 const mins = Math.floor(tooltipItem.yLabel / 60) - hours * 60;
            //                 const seconds = tooltipItem.yLabel - hours * 60 * 60 - mins * 60;
                            
            //                 // let durationString = `${('0' + hours % 60).slice(-2)}:${('0' + mins % 60).slice(-2)}:${('0' + seconds % 60).slice(-2)}`
            //                 // console.log("HH:" + hours + " MM:" + mins + " SS:" + seconds);
            //                 let durationString = '';
            //                 if (hours > 0) {
            //                     // durationString += ('0' + hours % 60).slice(-2);
            //                     // durationString += ' hours ';
            //                     durationString += hours + ' hour' + (hours > 1 ? 's ' : ' ');
            //                 }
            //                 if (mins > 0) {
            //                     // durationString += ('0' + mins % 60).slice(-2);
            //                     // durationString += ' mins ';
            //                     durationString += mins + ' min' + (mins > 1 ? 's ' : ' ');
            //                 }
            //                 if (seconds > 0) {
            //                     // durationString += ('0' + seconds % 60).slice(-2);
            //                     // durationString += ' seconds ';
            //                     durationString += seconds + ' second' + (seconds > 1 ? 's' : '');
            //                 }

            //                 console.log(durationString);
            //                 label += durationString;
            //                 return label;
            //             }
            //         }
            //     },
            //     scales: {
            //         xAxes: [{
            //             type: 'time',
            //             distribution: 'series',
            //             time: {
            //                 // tooltipFormat:'MM/DD/YYYY',
            //                 unit: 'day',
                            
            //                 // displayFormats: {
            //                 //     quarter: 'MMM YYYY'
            //                 // }
            //             },
            //             ticks: {
            //                 source: 'data',
            //                 beginAtZero: true,
            //                 // x min point should start at the first task's date
            //                 min: this.chartData.datasets[0].data[0].t
            //             }
            //         }],
            //         yAxes: [{
            //             ticks: {
            //                 beginAtZero: true,
                            
            //             }
            //         }]
            //     },
            //     responsive: true
            // }
        };
    },
}
</script>

<style>

</style>