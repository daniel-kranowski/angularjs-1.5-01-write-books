'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.config.init({

        clean: { // grunt-contrib-clean
            all: [
                'node_modules',
                'dist'
            ]
        },

        babel: { // grunt-babel
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['**/*.js'],
                        dest: 'dist/build',
                    }
                ]
            },
            unitTest: {
                files: [
                    {
                        expand: true,
                        cwd: 'test/unit',
                        src: ['**/*.js'],
                        dest: 'dist/unitTest',
                    }
                ]
            }
            // We transpile the unitTest spec.js because it runs in PhantomJS, which only knows ES5.
            // No need to babelize seleniumTest, whose spec.js runs in NodeJS which supports ES6 just fine.
        },

        copy: { // grunt-contrib-copy
            build: {
                files: [
                    {
                        src: 'src/index.template.html',
                        dest: 'dist/build/index.html'
                    },
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['app/**/*.html'],
                        dest: 'dist/build/'
                    },
                ]
            }
        },

        less: { // grunt-contrib-less
            build: {
                options: {
                    sourceMap: true
                },
                files: [
                    {
                        src: 'src/app/app.less',
                        dest: 'dist/build/app/app.css'
                    }
                ]
            }
        },

        wiredep: { // grunt-wiredep: insert <script> and <link> tags for bower_components
            build: {
                src: 'dist/build/index.html'
            }
        },

        fileblocks: { // grunt-file-blocks: insert <script> and <link> tags for the app's js and css
            options: {
                cwd: 'dist/build'
            },
            build: {
                src: 'dist/build/index.html',
                blocks: {
                    cssBlock: {
                        src: 'app/**/*.css'
                    },
                    jsBlock: {
                        src: 'app/**/*.js'
                    }
                }
            }
        },

        karma: { // grunt-karma
            unitTest: {
                configFile: 'dist/unitTest/karma.conf.js',
            }
        },

        protractor: { // grunt-protractor-runner
            seleniumTest: {
                options: {
                    configFile: 'test/selenium/protractor.conf.js',
                }
            }
        }
    });

    grunt.task.registerTask('build', [
        'babel:build',
        'copy',
        'less',
        'wiredep',
        'fileblocks'
    ]);

    grunt.task.registerTask('unitTest', [
        'build',
        'babel:unitTest',
        'karma'
    ]);

    grunt.task.registerTask('seleniumTest', [
        //Before coming here, do 'npm run webdriver-manager-update' and 'npm run web-start'
        'protractor'
    ]);
};
