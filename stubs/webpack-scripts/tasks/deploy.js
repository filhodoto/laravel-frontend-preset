const Rsync = require('rsync');
const config = require('../config');
const path = require('path');

const { NODE_ENV } = process.env;
const envConfig = config.deploy[NODE_ENV];

const reset = `\x1b[0m`;
const red = `\x1b[31m`;
const green = `\x1b[32m`;

/**
 * Check if deployment credentials are filled.
 */
if (!envConfig || !envConfig.destination || envConfig.destination === '') {
    console.log(red, `Deployment details for ${NODE_ENV} are not yet entered.`, reset);
    return;
}

/**
 * Boot the deploy script and run it.
 */
const deploy = () => {
    // Base of project.
    const source = `${path.resolve(__dirname, './../../')}/`;

    // Do the same for the destination
    const destination = (/\/$/.test(envConfig.destination)) ? envConfig.destination : `${envConfig.destination}/`;

    // Merge the environment specific excludes with the global excludes
    const exclude = [...config.deployExcludes, ...envConfig.exclude];

    // Setup the Rsync instance
    const deploy = new Rsync.build({
        /**
         * Use the following flags:
         * -a (archive) for recursive deploy, preserving almost everything
         * -v (verbose) output in stdout
         * -z (compress) compress files using gzip
         */
        flags: 'avz',

        // the source directory to deploy from
        source,

        // shell program to use (equivalent of --rsh or -e)
        shell: 'ssh',

        // modify rights before deploying
        chmod: 'Dug=rwx,Do=rx,Fug=rwx,Fo=r',

        // when true, remote permissions will be the same as local permissions
        perms: true,

        // remove files on the server that are not on the local side
        delete: true,

        // Merge the current configuration with any environment specific configuration (see config.js)
        ...envConfig,

        // Exclude files that should not be copied, examples are Webpack related files, .DS_Store files or git files
        exclude,

        // The folder on the server to place the files
        destination,
    });

    // Execute Rsync script
    deploy.execute(onComplete, onProgress, onError);
};

const onProgress = (data) => {
    const parsedData = data.toString();
    console.log(parsedData);
};

const onComplete = () => {
    console.log(green, `Successfully completed deploy to ${NODE_ENV}.`, reset);
};

const onError = (err) => {
    throw new Error(err);
};

deploy();