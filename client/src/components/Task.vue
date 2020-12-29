<template>
    <div class="task">
        <div class="task__details">
            <!-- Task name input -->
            <input class="task__details__name" type="text" @change="updateName" :value="task.taskName"/>
            <!-- Project Name -->
            <li class="task__details__project-name" :style="{color: task.project.color}">
                <span>{{ task.project.name }}</span>
            </li>
        </div>
        <div class="task__time">
            <input class="task__time-start" type="text" @change="updateStart" :value="startTimeFormatted"/>
            <span class="task__time-dash">-</span>
            <input class="task__time-end" type="text" @change="updateEnd" :value="endTimeFormatted"/>
            <input class="task__time-date" type="date" @change="updateDate" :value="dateFormatted"/>
            <input class="task__time-duration" type="text" @change="updateDuration" :value="durationFormatted"/>            
        </div>
        <div class="task__actions">
            <!-- clone task -->
            <i class="task__actions-clone fas fa-clone" @click="setNewTask({name: task.taskName, project: task.project})"></i>
            <!-- delete task -->
            <i class="task__actions-delete fas fa-trash-alt" @click="deleteTask(task.taskID)"></i>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import moment from 'moment';

export default {
    props: ['task'],
    computed: {
        startTimeFormatted() {
            return this.task.start.format('hh:mm A');
        },
        endTimeFormatted() {
            return this.task.end.format('hh:mm A');
        },
        dateFormatted() {
            return this.task.start.format('YYYY-MM-DD');
        },
        durationFormatted() {
            // display in hh:mm:ss
            const totalDuration = moment.duration(this.task.duration, 'seconds');
            const hours = Math.floor(totalDuration.asHours());
            const mins = Math.floor(totalDuration.asMinutes()) - (hours * 60);
            const secs = totalDuration.asSeconds() - (hours * 60 * 60) - (mins * 60);
            const durationString = `${('0' + hours % 60).slice(-2)}:${('0' + mins % 60).slice(-2)}:${('0' + secs % 60).slice(-2)}`
            return durationString;
        },
    },
    methods: {
        ...mapMutations(['setNewTask']),
        ...mapActions(['deleteTask', 'updateTask']),
        async updateDuration($event) {

            const stringDuration = $event.target.value; // hh:mm:ss
            const splitDuration = stringDuration.split(':'); // split it at the colons

            // minutes are worth 60 seconds. Hours are worth 60 minutes.
            // convert to numbers and then convert the units to seconds
            const seconds = (+splitDuration[0]) * 60 * 60 + (+splitDuration[1]) * 60 + (+splitDuration[2]); 

            this.task.duration = seconds;

            const endUpated = this.task.start.clone().add(seconds, 'seconds');
            // api call to update the task
            await this.updateTask({
                taskID: this.task.taskID,
                task: {
                    end: endUpated
                }
            });
        },
        async updateStart($event) {
            const time = $event.target.value;

            let AMPM = time.slice(-2);
            let timeArr = time.slice(0, -2).split(":");
            if (AMPM === "AM" && timeArr[0] === "12") {
                // catching edge-case of 12AM
                timeArr[0] = "00";
            } else if (AMPM === "PM") {
                // everything with PM can just be mod'd and added with 12 - the max will be 23
                timeArr[0] = (timeArr[0] % 12) + 12
            }  
            const fullDayTime = timeArr.join(":").replace(' ', '') + ':' + this.task.start.format('ss');
            
            // start moment object formatted from 'YYYY-MM-DD HH:mm:ss'
            const newStart = moment(this.dateFormatted + ' ' + fullDayTime);
            const isEndNextDay = this.task.end.diff(newStart) >= 0 ? false : true;
            // create new end based on the previous end and whether it should be in the next day or not
            const newEnd = isEndNextDay ? this.task.end.clone().add(1, 'day') : this.task.end;

            // api call to update task
            await this.updateTask({
                taskID: this.task.taskID,
                task: {
                    start: newStart,
                    end: newEnd
                }
            });
        },
        async updateEnd($event) {
            const time = $event.target.value;
            let AMPM = time.slice(-2);
            let timeArr = time.slice(0, -2).split(":");
            if (AMPM === "AM" && timeArr[0] === "12") {
                // catching edge-case of 12AM
                timeArr[0] = "00";
            } else if (AMPM === "PM") {
                // everything with PM can just be mod'd and added with 12 - the max will be 23
                timeArr[0] = (timeArr[0] % 12) + 12
            }  
            const fullDayTime = timeArr.join(":").replace(' ', '') + ':' + this.task.end.format('ss');
            
            // end moment object formatted from 'YYYY-MM-DD HH:mm:ss'
            let newEnd = moment(this.task.end.format('YYYY-MM-DD') + ' ' + fullDayTime);

            const isEndBeforeStart = newEnd.diff(this.task.start) >= 0 ? false : true;
            if (isEndBeforeStart) {
                // add a day to end moment when the new end is before the start moment
                newEnd = this.task.end.clone().add(1, 'day');
            }

            // api call to update task
            await this.updateTask({
                taskID: this.task.taskID,
                task: {
                    start: this.task.start,
                    end: newEnd
                }
            });
        },
        async updateName($event) {
            // api call to update task
            await this.updateTask({
                taskID: this.task.taskID,
                task: {
                    name: $event.target.value
                }
            });
        },
        async updateDate($event) {
            const dateString = $event.target.value;
            // create new start 

            // retrieve the HH:mm:ss and with the new date create a new moment from both
            const newStart = moment(dateString + ' ' + this.task.start.format('HH:mm:ss'));
            // create new end by adding the previous duration to the new start date
            const newEnd = newStart.clone().add(this.task.duration, 'seconds');
            // api call to update task
            await this.updateTask({
                taskID: this.task.taskID,
                task: {
                    start: newStart,
                    end: newEnd
                }
            });
        }
    }
}
</script>

<style lang="scss">
    .task {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 6rem;
        padding: 1rem;
        background-color: $color-primary-light;
        font-size: 1.6rem;

        & input {
            height: 100%;
            
            font-size: 1.5rem;
            padding: 0.5rem;
            outline: none;
            border: solid 1px transparent;
        }

        & input[type=text] {
           width: 8rem;
        }

        &:hover {
            z-index: 99;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);  
             & input {
                border: solid 1px $color-primary-darker;
            } 
        }

        &__details {
            display: flex;
            &__name {
                margin-right: 1rem;
                width: 12rem !important;
            }

            &__project-name {
                // margin-right: 1rem;
                margin: auto 0;
                width: 13rem;
                & span {
                    position: relative;
                    left: -10px;
                }
            }
        }
        &__time {
            & > * {
                text-align: center;
            }

            &-start, &-end {
                // font-size: 1rem;
            }
            &-dash {
                padding: 0 0.5rem;
            }

            &-date {
                font-family: inherit;
                
                margin: 0 1rem;
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
