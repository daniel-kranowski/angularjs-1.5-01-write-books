'use strict';
const ptorUtils = require('./ptor-utils');

describe('Write Book:', () => {

    describe('Just snoop around and cancel:', () => {

        ptorUtils.beforeAllGetBaseUrl();

        it('navigate from dashboard to write view', () => {
            element(by.partialLinkText('Write')).click();
            return ptorUtils.expectViewIsWrite();
        });

        /**
         * Checks that the generate button is disabled.
         */
        function expectGenerateButtonIsDisabled() {
            return element(by.partialButtonText('Generate')).isEnabled().then(enabled => {
                expect(enabled).toBe(false);
            })
        }

        it('the Generate button is disabled', () => {
            return expectGenerateButtonIsDisabled();
        });

        it('whitespace title does not enable the button', () => {
            element(by.model('writeForm.title')).sendKeys('     ');
            element(by.model('writeForm.numChapters')).sendKeys(3);
            return expectGenerateButtonIsDisabled();
        });

        it('cancel and return to dashboard', () => {
            element(by.linkText('Cancel')).click();
            return ptorUtils.expectViewIsDashboard();
        });
    });

    describe('Write a book, then confirm it on the dashboard and read views:', () => {

        beforeAll(() => browser.get(browser.baseUrl + '#/write')); //Alternate way to get to the write view

        const TITLE = 'A New Book'; //Intentionally short, not trying to validate title truncation here.
        const NUM_CHAPTERS = 3;

        it('enter a valid title and number of chapters, click Generate', () => {
            element(by.model('writeForm.title')).sendKeys(TITLE);
            element(by.model('writeForm.numChapters')).sendKeys(NUM_CHAPTERS);
            return element(by.partialButtonText('Generate')).click();
        });

        it('we are in the read view, and we confirm the title and chapter count', () => {
            ptorUtils.expectViewIsRead();
            element(by.binding('book.mediumTitle')).getText().then(txt => {
                expect(txt).toBe(TITLE);
            });
            return element(by.css('[data-ng-pluralize]')).getText().then(txt => {
                expect(txt).toBe(NUM_CHAPTERS + ' chapters');
            });
        });

        it('return to the dashboard, which has a new book', () => {
            element(by.partialLinkText('Dashboard')).click();
            ptorUtils.expectViewIsDashboard();
            return element(by.css('[data-ng-pluralize]')).getText().then(txt => {
                expect(txt).toBe('5 books');
            });
        });

        it('click the dashboard book tile and it takes us to the same read view', () => {
            element(by.xpath('//li[contains(.,"' + TITLE + '")]')).click();
            ptorUtils.expectViewIsRead();
            return element(by.binding('book.mediumTitle')).getText().then(txt => {
                expect(txt).toBe(TITLE);
            });
        });
    });

});