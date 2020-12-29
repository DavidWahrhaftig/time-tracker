<template>
    <div class="new-task" :class="{'new-task--running': this.started}">
        <!-- name input -->
        <input 
            class="new-task__input-name" 
            :disabled="this.started" 
            type="text" 
            v-model="newTask.name" 
            placeholder="Task Name"/>
        <app-project-menu/>
        <!-- duration display -->
        <div class="new-task__duration">{{ formattedDuration }}</div>
        <!-- start/stop button -->
        <button 
            @click="startTime()" 
            class="new-task__button new-task__button--start" 
            v-if="!started">
            Start
        </button>
        <button 
            @click="stopTime()" 
            class="new-task__button new-task__button--stop" 
            v-else>
            Stop
        </button>
    </div>
</template>

<script>
import ProjectMenu from './ProjectsMenu.vue';
import moment from 'moment';
import { mapActions, mapGetters, mapMutations } from 'vuex';


export default {
    components : {
        AppProjectMenu: ProjectMenu
    },
    data() {
        return {
            started: false,
            duration: 0,
            intervalID: null
        }
    },
    computed: {
        ...mapGetters(['newTask']),
        formattedDuration() {
            // format duration from seconds to HH:MM:SS
            return moment.utc(this.duration * 1000).format('HH:mm:ss');
        },
    },
    methods: {
        ...mapMutations(['resetNewTask', 'setNewTask']),
        ...mapActions(['createTask', 'updateTask']),
        async startTime() {
            // when task name is empty don't do anything
            if (this.newTask.name === '') return;

            this.started = true;
            this.newTask.start = moment();
            // increase the duration every second
            this.intervalID = setInterval(() => {
                this.duration += 1;
            }, 1000);
        }, 
        async stopTime() {
            this.started = false;
            clearInterval(this.intervalID);
            this.intervalID = null;

            this.newTask.end = this.newTask.start.clone().add(this.duration, 'seconds')
            // api call to create new task
            await this.createTask(this.newTask);

            // reset local component state data
            this.duration= 0;
            this.intervalID= null;
            // reset global vuex New Task state
            this.resetNewTask();
        },
    }
}
</script>

<style lang="scss">
    .new-task {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 5rem;
        padding: 1rem;
        background-color: $color-primary-light;
        font-size: 1.6rem;
        z-index: 99;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);  
        transition: all 0.3s;

        &--running {
            background-color: $color-active;
        }

        &__input-name {

            height: 100%;
            width: 20rem;
            font-size: inherit;
            padding: 0.5rem;
            outline: none;
            border: solid 1px transparent;
        }

        &:hover {
            .new-task__input-name {
                border: solid 1px $color-primary-darker;
            } 
        }

        &__button {
            width: 10rem;
            border: none;
            color: #ffffff;
            cursor: pointer;
            &:focus {
                outline: none;
            }

            &--start {
                background-color: $color-highlight;//#00b6e3
            }
            &--stop {
                background-color: #e32d00
            }
        }
    }
</style>