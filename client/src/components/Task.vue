<template>
    <div class="task">
        <div class="task__details">
            <input class="task__details__name" type="text" v-model="name"/>
            <li class="task__details__project-name">{{project.name}}</li>
        </div>
        <div class="task__time">
            <input class="task__time-start" type="text" v-model="start"/>
            <span class="task__time-dash">-</span>
            <input class="task__time-end" type="text" v-model="end"/>
            <input class="task__time-date" type="date" v-model="date"/>
            <input class="task__time-duration" type="text" v-model="duration"/>            
        </div>
        <div class="task__actions">
            <i class="task__actions-play fas fa-play"></i>
            <i class="task__actions-delete fas fa-trash-alt"></i>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "Task 1",
            start: "2:15PM",
            end: "2:25PM",
            date: new Date(),
            duration: "00:10:00",
            id: "dasdsafds",
            project: {
                name: "Project 1"
            },
        }
    }
}
</script>

<style lang="scss">
    .task {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 5rem;
        padding: 1rem;
        background-color: $color-primary-light;
        font-size: 1.6rem;
        & input {
            height: 100%;
            width: 10rem;
            font-size:inherit;
            padding: 0.5rem;
            outline: none;
            border: solid 1px transparent;
        }

        &:hover {
            z-index: 99;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);  
             & input:not(.task__time-date) {
                border: solid 1px $color-primary-darker;
            } 
        }

        &__details {
            display: flex;
            &__name {
                margin-right: 1rem;
            }

            &__project-name {
                // margin-right: 1rem;
            }
        }
        &__time {
            // float:right;
            // margin: 0 1rem;

            // & input{
            //     &:hover, &:focus {
            //         border: solid 1px $color-primary-darker;
            //     }
            // }

            & > * {
                text-align: center;
            }

            &-start {
                
            }
            &-dash {
                padding: 0 1rem;
            }
            &-end {
                // margin-right: 1rem;
            }
            &-date {
                width: 5.5rem !important;
                margin: 0 1rem;
                &:hover, &:focus {
                    border: none !important;
                }
            }
        }

        &__actions {
            display: flex;
            width: 10rem;
            justify-content: space-around;
            align-items: center;
            & > * {
                cursor: pointer;
            }
        }    

       
    }
</style>