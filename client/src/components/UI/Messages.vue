<template>
    <transition-group class="messages" name="list" tag="div">
        <app-message 
            v-for="message in messages" 
            :key="message.key"
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
            this.messages.push({success: newVal.success, text: newVal.msg, key: newVal.key});

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
        bottom: 6rem;
        right: 6rem;
        display: flex;
        flex-direction: column-reverse;
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