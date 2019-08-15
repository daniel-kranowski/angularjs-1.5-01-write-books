'use strict';
const ptorUtils = require('./ptor-utils');
const EC = protractor.ExpectedConditions;

describe('Read Page:', () => {

    describe('Flip through first book:', () => {

        ptorUtils.beforeAllGetBaseUrl();

        it('navigate from dashboard to read first book', () => {
            element(by.css('li:first-of-type')).click();
            return ptorUtils.expectViewIsRead();
        });

        it('has expected title with no ellipses', () => {
            return element(by.binding('book.mediumTitle')).getText().then(txt => {
                expect(txt).toBe('Journey to the Center of the Earth');
            });
        });

        it('has 3 chapters', () => {
            return element(by.css('[data-ng-pluralize]')).getText().then(txt => {
                expect(txt).toBe('3 chapters');
            });
        });

        /**
         * Checks that the page (left or right, according to pageClass) contains only an empty .page element.
         */
        function expectPageIsBlank(pageClass) {
            return element.all(by.css(pageClass + ' *')).count().then(cnt => {
                expect(cnt).toBe(1); // .page is the only descendant of the pageClass element
            });
        }

        it('left page is blank - i.e. has no dom children under .page', () => {
            return expectPageIsBlank('.leftPage');
        });

        /**
         * Checks that the page (left or right, according to pageClass) has the expected page number and
         * has some paragraphs.  Waits til the pageNum is available.  Returns the page element.
         */
        function expectPageNumAndParagraphs(pageClass, expectedPageNum) {
            const page = element(by.css(pageClass));
            const pageNum = page.element(by.css('.pageNum'));
            const condition = EC.textToBePresentInElement(pageNum, '' + expectedPageNum);
            browser.wait(condition);
            expect(condition()).toBe(true);
            return page.all(by.css('.paragraph')).count().then(cnt => {
                expect(cnt).toBeGreaterThan(0);
                return page;
            });
        }

        it('right page (page 1) has a chapter heading and paragraphs', () => {
            return expectPageNumAndParagraphs('.rightPage', 1).then(rightPage => {
                return rightPage.all(by.tagName('h2')).count().then(cnt => {
                    expect(cnt).toBe(1);
                });
            });
        });

        /**
         * Checks that the page navigation link (previous or next, according to navClass) is disabled.
         *
         * https://github.com/angular/protractor/issues/577
         * isEnabled is always true for <a> tag, so we use getAttribute workaround.
         */
        function expectPageNavIsDisabled(navClass) {
            return element(by.css(navClass)).getAttribute('disabled').then(disabled => {
                expect(disabled).toBe('true');
            });
        }

        it('link to previous page is disabled', () => {
            return expectPageNavIsDisabled('.prev-page-nav');
        });

        it('click Next once and now both left/right (pages 2 & 3) have paragraphs', () => {
            element(by.css('.next-page-nav')).click();
            expectPageNumAndParagraphs('.leftPage', 2);
            return expectPageNumAndParagraphs('.rightPage', 3);
        });

        it('click Next two more times to reach the last page', () => {
            element(by.css('.next-page-nav')).click();
            expectPageNumAndParagraphs('.leftPage', 4);
            expectPageNumAndParagraphs('.rightPage', 5);
            element(by.css('.next-page-nav')).click();
            expectPageNumAndParagraphs('.leftPage', 6);
            expectPageIsBlank('.rightPage');
            return expectPageNavIsDisabled('.next-page-nav');
        });

        it('finish by going back to dashboard', () => {
            element(by.linkText('Back to Dashboard')).click();
            return ptorUtils.expectViewIsDashboard();
        });
    });

});