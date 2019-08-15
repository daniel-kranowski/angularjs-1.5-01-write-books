'use strict';
const ptorUtils = require('./ptor-utils');

describe('Dashboard:', () => {

    ptorUtils.beforeAllGetBaseUrl();

    it('baseUrl follows route to /dashboard', () => {
        return ptorUtils.expectViewIsDashboard();
    });

    it('library initially has 4 books', () => {
        element.all(by.tagName('li')).then(items => {
            expect(items.length).toBe(4);
            expect(items[1].getText()).toBe('A Short Book');
        });
        return element(by.css('[data-ng-pluralize]')).getText().then(txt => {
            expect(txt).toBe('4 books');
        });
    });

    it('some book short-titles have ellipses', () => {
        let numWithEllipses = 0;
        return protractor.promise.all(
            element.all(by.css('li')).each(item => {
                return item.getText().then(txt => {
                    if (txt.match(/\.\.\.$/)) {
                        numWithEllipses++;
                    }
                });
            })
        ).then(() => expect(numWithEllipses).toBe(2));
    });

});