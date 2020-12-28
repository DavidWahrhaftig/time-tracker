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
            <select class="charts-grid__selcect-project-container " v-model="lineChartProject">
                <option :value="null">Select a project</option>
                <option 
                    v-for="project in projects" 
                    :key="project._id"
                    :value="project">
                    {{ project.name }}
                </option>
            </select>
            <app-line-chart 
                v-if="lineChartProject"
                :chartData="projectForLineChart"
                :key="lineChartProject._id"
                class="charts-grid__line-chart-container"/>
        </div>
        <!-- Line Chart -->
        <!-- <select class="line-chart-selector" v-model="lineChartProject">
            <option :value="null">Select a project</option>
            <option 
                v-for="project in projects" 
                :key="project._id"
                :value="project">
                {{ project.name }}
            </option>
        </select>
        <app-line-chart 
            v-if="lineChartProject"
            :chartData="projectForLineChart"
            class="line-chart-container"/> -->

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PieChart from '../components/Charts/PieChart.vue';
import BarChart from '../components/Charts/BarChart.vue';
import LineChart from '../components/Charts/LineChart.vue';
import moment from 'moment';
 
export default {
    components: {
        appPieChart: PieChart,
        appBarChart: BarChart,
        appLineChart: LineChart
    },
    data() {
        return {
            lineChartProject: null
        }
    },
    computed: {
        ...mapGetters(['projects']),
        projectsForChart() {
            let labels = [];
            let backgroundColors = [];
            let data = [];

            this.projects.forEach(project => {
                labels.push(project.name);
                // const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
                // backgroundColors.push(randomColor);
                backgroundColors.push(project.color);
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
        },
        projectForLineChart() {
            let labels = [];
            let backgroundColor = this.lineChartProject.color;
            let data = [];

            // gather the appropriate data from each task of the project
            this.lineChartProject.tasks.forEach(task => {
                const duration = moment(task.end).diff(task.start, 'seconds');
                
                labels.push(task.name);
                data.push({
                    t: moment(task.start),
                    y: duration
                });
            });
            
            return {
                labels: labels,
                datasets: [
                    {
                        label: `Tasks for ${this.lineChartProject.name}`,
                        backgroundColor,
                        data: data
                    }
                ]
            }
        }
    }
}
</script>

<style lang="scss">
    .charts-grid {
        margin-top: 4rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        // grid-template-columns: 40rem 40rem;
        grid-template-rows: 1fr;
        grid-column-gap: 5rem; 
        grid-row-gap: 2rem; 
        grid-template-areas: 
            "pie bar"
            "selectProject empty"
            "line empty";
        
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
        &__selcect-project-container {
            grid-area: selectProject;
            border: none;
            &:focus, &:hover{
                outline:none;
            }
        }
        &__line-chart-container {
            grid-area: line;
            // width: 30rem;
        }
    }

    .line-chart-selector {
        width: 60%;
        padding: 0.5rem;
        border: none;
        margin: 2rem 0;

        &:focus, &:hover{
            outline:none;
        }
    }
    .line-chart-container {
        width: 60%;
        background-color: $color-primary-light;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);  
          
    }
</style>