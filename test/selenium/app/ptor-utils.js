'use strict';

function expectViewById(id) {
    return element(by.id(id)).isPresent().then(present => {
        expect(present).toBe(true);
    });
}

module.exports = {

    beforeEachGetBaseUrl: () => {
        beforeEach(() => {
            browser.get(browser.baseUrl);
        });
    },

    beforeAllGetBaseUrl: () => {
        beforeAll(() => {
            browser.get(browser.baseUrl);
        });
    },

    expectViewIsDashboard: () => {
        return expectViewById('dashboard');
    },

    expectViewIsRead: () => {
        return expectViewById('read');
    },

    expectViewIsWrite: () => {
        return expectViewById('write');
    }

};