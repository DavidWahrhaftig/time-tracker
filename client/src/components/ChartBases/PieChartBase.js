import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins
export default {
    extends: Doughnut,
    mixins: [reactiveProp],
    props: ["chartData", "chartOtions"],
    data() {
        return {
            options: {
                title: {
                    display: true,
                    fontSize: 16,
                    padding: 15,
                    text: 'Custom Chart Title'
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
