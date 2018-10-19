import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeComponent from './components/pages/HomeComponent';

/**
 * Tell Vue to implement Vue router.
 */
Vue.use(VueRouter);

/**
 * Register routes and component to render.
 */
const routes = [
    {
        name: 'Home',
        path: '/',
        component: HomeComponent
    }
];

/**
 * Create Router instance.
 */
const Router = new VueRouter({
    mode: 'history',
    routes,
});

export default Router;