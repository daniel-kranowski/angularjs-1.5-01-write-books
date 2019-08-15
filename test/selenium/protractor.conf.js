// Protractor options.  These can also be overridden in Gruntfile.js: protractor:<task>:options:args.
// See more options and documentation in github angular/protractor docs/referenceConf.js or lib/config.ts.
exports.config = {
    // Drives a local browser GUI on the desktop, through a local selenium server spawned by protractor.
    directConnect: true,

    // Array of protractor input test files.  Relative to the location of this config.
    specs: [
        'app/*.ptor.js'
    ],

    exclude: [],

    // We'll define just one browser capability, and rely on defaults: no sharding, only one browser (count: 1).
    capabilities: {
        // Choices: 'chrome', 'firefox', 'internet explorer'.
        browserName: 'chrome',

        // Since Chrome 57, an infobar announces "Chrome is being controlled by automated test software."
        chromeOptions: {
            args: ['disable-infobars']
        }
    },

    // 'npm run web-start' hosts the angular app at this url.
    baseUrl: 'http://localhost:8080/',

    // Which element has the 'ng-app' attribute.
    rootElement: 'html',

    /*
        Notice we have FOUR timeout options!
        - allScriptsTimeout: Single wire-protocol action, a primitive used by the other three
        - getPageTimeout: URL page request
        - implicitlyWait: selenium-webdriver api method like click(), getText()
        - defaultTimeoutInterval: Entire Jasmine test
     */

    // How long protractor should allow the selenium server to run a single selenium wire-protocol script.
    // The protractor API functions exposed to us as e2e spec programmers are higher level than that.
    // Just the act of loading a URL could invoke multiple wire-protocol scripts.
    allScriptsTimeout: 11000,

    // How long to wait for a page to load.
    getPageTimeout: 10000,

    // Protractor calls this before running the first spec.
    // We'll make use of the protractor global object 'browser', and 'jasmine' is in scope too.
    onPrepare: function() {

        browser.manage().window().setSize(1000,750);

        // How long to wait for a selenium-webdriver API method: click(), getText(), etc
        browser.manage().timeouts().implicitlyWait(7000);

        const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: 'all'
            }
        }));
    },

    // We're using jasmine 2.x not 1.x
    framework: 'jasmine2',

    // Jasmine options are defined in protractor:lib/frameworks/jasmine.js (NOT jasmine-npm)
    jasmineNodeOpts: {

        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 30000,

        // Turn off protractor's builtin dot reporter.
        print: function() {}
    },


};