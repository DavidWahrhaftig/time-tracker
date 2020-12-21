<template>
    <div class="new-task">
        <input class="new-task__input" type="text" v-model="name"/>
        <button class="new-task__add-project">
            <i class="fas fa-plus-circle"></i>
            <span>Project</span>
        </button>
        <div class="new-task__duration">{{duration}}</div>
        <button class="new-task__button new-task__button--start" v-if="!started">
            Start
        </button>
        <button class="new-task__button new-task__button--stop" v-else>
            Stop
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "New Task",
            duration: "00:00:00",
            started: true,
        }
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
            width: 60%;
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
            display: flex;
            align-items: center;
            justify-content: space-around;
            &:hover > span{
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