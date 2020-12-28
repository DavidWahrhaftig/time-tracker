<template>
    <div class="project">
        <!-- <a href="#0">Widgets</a> -->
        <button class="project__button-add">
            <!-- <div v-if="selectedTask.projectName == 'No Project'"> -->
            <i class="fas fa-plus-circle plus-icon" v-if="newTask.projectName === 'No Project'"></i>
            <span class="project__name">
                {{newTask.projectName === 'No Project' ? 'Project' : newTask.projectName}}
            </span>
            <!-- <div v-else>
                {{selectedTask.projectName}}
            </div> -->
        </button>
        <ul class="project__dropdown">
            <li 
                class="project__item"
                v-for="project in projects" 
                :key="project._id"
                @click="setSelectedProject(project.name, project._id)">
                    {{ project.name}}
            </li>
            <li class="project__item">
                <input 
                    type="text" 
                    placeholder="New Project"
                    class="project__input-new-name" 
                    @change="setNewProjectName"
                    :value="newProjectName"/>
                <!-- <input 
                    type="color"
                    class="project__input-new-color"
                    v-model="newProjectColor"/>
                <button class="project__new-button-submit">
                    <i class="fas fa-plus-circle plus-icon"/>Create
                </button> -->
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return {
            newProjectName: "",
            newProjectColor: "#000000"
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
    .project { 
        width: 10rem;
        position: relative;
        &__button-add {
            cursor: pointer;
            border: none;
            background-color: transparent;
            font-size: 1.5rem;
            color: $color-highlight;
            // width: 10rem;
            text-align: left;
            &:focus {
                outline: none;
            }
            
            .project__name {
                padding-left:  0.5rem ;
            }
        }

        &:hover &__dropdown {
            display:block;
        }

        &__dropdown{ // dropdown
            margin: 0;
            padding: 0;
            display: none;
            position:absolute;
            left:0;
            width: 15rem;

            top: 30px;
            background-color: $color-primary-dark;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }

        &__item{ // project item
            list-style:none;
            display:list-item;
            width:100%;
            padding: 0.5rem 1rem;
            cursor: pointer;
            
            // & input {
            //     width: 100%;
            // }

            &:hover {
                // background-color: pink;
                background-color: $color-highlight;
                color:white;
            }
        }

        &__input {
            &-new-name {
                // width: 75%;
                // width: 100%;
            }
            &-new-color {
                width: 25%;
            }
        }

        
        // &:hover ul{
        //     display:block;
        //     width: 15rem;
        // }
    }

    
</style>