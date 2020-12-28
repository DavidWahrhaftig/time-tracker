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
                            // let label = data.datasets[tooltipItem.datasetIndex].label || '';
                            let label = data.labels[tooltipItem.index] || '';
                            console.log('tooltipItem',tooltipItem);
                            console.log('data',data);
                            if (label) {
                                label += ': ';
                            }
                            const hours = Math.floor(tooltipItem.yLabel / (60*60));
                            const mins = Math.floor(tooltipItem.yLabel / 60) - hours * 60;
                            const seconds = tooltipItem.yLabel - hours * 60 * 60 - mins * 60;
                            
                            // let durationString = `${('0' + hours % 60).slice(-2)}:${('0' + mins % 60).slice(-2)}:${('0' + seconds % 60).slice(-2)}`
                            // console.log("HH:" + hours + " MM:" + mins + " SS:" + seconds);
                            let durationString = '';
                            if (hours > 0) {
                                // durationString += ('0' + hours % 60).slice(-2);
                                // durationString += ' hours ';
                                durationString += hours + ' hour' + (hours > 1 ? 's ' : ' ');
                            }
                            if (mins > 0) {
                                // durationString += ('0' + mins % 60).slice(-2);
                                // durationString += ' mins ';
                                durationString += mins + ' min' + (mins > 1 ? 's ' : ' ');
                            }
                            if (seconds > 0) {
                                // durationString += ('0' + seconds % 60).slice(-2);
                                // durationString += ' seconds ';
                                durationString += seconds + ' second' + (seconds > 1 ? 's' : '');
                            }

                            console.log(durationString);
                            label += durationString;
                            return label;
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        distribution: 'series',
                        time: {
                            // tooltipFormat:'MM/DD/YYYY',
                            unit: 'day',
                            
                            // displayFormats: {
                            //     quarter: 'MMM YYYY'
                            // }
                        },
                        ticks: {
                            source: 'data',
                            beginAtZero: true,
                            // x min point should start at the first task's date
                            min: this.chartData.datasets[0].data[0].t
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