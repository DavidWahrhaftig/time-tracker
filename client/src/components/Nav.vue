<template>
    <nav class="nav">
        <h1 class="nav__logo">Time Tracker</h1>
        <router-link class="nav__link" :class="{'nav__link-current': $route.path === '/'}" to="/">Tasks</router-link>
        <router-link class="nav__link" :class="{'nav__link-current': $route.path === '/dashboard'}" to="/dashboard">Dashboard</router-link>
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
            // width: 60%;
            display: block;
            font-size: 1.8rem;
            text-decoration: none;
            color: #2c3e50;
            padding: 1rem 4.5rem;
            // border-radius: $edge-roundness;
            // background-color: $color-primary;
            // display: inline-block;
            // margin-right: .7rem;
            // margin-bottom: 2rem;
            transition: all 0.4s;
            &-current {
                // background-color: $color-secondary;
                // color: $color-white;

                // background-color: $color-grey-light;
                // color: $color-primary;
                background-color: $color-primary-darker;//$color-grey-light;
                color: #2c3e50;
            }
        }
    }

</style>