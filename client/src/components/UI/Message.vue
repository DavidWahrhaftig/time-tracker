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
            color: $color-success;
            background: $color-success-bg;
            border: 2px solid $color-success;
        }

        &--error {
            color: $color-error;
            background: $color-error-bg;
            border: 2px solid $color-error;
        }
    }
</style>