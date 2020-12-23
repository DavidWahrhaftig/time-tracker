<template>
    <div>
        <div v-for="group in taskGroups" :key="group.date">
            <app-tasks :date="group.date" :tasks="group.tasks"/>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Tasks from '@/components/Tasks.vue';

export default {
    name: 'TaskGroup',
    props: ['taskGroups'],
    components: {
        appTasks: Tasks
    }
}
</script>

<style lang="scss">
    
</style>
