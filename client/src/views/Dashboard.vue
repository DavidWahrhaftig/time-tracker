<template>
    <div>
        <h1>Dashboard</h1>
        <div class="charts-grid">
            <!-- Pie chart -->
            <app-pie-chart 
                class="charts-grid__pie-chart-container"
                :chartData="projectsData"/>
            <!-- Bar chart -->
            <app-bar-chart 
                class="charts-grid__bar-chart-container"
                :chartData="projectsData"/>
            <!-- select project for line chart -->
            <select class="charts-grid__selcect-project-container " v-model="selectedProject">
                <option :value="null">Select a project</option>
                <option 
                    v-for="project in projects" 
                    :key="project._id"
                    :value="project">
                    {{ project.name }}
                </option>
            </select>
            <!-- Line chart -->
            <app-line-chart 
                v-if="selectedProject"
                :key="selectedProject._id"
                :chartData="dataForLineChart"
                class="charts-grid__line-chart-container"/>
        </div>
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
            selectedProject: null
        }
    },
    computed: {
        ...mapGetters(['projects']),
        projectsData() {
            // chart data and options for pie and bar charts
            let labels = [];
            let backgroundColors = [];
            let data = [];

            // loop over the projects to collect label, color, data
            this.projects.forEach(project => {
                labels.push(project.name);
                backgroundColors.push(project.color);
                data.push(project.totalDuration);
            });

            return {
                labels: labels,
                datasets: [
                    {
                        label: "duration",
                        backgroundColor: backgroundColors,
                        data: data
                    }
                ]
            }
        },
        dataForLineChart() {
            // chart data for the line chart
            let labels = [];
            let backgroundColor = this.selectedProject.color;
            let data = [];

            // gather the appropriate data from each task of the project
            this.selectedProject.tasks.forEach(task => {
                const taskDuration = moment(task.end).diff(task.start, 'seconds');
                
                labels.push(task.name);
                data.push({
                    t: moment(task.start),
                    y: taskDuration
                });
            });
      

            return {
                labels: labels,
                datasets: [
                    {
                        label: `Tasks for ${this.selectedProject.name}`,
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
        // grid-template-columns: 1fr 1fr;
        grid-template-columns: 35rem 35rem;
        // grid-template-rows: 1fr;
        grid-template-rows: 35rem;
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
            grid-area: pie;
        }
        &__bar-chart-container {
            grid-area: bar;
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

    h1 {
        line-height: 100%;
    }
</style>