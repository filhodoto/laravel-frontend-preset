const spawnCommand = require('../util/spawnCommand');
const skipYarn = process.argv.includes('--php');

const green = `\x1b[32m`;
const reset = `\x1b[0m`;

/**
 * Sequentially run setup tasks.
 */
const setup = () => {
    console.log(green, 'Setup started.', reset);

    if (skipYarn) {
        spawnCommand('composer', ['install', '--no-scripts'])
            .then(code => spawnCommand('php', ['artisan', 'key:generate']))
            .then(code => spawnCommand('composer', ['run-script', 'post-install-cmd']))
            .then(code => spawnCommand('php', ['artisan', 'client:setup']))
            .then(code => spawnCommand(`php`, [
                `artisan`,
                `vendor:publish`,
                `--provider="Frontend\\Client\\ClientServiceProvider"`,
                `--tag=public`
            ])) ;
    } else {
        spawnCommand('yarn')
            .then(code => spawnCommand('composer', ['install', '--no-scripts']))
            .then(code => spawnCommand('php', ['artisan', 'key:generate']))
            .then(code => spawnCommand('composer', ['run-script', 'post-install-cmd']))
            .then(code => spawnCommand('php', ['artisan', 'client:setup']))
            .then(code => spawnCommand(`php`, [
                `artisan`,
                `vendor:publish`,
                `--provider="Frontend\\Client\\ClientServiceProvider"`,
                `--tag=public`
            ])) ;
    }
};

setup();