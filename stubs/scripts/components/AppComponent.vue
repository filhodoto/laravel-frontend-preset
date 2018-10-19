<template>
    <div id="app-component">
        <main class="app-content">
            <router-view>
                Loading...
            </router-view>
        </main>
    </div>
</template>

<script>
    export default {
        /**
         * Component name.
         */
        name: 'AppComponent',

        /**
         * Component sub components.
         */
        components: {
        },

        /**
         * Called after the component was created. Fetch site translations.
         */
        created() {
        }
    }
</script>

<style lang="scss">
    @import "~config";
    // Bootstrap all main styles.
    @import "../../styles/main.scss";

</style>