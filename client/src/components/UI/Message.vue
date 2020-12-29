<template>
    <div class="message" :class="success ? 'message--success' : 'message--error'"> 
        {{ message }}
    </div>
</template>

<script>
export default {
    props:['message', 'success'],
}
</script>

<style lang="scss">
    .message {
        width: 24rem;
        font-size: 2rem;
        text-align: center;
        border-radius: 0.2rem;
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
