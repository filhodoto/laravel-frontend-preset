/**
 * This file is just a proxy to the main webpack configurations that are located in the scripts folder.
 */
if (process.env.NODE_ENV === 'development') {
    module.exports = require('./scripts/webpack.dev');
} else {
    module.exports = require('./scripts/webpack.prod');
}