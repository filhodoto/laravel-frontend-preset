module.exports = {
    /**
     * JS entry and output configuration. Add additional dependencies to 'vendors' to let them be extracted to vendor.js.
     */
    scripts: {
        entry: 'resources/scripts/main.js',
        output: 'public/assets/scripts/app.js',
        outputVendors: 'public/assets/scripts/vendor.js',
        vendors: [
            'vue',
            'vuex',
            'vue-router'
        ]
    },

    /**
     * CSS entry en output configuration.
     */
    css: {
        devEntry: 'resources/styles/main.scss',
        output: 'public/assets/css/app.css',
        root: 'resources/styles/'
    },

    /**
     * Images entry, output and minification quality configuration.
     */
    images: {
        entry: 'resources/images',
        output: 'public/assets/images',
        quality: 60
    },

    /**
     * Deployment configuration. Specify your environments and their related data such as the server location,
     * login username and output folder.
     */
    deploy: {
        staging: {
            destination: '',
            exclude: [],
        },
        acceptance: {
            destination: '',
            exclude: [],
        },
        production: {
            destination: '',
            exclude: [],
        },
    },

    /**
     * Files that are excluded from deployments.
     */
    deployExcludes: [
        // Generated files
        '.DS_Store',
        'yarn.lock',
        'composer.lock',
        'yarn-error.log',
        'manifest',
        '.git',
        '.idea',
        '_ide_helper.php',
        '.phpstorm.meta.php',
        'logs',
        'storage',
        'mix-manifest.json',

        // Config files
        '.gitattributes',
        '.babelrc',
        '.env',
        '.env.example',
        '.env.acceptance',
        '.env.local',
        '.env.production',
        '.env.staging',
        '.gitignore',
        'composer.json',
        'package.json',
        'phpunit.xml',
        'mix.manifest.json',
        'webpack.config.js',
        'webpack.mix.js',
        '.eslintrc.json',

        // Folders
        'node_modules',
        '/public/media',
        '/public/storage',
        '/database/sql',
        '/resources/fonts',
        '/resources/images',
        '/resources/scripts',
        '/resources/styles',
        '/scripts'
    ]
};