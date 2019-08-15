// Karma options.  These can also be overridden in Gruntfile.js: karma:<task>:options.
module.exports = function(config) {
    config.set({

        // Let base path be the root dir of this project.
        basePath: '../..',

        frameworks: ['jasmine'],

        preprocessors: {
            'dist/build/app/**/*.html': ['ng-html2js'] // karma-ng-html2js-preprocessor
        },

        // karma-ng-html2js-preprocessor
        ngHtml2JsPreprocessor: {
            stripPrefix: 'dist/build/'
        },

        // Array of karma input files.
        files: [
            'node_modules/jquery/dist/jquery.min.js'  // Improves test features in angular.element
                                                      // so it must precede angular in the array of files
        ].concat(
            require('wiredep')().js  // Array of ordered bower deps
        ).concat([
            'node_modules/babel-polyfill/dist/polyfill.js', // Resolves "Can't find variable: Symbol"
            'dist/build/app/**/*.js',
            'dist/build/app/**/*.html', // karma-ng-html2js-preprocessor templateUrl directives
            'dist/unitTest/**/*.spec.js'
        ]),

        exclude: [],

        reporters: [
            'spec' // karma-spec-reporter
        ],

        // karma-spec-reporter
        specReporter: {
            suppressSkipped: true,
        },

        // LOG_DISABLE, LOG_ERROR, LOG_WARN, LOG_INFO, LOG_DEBUG.
        logLevel: config.LOG_INFO,

        autoWatch: false,

        // Choices: Phantom, Chrome, Firefox, etc.  Phantom is lightweight and headless; as of 2.1.1 it requires ES5.
        browsers: ['PhantomJS'],

        // true: capture browsers, run tests and exit.
        // false: keep karma server alive for debugging at localhost:9876/debug.html
        singleRun: true
    });
};
