'use strict';
describe('ReadController', () => {
    let $controller, $scope, $location, LibraryModel, BookModel, lastPageNum;

    const TITLE = "Some Book";

    beforeEach(() => {
        angular.mock.module('writeBooks.read');
        angular.mock.inject(($injector) => {
            $controller = $injector.get('$controller');
            $scope = {};
            $location = $injector.get('$location');
            LibraryModel = $injector.get('LibraryModel');
            BookModel = $injector.get('BookModel');
        });
    });

    function init(libraryHasBook, bookId, readPageNum) {
        if (libraryHasBook) {
            LibraryModel.addBook(new BookModel(TITLE, 2));
        }
        return $controller('ReadController', {
            $scope: $scope,
            $routeParams: {
                bookId: bookId,
                readPageNum: readPageNum
            }
        });
    }

    describe('No such book', () => {
        let ReadController;

        beforeEach(() => {
            ReadController = init(false, 0, 1);
        });

        it('all scope variables are undefined', () => {
            expect($scope.book).toBeUndefined();
            expect($scope.readPageNum).toBeUndefined();
            expect($scope.prevPageUrl).toBeUndefined();
            expect($scope.nextPageUrl).toBeUndefined();
        });

        it('redirects to dashboard', () => {
            expect($location.path()).toBe('/dashboard');
        });

    });

    describe('Page 1 of a book', () => {
        let ReadController;

        beforeEach(() => {
            ReadController = init(true, 0, 1);
        });

        it('we get the book, open to page 1', () => {
            expect($scope.book.title).toBe(TITLE);
            expect($scope.readPageNum).toBe(1);
        });

        it('"Previous" link is empty, but "Next" link is a real url', () => {
            expect($scope.prevPageUrl).toBeUndefined();
            expect($scope.nextPageUrl).toContain('/page/3');
        });
    });

    describe('Page 2 of a book', () => {
        let ReadController;

        beforeEach(() => {
            ReadController = init(true, 0, 2);
        });

        it('we get the book, but will redirect to the next odd-numbered page', () => {
            expect($scope.book.title).toBe(TITLE);
            expect($scope.readPageNum).toBeUndefined();
            expect($scope.prevPageUrl).toBeUndefined();
            expect($scope.nextPageUrl).toBeUndefined();
            expect($location.path()).toContain('/page/3');
        });
    });

    describe('Page 1000 is not even in the book', () => {
        let ReadController;

        beforeEach(() => {
            ReadController = init(true, 0, 1000);
        });

        it('we get the book, but will redirect to the actual last page', () => {
            expect($scope.book.title).toBe(TITLE);
            expect($scope.readPageNum).toBeUndefined();
            expect($scope.prevPageUrl).toBeUndefined();
            expect($scope.nextPageUrl).toBeUndefined();
            expect($location.path()).toContain('/page/');
            const newPageNum = +$location.path().match(/page\/(\d+)$/)[1];
            expect(newPageNum).toBeLessThan(1000);
        });
    });

});