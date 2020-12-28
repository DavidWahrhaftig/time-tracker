<template>
    <div class="project">
        <!-- <a href="#0">Widgets</a> -->
        <button class="project__button-add">
            <!-- <div v-if="selectedTask.projectName == 'No Project'"> -->
            <i class="fas fa-plus-circle plus-icon" v-if="newTask.project.name === 'No Project'"></i>
            <span class="project__name">
                {{newTask.project.name === 'No Project' ? 'Project' : newTask.project.name}}
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
                :style="{color: project.color}"
                @click="setSelectedProject(project)">
                    {{ project.name}}
            </li>
            <li class="project__item project__item--new-project">
                <input 
                    type="text" 
                    placeholder="New Project"
                    class="project__input-new-name" 
                    v-model="newProjectName"/>
                <input 
                    type="color"
                    class="project__input-new-color"
                    v-model="newProjectColor"/>
                <button class="project__new-button-submit" @click="createNewProject">
                    <i class="fas fa-plus-circle plus-icon"/>Create
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
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
        ...mapActions(['createProject']),
        async createNewProject() {
            // this.$emit('setNewProjectName', $event.target.value);

            const newProject = {
                name: this.newProjectName,
                color: this.newProjectColor
            }
            // create new project 
            await this.createProject(newProject); 
            this.setNewTask({project: newProject});
            
            // reset project new and color 
            this.newProjectName = "";
            this.newProjectColor = "#000000";
            // close dropdown
        },
        setSelectedProject(project) {
            this.setNewTask({project});
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

            &--new-project {
                // background-color: $color-logo;
            }
            
            // & input {
            //     width: 100%;
            // }

            &:hover {
                // background-color: pink;
                background-color: $color-highlight;
                color:white;

                .project__new-button-submit, .project__input-new-color {
                    display: block;
                }
            }
        }

        &__input {
            &-new-name {
                // width: 75%;
                height: 100%;
                // width: 20rem;
                width: 100%;
                font-size: inherit;
                padding: 0.5rem;
                outline: none;
                border: solid 1px transparent;
                // display: none;
            }
            &-new-color {
                margin: 0.5rem 0;
                width: 100%;
                cursor: pointer;
                outline: none;
                display: none;
            }
        }

        &__new-button-submit {
            width: 100%;
            padding: 0.5rem;
            border: none;
            background-color: $color-primary-dark;
            cursor: pointer;
            display: none;
            & > * {
                margin-right: 0.5rem;
            }
            
            &:hover {
                background-color: $color-primary-darker;
            }
            &:focus{
                outline: none;
            }
        }

        
        // &:hover ul{
        //     display:block;
        //     width: 15rem;
        // }
    }

    
</style>