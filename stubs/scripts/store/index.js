import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';

/**
 * Tell Vue to implement Vuex.
 */
Vue.use(Vuex);

/**
 * Vuex store object, globally accessible by every component in the application.
 * add modules like this to enable clear separation of modules.
 * @type {Store}
 */
const Store = new Vuex.Store({
    modules: {
        app,
    },
});

export default Store;