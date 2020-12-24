<template>
    <transition-group class="messages" name="list" tag="div">
        <app-message 
            v-for="(message, index) in messages" 
            :key="index"
            :message="message.text"
            :success="message.success"/>
    </transition-group>
</template>

<script>
import { mapGetters } from 'vuex';
import Message from './Message';
export default {
    components: {
        appMessage: Message
    },
    data() {
        return {
            messages: []
        }
    },
    computed: {
        ...mapGetters(['serverFeedback'])
    },
    watch: {
        serverFeedback(newVal) {
            // console.log('[new Val]', newVal);
            this.messages.push({success: newVal.success, text: newVal.msg});

            setTimeout(() => {
                this.messages.shift();
            }, 5000);
        }
    }
}
</script>

<style lang="scss">
    .messages {
        position: fixed;
        bottom: 4rem;
        right: 4rem;
        // vertical-align: bottom;
        display: flex;
        flex-direction: column-reverse;
        // padding: 4rem;
        & > *:not(:last-child) {
            margin-top: 1rem;
        }
    }

    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }
    .list-enter {//, .list-leave-to /* .list-leave-active below version 2.1.8 */
        opacity: 0;
        transform: translateY(30px);
    }
    .list-leave-to {
        opacity: 0;
        // transform: translateY(-20px);
    }
</style>