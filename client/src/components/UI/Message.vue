<template>
    <div class="message" :class="success ? 'message--success' : 'message--error'"> 
        {{message}}
    </div>
</template>

<script>
export default {
    props:['message', 'success'],
    data() {
        return {
            isSuccess: false
        }
    }

}
</script>

<style lang="scss">
    .message {
        width: 20rem;
        font-size: 1.8rem;
        // background-color: $color-primary-light;
        text-align: center;
        border-radius: 0.2rem;
        // z-index: 99;
        // display: inline-block;
        &--success {
            color: #2b7515;
            background: #ecffd6;
            border: 2px solid #617c42;
        }

        &--error {
            color: #ba3939;
            background: #ffe0e0;
            border: 2px solid #a33a3a;
        }
    }
</style>