const mixConfig = require('../node_modules/laravel-mix/setup/webpack.config.js');

/**
 * Custom webpack config for development env.
 */
const devConfig = {

};

/**
 * Export combined config
 */
module.exports = {
    ...mixConfig,
    ...devConfig
};