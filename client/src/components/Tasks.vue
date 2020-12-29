<template>
    <div>
        <div class="tasks">
            <div class="tasks__date">{{ date | englishDate }} <span>|</span> {{ date | fromNowDate }}</div>
            <app-task v-for="task in tasks" :key="task.taskID" :task="task"/>
        </div>
    </div>
</template>

<script>
import Task from './Task.vue';
import moment from 'moment'

export default {
    name: 'Tasks',
    props:['date', 'tasks'],
    components: {
        appTask: Task
    },
    filters: {
        fromNowDate: (date) => {
            const fromNow = moment(date).fromNow();

            // ensure the date is displayed with today and yesterday
            return moment(date).calendar( null, {
                // when the date is closer, specify custom values
                lastWeek: '[Last] dddd',
                lastDay:  '[Yesterday]',
                sameDay:  '[Today]',
                nextDay:  '[Tomorrow]',
                nextWeek: 'dddd',
                // when the date is further away, use from-now functionality             
                sameElse: function () {
                    return "[" + fromNow + "]";
                }
            });
        },
        englishDate: (date) => {
            return moment(date).format("dddd, MMMM Do YYYY")
        }
    }
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
            text-transform: capitalize;
            & > span {
                padding: 0 1rem;
            }
        }
    }
</style>
