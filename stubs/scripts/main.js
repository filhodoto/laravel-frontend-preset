import Vue from 'vue';
import Router from './router';
import Store from './store';
import AppComponent from './components/AppComponent.vue';
import {i18n} from './mixins/I18nMixin';


/**
 * Add i18n mixin. Mixin's make methods globally accessible from within any component.
 */
Vue.mixin({
    methods: {
        i18n
    }
});

/**
 * Init root Vue component.
 */
new Vue({
    el: '#app',
    router: Router,
    store: Store,
    render: app => app(AppComponent),
});