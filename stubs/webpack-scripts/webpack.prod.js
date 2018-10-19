const mixConfig = require('../node_modules/laravel-mix/setup/webpack.config.js');
const config = require('./config.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');

/**
 * Custom webpack config for production env.
 */
const prodConfig = {
    plugins: [
        ...mixConfig.plugins,
        new CopyWebpackPlugin([{
            from: config.images.entry,
            to: config.images.output.replace('public/', '')
        }]),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            plugins: [
                imageminMozjpeg({
                    quality: config.images.quality
                })
            ]
        })
    ]
};

/**
 * Export combined config
 */
module.exports = {
    ...mixConfig,
    ...prodConfig
};