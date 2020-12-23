<template>
    <div class="task">
        <div class="task__details">
            <input class="task__details__name" type="text" @change="updateName" :value="task.taskName"/>
            <li class="task__details__project-name">
                <span>{{task.projectName}}</span>
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
            <!-- <i class="task__actions-save fas fa-save"></i> -->
            <i class="task__actions-clone fas fa-clone" @click="setNewTask({name: task.taskName, projectID: task.projectID, projectName: task.projectName})"></i>
            <i class="task__actions-delete fas fa-trash-alt" @click="deleteTask(task.taskID)"></i>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import moment from 'moment';

export default {
    props: ['task'],
    data() {
        return {
        }
    },
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
            const durationValue = moment.duration(this.task.duration*1000, 'milliseconds');
            const hours = Math.floor(durationValue.asHours());
            const mins = Math.floor(durationValue.asMinutes()) - hours * 60;
            const secs = Math.floor(durationValue.asSeconds()) - hours * 60 * 60 - mins * 60;
            // console.log("hh:" + hours + "mm:" + mins + "ss" + sec);
            const durationString = `${('0' + hours % 60).slice(-2)}:${('0' + mins % 60).slice(-2)}:${('0' + secs % 60).slice(-2)}`
            return durationString;
            // return new Date(this.task.duration * 1000).toISOString().substr(11, 8)
        },
    },
    methods: {
        ...mapMutations(['setNewTask']),
        ...mapActions(['deleteTask', 'updateTask']),
        async updateDuration($event) {
            // console.log($event.target.value);
            const stringDuration = $event.target.value; // hh:mm:ss
            const splitDuration = stringDuration.split(':'); // split it at the colons

            // minutes are worth 60 seconds. Hours are worth 60 minutes.
            console.log(splitDuration);
            const seconds = (+splitDuration[0]) * 60 * 60 + (+splitDuration[1]) * 60 + (+splitDuration[2]); 
            // console.log('new duration in sec', seconds);
            this.task.duration = seconds;

            const endUpated = this.task.start.clone().add(seconds, 'seconds');
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
            console.log(fullDayTime);
            
            const newStart = moment(this.dateFormatted + ' ' + fullDayTime);
            console.log('new Start', newStart.format('YYYY-MM-DD HH:mm:ss'));
            const isEndNextDay = this.task.end.diff(newStart) >= 0 ? false : true;
            const newEnd = isEndNextDay ? this.task.end.clone().add(1, 'day') : this.task.end;
            console.log('new End', newEnd.format('YYYY-MM-DD HH:mm:ss'));

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
            console.log(fullDayTime);
            
            let newEnd = moment(this.task.end.format('YYYY-MM-DD') + ' ' + fullDayTime);
            console.log('start', this.task.start.format('YYYY-MM-DD HH:mm:ss'));
            console.log('new End', newEnd.format('YYYY-MM-DD HH:mm:ss'));
            const isEndBeforeStart = newEnd.diff(this.task.start) >= 0 ? false : true;
            // let newStart = this.task.start;
            if (isEndBeforeStart) {
                newEnd = this.task.end.clone().add(1, 'day');
            }
            console.log('new End', newEnd.format('YYYY-MM-DD HH:mm:ss'));

            await this.updateTask({
                taskID: this.task.taskID,
                task: {
                    start: this.task.start,
                    end: newEnd
                }
            });
        },
        async updateName($event) {
            await this.updateTask({
                taskID: this.task.taskID,
                task: {
                    name: $event.target.value
                }
            });
        },
        async updateDate($event) {
            console.log($event.target.value);
            // create new start 
            const dateString = $event.target.value;
            const newStart = moment(dateString + ' ' + this.task.start.format('HH:mm:ss'));
            console.log('new start', newStart);
            // create new end
            const newEnd = newStart.clone().add(this.task.duration, 'seconds');
            console.log('new end', newEnd.format('YYYY-MM-DD HH:mm:ss'));
            await this.updateTask({
                taskID: this.task.taskID,
                task: {
                    start: newStart,
                    end: newEnd
                }
            });
        }
    },
    // created() {
    //     this.task = this.task
    // }
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
            //  & input:not(.task__time-date) {
             & input {
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
                & span {
                    position: relative;
                    left: -10px;
                }
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

            &-start, &-end {
                // font-size: 1rem;
            }
            &-dash {
                padding: 0 0.5rem;
            }

            &-date {
                // width: 10rem !important;
                // font-size:
                margin: 0 1rem;
                &:hover, &:focus {
                    // border: none !important;
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