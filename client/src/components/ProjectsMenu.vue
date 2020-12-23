<template>
    <div class="project-menu">
        <!-- <a href="#0">Widgets</a> -->
        <button class="project-menu__add-project">
            <!-- <div v-if="selectedTask.projectName == 'No Project'"> -->
            <i class="fas fa-plus-circle plus-icon" v-if="newTask.projectName === 'No Project'"></i>
            <span class="project-name">
                {{newTask.projectName === 'No Project' ? 'Project' : newTask.projectName}}
            </span>
            <!-- <div v-else>
                {{selectedTask.projectName}}
            </div> -->
        </button>
        <ul class="sub-menu">
            <li  
                v-for="project in projects" 
                :key="project._id"
                @click="setSelectedProject(project.name, project._id)">
                    {{ project.name}}
            </li>
            <li class="sub-menu__item">
                <input 
                    type="text" 
                    placeholder="New Project" 
                    @change="setNewProjectName"
                    v-model="newProjectName"/>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return {
            newProjectName: ""
        }
    },
    computed: {
        ...mapGetters(['projects', 'newTask']),
    }, 
    methods: {
        ...mapMutations(['setNewTask']),
        setNewProjectName($event) {
            // this.$emit('setNewProjectName', $event.target.value);
            this.setNewTask({projectName: $event.target.value, projectID: null});
            this.newProjectName = "";
        },
        setSelectedProject(projectName, projectID) {
            this.setNewTask({projectName, projectID});
        }
    }
}
</script>

<style lang="scss">
    .project-menu { 
        width: 10rem;
        position: relative;
        &__add-project {
            cursor: pointer;
            border: none;
            background-color: transparent;
            // width: 10rem;
            text-align: left;
            &:focus {
                outline: none;
            }
            
            .project-name {
                padding-left:  0.5rem ;
            }
        }   

        & > ul { // dropdown
            margin: 0;
            padding: 0;
            display: none;
            position:absolute;
            left:0; 

            top: 30px;
            background-color: $color-primary-dark;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);  
        
            // z-index: 300;

             & li { // project item
                list-style:none;
                display:list-item;
                width:100%;
                padding: 0.5rem 1rem;
                cursor: pointer;
                
                & input {
                    width: 100%;
                }

                &:hover {
                    background-color: pink;
                }
             }
        }

        &:hover ul{
            display:block;
            width: 15rem;
        }
    }
    
</style>