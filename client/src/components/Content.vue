<template>
    <div class="content">
        <keep-alive>
            <router-view/>
        </keep-alive>
        <app-messages/>
    </div>

</template>

<script>
import Messages from '../components/UI/Messages.vue';
export default {
    components: {
        appMessages: Messages
    }
}
</script>

<style lang="scss">
    .content {
        padding: 4rem;
    }
</style>