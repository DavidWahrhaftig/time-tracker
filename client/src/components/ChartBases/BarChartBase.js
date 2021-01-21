import { HorizontalBar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
    extends: HorizontalBar,
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
                        const hours = Math.floor(tooltipItem.xLabel / (60*60));
                        const mins = Math.floor(tooltipItem.xLabel / 60) - hours * 60;
                        const seconds = tooltipItem.xLabel - hours * 60 * 60 - mins * 60;
                        
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
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Duration (Seconds)'
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: ''
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