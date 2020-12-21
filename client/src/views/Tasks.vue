<template>
    <div>

        <app-new-task/>
        <div class="tasks">
            <div class="tasks__date">Today</div>
            <!-- <p>tasks content</p> -->
            <app-task/>    
            <app-task/>    
            <app-task/>    
            <app-task/>    
            <app-task/>    
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Task from '@/components/Task.vue';
import NewTask from '@/components/NewTask.vue';

export default {
    name: 'Tasks',
    components: {
        appTask: Task,
        appNewTask: NewTask
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
        }
    }
</style>
