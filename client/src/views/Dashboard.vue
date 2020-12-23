<template>
    <div class="charts-grid">
        <h1>Dashboard</h1>
        <app-bar-chart/>
            <fusioncharts
                :type="type"
                :width="width"
                :height="height"
                :dataFormat="dataFormat"
                :dataSource="dataSource">
            </fusioncharts>
    </div>
</template>

<script>
import BarChart from '../components/Charts/ChartBar.vue';
// import FusionCharts from 'fucsioncharts';
export default {
    components: {
        appBarChart: BarChart
    },
    data() {
        return {
            type: 'pie2d',
            width: '500',
            height: '300',
            dataFormat: 'json',
            dataSource: {
                chart: {
                    caption: 'Recommended Portfolio Split',
                    subCaption: 'For a net-worth of $1M',
                    showValues: '1',
                    showPercentInTooltip: '0',
                    numberPrefix: '$',
                    enableMultiSlicing: '1',
                    theme: 'fusion'
                },
                data: [
                    {
                    label: 'Equity',
                    value: '300000'
                    },
                    {
                    label: 'Debt',
                    value: '230000'
                    },
                    {
                    label: 'Bullion',
                    value: '180000'
                    },
                    {
                    label: 'Real-estate',
                    value: '270000'
                    },
                    {
                    label: 'Insurance',
                    value: '20000'
                    }
                ]
            }
        }
    }
}
</script>

<style>

</style>