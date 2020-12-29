<template>
    <div>
        <div v-for="group in taskGroups" :key="group.date">
            <app-tasks :date="group.date" :tasks="group.tasks"/>
        </div>
    </div>
</template>

<script>
import Tasks from './Tasks.vue';

export default {
    name: 'TaskGroups',
    props: ['taskGroups'],
    components: {
        appTasks: Tasks
    }
}
</script>

<style lang="scss">
    
</style>
