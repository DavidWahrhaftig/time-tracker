<template>
    <div>
        <app-line-chart-base :chartData="chartData"/>
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
            }
        };
    },
}
</script>

<style>

</style>