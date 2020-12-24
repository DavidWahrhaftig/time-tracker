<template>
    <div>
        <app-pie-chart-base :chartData="chartData" :chartOptions="chartOptions"></app-pie-chart-base>
    </div>
</template>

<script>
import PieChartBase from '../ChartBases/PieChartBase';
export default {
    components: {
        appPieChartBase: PieChartBase
    },
    props: ['chartData', 'chartOptions'],
    data() {
        return {
            dummyOptions: {
                hoverBorderWidth: 10
            },
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
            }
        };
    },
}
</script>

<style>

</style>