import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
    extends: Line,
    mixins: [reactiveProp],
    props: ["chartData"],
    data() {
        return {
            options: {
                tooltips: {
                    callbacks: {
                        label: (tooltipItem, data) => {
                            // set label to task name if exists 
                            let label = data.labels[tooltipItem.index] || '';

                            if (label) {
                                label += ': ';
                            }
                            const hours = Math.floor(tooltipItem.yLabel / (60*60));
                            const mins = Math.floor(tooltipItem.yLabel / 60) - hours * 60;
                            const seconds = tooltipItem.yLabel - hours * 60 * 60 - mins * 60;
                            
                            let durationString = '';
                            if (hours > 0) {
                                durationString += hours + ' hour' + (hours > 1 ? 's ' : ' ');
                            }
                            if (mins > 0) {
                                durationString += mins + ' min' + (mins > 1 ? 's ' : ' ');
                            }
                            if (seconds > 0) {
                                durationString += seconds + ' second' + (seconds > 1 ? 's' : '');
                            }

                            label += durationString; 
                            // 'task name: h hours m minutes s seconds'
                            return label;
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        distribution: 'series',
                        time: {
                            unit: 'day',
                        },
                        ticks: {
                            source: 'data',
                            beginAtZero: true,
                            // x min point should start at the first task's date
                            min: this.chartData.datasets[0].data.length > 0 ? this.chartData.datasets[0].data[0].t : null
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            
                        }
                    }]
                },
                responsive: true
            }
        };
    },
    mounted() {
        this.renderChart(this.chartData, this.options);
    }
};