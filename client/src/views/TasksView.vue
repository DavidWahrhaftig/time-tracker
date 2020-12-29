<template>
    <div>
        <app-new-task />
        <app-task-groups :taskGroups="tasksGroups" />
    </div>
</template>

<script>

import TaskGroups from '../components/TaskGroups.vue';
import NewTask from '../components/NewTask.vue';
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
    name: 'Tasks',
    components: {
        appNewTask: NewTask,
        appTaskGroups: TaskGroups,
    },
    computed: {
        ...mapGetters(['tasks']),
        tasksGroups() {
            // map date to array of tasks
            let tasksByDate = {}

            this.tasks.forEach(task => {
                const date = task.start.format('YYYY-MM-DD');
                if (date in tasksByDate) {
                    tasksByDate[date] = [...tasksByDate[date], {...task}];
                } else {
                    tasksByDate[date] = [{...task}];
                }
            });

            let groups = [];

            for (const key in tasksByDate){
                groups.push({date: key, tasks: tasksByDate[key]});
            }

            // sort groups by date          
            groups.sort((group1, group2) => {
                const date1 = moment(group1.date);
                const date2 = moment(group2.date);
                const diff = moment(date1.diff(date2, 'days'));

                if ( diff < 0 ){
                    return 1;
                } else if ( diff > 0 ){
                    return -1;
                } else {
                    return 0;
                }
            });

            return groups;
        }
    },
}
</script>

<style lang="scss">
    .tasks {
        border: solid 1px $color-primary-darker;
        border-bottom: solid 6px $color-primary-darker;
        margin-top: 4rem;
        & > * {
            border-top: solid 1px $color-primary-darker;
        }

        &__date {
            background-color: $color-primary-darker;
            padding: 1rem 2rem;
        }
    }
</style>
