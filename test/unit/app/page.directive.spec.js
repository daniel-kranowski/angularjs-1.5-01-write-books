'use strict';
describe('PageDirective', () => {
    let $compile, $rootScope, BookModel;

    beforeEach(() => {
        angular.mock.module('writeBooks.page', 'writeBooks.book');
        //noinspection JSAnnotator - intellij doesn't know karma-ng-html2js-preprocessor will modularize the html
        angular.mock.module('app/page.html'); //directive templateUrl
        angular.mock.inject(($injector) => {
            $compile = $injector.get('$compile');
            $rootScope = $injector.get('$rootScope');
            BookModel = $injector.get('BookModel');
        });
    });

    function compilePage(pageNum) {
        const book = new BookModel('Some Book Title', 2);
        $rootScope.book = book;
        const element = angular.element('<div data-page-directive data-page-num="' + pageNum + '"></div>');
        $compile(element)($rootScope);
        $rootScope.$digest();
        return element;
    }

    describe('Page 1', () => {
        let element;

        beforeEach(() => {
            element = compilePage(1);
        });

        it('is the start of a chapter', () => {
            expect(element.find('h2').text()).toBe('Chapter 1');
        });

        it('has non-empty paragraphs', () => {
            expect(element.find('.paragraph').length).toBeGreaterThan(0);
        });

    });

    describe('Page 2', () => {
        let element;

        beforeEach(() => {
            element = compilePage(2);
        });

        it('is not the start of a chapter', () => {
            expect(element.find('h2').length).toBe(0);
        });

        it('also has non-empty paragraphs', () => {
            expect(element.find('.paragraph').length).toBeGreaterThan(0);
        });

    });
});