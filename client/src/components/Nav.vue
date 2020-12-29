<template>
    <nav class="nav">
        <h1 class="nav__logo">Time Tracker</h1>
        <router-link 
            class="nav__link" 
            :class="{'nav__link--current': $route.path === '/'}" 
            to="/">
            Tasks Hub
        </router-link>
        <router-link 
            class="nav__link" 
            :class="{'nav__link--current': $route.path === '/dashboard'}" 
            to="/dashboard">
            Dashboard
        </router-link>
    </nav>
</template>

<script>
export default {

}
</script>

<style lang="scss">
    .nav {
        &__logo {
            padding: 2rem;
            color: $color-logo;
        }

        &__link {
            display: block;
            font-size: 1.8rem;
            text-decoration: none;
            color: #2c3e50;
            padding: 1rem 4.5rem;
            transition: all 0.4s;
            &--current {
                background-color: $color-primary-darker;
                color: #2c3e50;
            }
        }
    }

</style>