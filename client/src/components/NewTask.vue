<template>
    <div class="new-task">
        <input 
            class="new-task__input" 
            :disabled="this.started" 
            type="text" 
            v-model="newTask.name" 
            placeholder="Task Name"/>
        <app-project-menu 
            @selectProject="setProjectForNewTask" 
            @setNewProjectName="setNewProjectName"
            :newProjectName="newProjectName"/>
        <!-- <button class="new-task__add-project">
            <div v-if="newTask.projectName == 'No Project'">
                <i class="fas fa-plus-circle"></i>
                <span>Project</span>
            </div>
            <div v-else>
                {{newTask.projectName}}
            </div>
            
        </button> -->
        <div class="new-task__duration">{{formattedDuration}}</div>
        <!-- <div class="new-task__date">{{date}}</div> -->

        <button @click="startTime()" class="new-task__button new-task__button--start" v-if="!started">
            Start
        </button>
        <button @click="stopTime()" class="new-task__button new-task__button--stop" v-else>
            Stop
        </button>
    </div>
</template>

<script>
import ProjectMenu from './ProjectsMenu.vue';
import moment from 'moment';
import { mapActions, mapGetters, mapMutations } from 'vuex';


export default {
    // props: ['task'],
    components : {
        AppProjectMenu: ProjectMenu
    },
    data() {
        return {
            // name: "",
            started: false,
            duration: 0,
            start: null,
            end: null,
            // projectID: null,
            intervalID: null,
            taskID: null,
            newProjectName: ""
        }
    },
    computed: {
        ...mapGetters(['newTask']),
        formattedDuration() {
            // format duration from seconds to HH:MM:SS
            return new Date(this.duration * 1000).toISOString().substr(11, 8);
        },

    },
    
    // watch: {
    //     currrentTask(newVal, oldVal){
    //         if (newVal != oldVal) {
    //             // trigger event
    //         }
    //     }
    // },
    methods: {
        ...mapMutations(['resetNewTask', 'setNewTask']),
        async startTime() {
            if (this.newTask.name === '') return;
            this.started = true;
            this.newTask.start = moment();
            this.intervalID = setInterval(() => {
                this.duration += 1;
            }, 1000);
            // call api
            // const newTask = { 
            //     name: this.newTask.name,
            //     projectID: this.newTask.projectID,
            //     start: this.newTask.start.toDate()
            // }
            this.taskID = await this.createTask(this.newTask);

        }, 
        async stopTime() {
            this.started = false;
            // create end date
            // this.end = this.newTask.start.clone().add(this.duration, 'seconds');
            clearInterval(this.intervalID);
            this.intervalID = null;
            // make api call to update the task with the end date

            await this.updateTask({
                taskID: this.taskID,
                task: {end: this.newTask.start.clone().add(this.duration, 'seconds')}
            });

            this.duration= 0;
            this.taskID=null;
            this.intervalID= null;
            this.resetNewTask();

            // this.name= "";
            // this.start= null;
            // this.end= null;
            // this.projectID= null;
        },
        setProjectForNewTask(projectSelected) {
            this.setNewTask(projectSelected);
        },
        setNewProjectName(newName) {
            this.newProjectName = newName;
        },
        ...mapActions(['createTask', 'updateTask'])
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
            
        & input {

            height: 100%;
            width: 40%;
            font-size:inherit;
            padding: 0.5rem;
            outline: none;
            border: solid 1px transparent;
        }

        &:hover {
            & input {
                border: solid 1px $color-primary-darker;
            } 
        }

        &__add-project {
            cursor: pointer;
            border: none;
            background-color: transparent;
            width: 6rem;
            & > div {
                display: flex;
                align-items: center;
                justify-content: space-around;
            }
            
            &:hover span{
                text-decoration: underline;
            }
            &:focus {
                outline: none;
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
                background-color: #00b6e3
            }
            &--stop {
                background-color: #e32d00
            }
        }
    }
</style>