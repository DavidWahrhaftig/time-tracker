import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins
export default {
    extends: Doughnut,
    mixins: [reactiveProp],
    props: ["chartData", "chartOtions"],
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

                            const value = data.datasets[0].data[tooltipItem.index];

                            const hours = Math.floor(value/ (60*60));
                            const mins = Math.floor(value / 60) - hours * 60;
                            const seconds = value - hours * 60 * 60 - mins * 60;
                            
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
                title: {
                    display: true,
                    fontSize: 16,
                    padding: 15,
                    text: 'Projects Duration'
                }
            }
        }
    },
    mounted() {
        // this.chartData is created in the mixin.
        // If you want to pass options please create a local options object
        this.renderChart(this.chartData, this.options);
    }
};
