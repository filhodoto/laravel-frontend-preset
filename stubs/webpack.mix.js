/**
 * The Laravel Mix configuration.
 */
const mix = require('laravel-mix');
const path = require('path');
const config = require('./webpack-scripts/config.js');

/**
 * Laravel mix options. When in production, extract css from Vue components. (Also takes care of minifying / post-css).
 */
mix.options({
    processCssUrls: true,
    uglify: {
        uglifyOptions: {
            compress: false
        }
    },
    extractVueStyles: mix.inProduction() ? config.css.output : false
});

/**
 * Apply global webpack config in mix. Expose global sass config and variables in Vue components and loaded sass files.
 */
mix.webpackConfig({
    resolve: {
        alias: {
            config: path.resolve(__dirname, `${config.css.root}/_config.scss`)
        }
    }
});

/**
 * Compile javascript assets and extract its vendors.
 */
mix.js(config.scripts.entry, config.scripts.output)
    .extract(config.scripts.vendors, config.scripts.outputVendors);

/**
 * Disable notifications
 * https://laravel.com/docs/5.5/mix#notifications
 */
mix.disableNotifications();

/**
 * Check if mix is running in production or development env.
 * In production environment apply file cache busting. Images are copied from the minification plugin.
 * In development environment apply source maps to files and copy image resources to public folder.
 * The 'devEntry' is a css file witch is intentionally left blank to overwrite the production build css from interfering
 * with the inline styles applied by js.
 */
if (mix.inProduction()) {
    mix.version();
} else {
    mix.copyDirectory(config.images.entry, config.images.output)
        .copy(config.css.devEntry, config.css.output)
        .sourceMaps();
}