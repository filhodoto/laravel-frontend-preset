const { spawn } = require('child_process');

const reset = `\x1b[0m`;
const green = `\x1b[32m`;
const red = `\x1b[31m`;

/**
 * Spawns a cl command and returns a Promise. std events are automatically logged to the console.
 * See https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
 * @param command {string} the command name
 * @param args {?string[]} optional arguments to call the command with
 * @param options {object} options to add to the `spawn` command.
 * @returns {Promise}
 */
module.exports = (command, args = [], options = {
    stdio: [0, 1, 2],
}) => {
    const cmdStr = `${command} ${args.join(' ')}`;
    const promise = new Promise((resolve, reject) => {
        console.log(green, `\n➜ Starting ${cmdStr}\n`, reset);

        const proc = spawn(command, args, options);

        proc.on('close', (code) => {
            if (code !== 0) {
                const errMsg = `\nError during \`${cmdStr}\`. Exit code: ${code}\n`;
                console.log(red, errMsg, reset);
                reject(code);
            }

            console.log(green, `\nSuccessfully finished ${cmdStr}\n`, reset);
            resolve(code);
        });
    });

    promise.catch(err => {
        throw new Error(err);
    });

    return promise;
};