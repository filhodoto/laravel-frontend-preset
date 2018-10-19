<?php

namespace FrontendPresets;

use Illuminate\Filesystem\Filesystem;
use Illuminate\Foundation\Console\Presets\Preset as FrontendPreset;
use Illuminate\Support\Arr;

class Preset extends FrontendPreset
{
    public static function install() {
        static::updatePackages();
        static::updateWebpack();
        static::updateResources();
    }

    /**
     * Update project packages
     * @param bool $packages
     */
    public static function updatePackageArray($packages) {
        // List of packages we want to remove from original laravel
        $unnecessaryPackages = [
            'popper.js',
            'lodash',
            'jquery',
            'bootstrap'
        ];

        // List of packages we want to add
        $newPackages = [
            'babel-preset-env' => '^1.7.0',
            'copy-webpack-plugin' => '^4.5.1',
            'rsync' => '^0.6.1',
            'path' => '^0.12.7',
            'normalize-scss' => '^7.0.1',
            'vue' => '^2.5.16',
            'vue-router' => '^3.0.1',
            'vuex' => '^3.0.1'
        ];

        return array_merge($newPackages, Arr::except($packages, $unnecessaryPackages));
    }

    /**
     * Update resources folder
     */
    public static function updateResources() {
        static::updateJavascript();
        static::updateStyles();
        static::updateImages();
        static::updateGitIgnore();
    }

    /**
     * Update Javascript folder
     */
    public static function updateJavascript() {
        // Delete older sass folder
        (new Filesystem)->deleteDirectory(resource_path('js'));

        // Add new
        (new Filesystem)->copyDirectory(__DIR__.'/stubs/scripts/', resource_path('scripts'));
    }

    /**
     * Update Images folder
     */
    public static function updateImages() {
        // Add new
        (new Filesystem)->copyDirectory(__DIR__.'/stubs/images/', resource_path('images'));
    }

    /**
     * Update Styles folder
     */
    public static function updateStyles() {
        // Delete older sass folder
        (new Filesystem)->deleteDirectory(resource_path('sass'));

        // Add new
        (new Filesystem)->copyDirectory(__DIR__.'/stubs/styles/', resource_path('styles'));
    }

    /**
     * Update .gitignore
     */
    public static function updateGitIgnore() {

        copy(__DIR__.'/stubs/.gitignore', base_path('.gitignore'));
    }

    /**
     * Update Webpack
     */
    public static function updateWebpack() {

        (new Filesystem)->copyDirectory(__DIR__.'/stubs/webpack-scripts/', base_path('webpack-scripts'));
        copy(__DIR__.'/stubs/webpack.config.js', base_path('webpack.config.js'));
        copy(__DIR__.'/stubs/webpack.mix.js', base_path('webpack.mix.js'));

    }
}
