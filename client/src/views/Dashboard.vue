<template>
    <div>
        <h1>Dashboard</h1>
        <div class="charts-grid">
            <app-pie-chart 
                class="charts-grid__pie-chart-container"
                :chartData="projectsForChart.data" 
                :chartOptions="projectsForChart.options" />
            <app-bar-chart 
                class="charts-grid__bar-chart-container"
                :chartData="projectsForChart.data" 
                :chartOptions="projectsForChart.options" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import BarChart from '../components/Charts/ChartBar.vue';
// import FusionCharts from 'fucsioncharts';
import PieChart from '../components/Charts/PieChart.vue';
import BarChart from '../components/Charts/BarChart.vue';
 
export default {
    components: {
        appPieChart: PieChart,
        appBarChart: BarChart
    },
    computed: {
        ...mapGetters(['projects']),
        projectsForChart() {
            let labels = [];
            let backgroundColors = [];
            let data = [];

            this.projects.forEach(project => {
                labels.push(project.name);
                const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
                backgroundColors.push(randomColor);
                data.push(project.totalDuration);

            });

            // return {
            //     options: {
            //         hoverBorderWidth: 10
            //     },
            //     data: {
            //         // hoverBackgroundColor: "blue",
            //         hoverBorderWidth: 10,
            //         labels: ["Project 1", "Project 2", "Project 3"],
            //         datasets: [
            //             {
            //                 label: "Projects",
            //                 backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
            //                 data: [1, 10, 5]
            //             }
            //         ]
            //     }
            // }
            return {
                options: {
                    title: {
                        display: true,
                        fontSize: 16,
                        padding: 15,
                        text: 'Custom Chart Title'
                    },
                    hoverBorderWidth: 10,
                },
                data: {
                    // hoverBackgroundColor: "blue",
                    hoverBorderWidth: 10,
                    labels: labels,
                    datasets: [
                        {
                            label: "duration",
                            backgroundColor: backgroundColors,
                            data: data
                        }
                    ]
                }
            }
        }
    }
}
</script>

<style lang="scss">
    .charts-grid {
        margin-top: 4rem;
        display: grid;
        grid-template-columns: 50rem 50rem;
        // grid-template-columns: 40rem 40rem;
        grid-template-rows: 50rem;
        grid-column-gap: 10rem; 
        grid-template-areas: 
            "pie bar";
        
        & > * {
            background-color: $color-primary-light;
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);  
            
        }

        &__pie-chart-container {
            // position: relative;
            grid-area: pie;
            // margin: auto;
            // width: 30rem;
            // width: 20rem;
        }
        &__bar-chart-container {
            grid-area: bar;
            // width: 30rem;
        }
    }

    // .pie-chart-container {
      
    // }
</style>