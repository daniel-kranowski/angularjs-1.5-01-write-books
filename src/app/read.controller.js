'use strict';
angular.module('writeBooks.read', [
    'writeBooks.library',
    'writeBooks.page'
])
    .controller('ReadController', [
        '$scope',
        '$routeParams',
        '$location',
        'LibraryModel',
        function($scope, $routeParams, $location, LibraryModel) {

            /**
             * Returns the requested book by id.  Redirects to dashboard if id is out of range.
             */
            function getBookOrRedirect(bookId) {
                if (0 <= bookId && bookId < LibraryModel.getBooks().length) {
                    return LibraryModel.getBook(bookId);
                }
                else {
                    $location.path('/dashboard');
                }
            }

            /**
             * Returns the page number, or - if needed - adjusts to a valid odd page number and redirects
             * to correct the url.
             *
             * If the last page of paragraphs is an even page number, we'll add a blank page after it to end
             * with an odd number.
             *
             * (We display two pages at a time, even# on the left, odd# on the right.  The latter is the official
             * restful path param when you want to see either page.)
             */
            function getOddPageNumOrRedirect(reqPageNum, lastPageNum, bookId) {
                let pageNum = reqPageNum;
                if (pageNum < 0) {
                    pageNum = 1;
                }
                else if (pageNum >= lastPageNum) {
                    pageNum = lastPageNum;
                }
                if (pageNum % 2 === 0) { //even
                    pageNum++;
                }
                if (pageNum !== reqPageNum) {
                    $location.path('/read/' + bookId + '/page/' + pageNum);
                }
                else {
                    return pageNum;
                }
            }


            /**
             * Returns the navigation urls for "prev/next page" links.
             * Requires that readPageNum has already been set to a valid odd#.
             */
            function getNavPageUrls(pageNum, lastPageNum, bookId) {
                let prevPageUrl, nextPageUrl;
                if (pageNum > 1) {
                    prevPageUrl = '/read/' + bookId + '/page/' + (pageNum - 2);
                }
                else {
                    prevPageUrl = undefined;
                }

                if (pageNum < lastPageNum) {
                    nextPageUrl = '/read/' + bookId + '/page/' + (pageNum + 2);
                }
                else {
                    nextPageUrl = undefined;
                }

                return [prevPageUrl, nextPageUrl];
            }


            $scope.book = getBookOrRedirect($routeParams.bookId);
            if ($scope.book !== undefined) {
                const reqPageNum = +$routeParams.readPageNum;
                const reqBookId = $routeParams.bookId;
                const lastPageNum = $scope.book.pages.length;
                $scope.readPageNum = getOddPageNumOrRedirect(reqPageNum, lastPageNum, reqBookId);
                if ($scope.readPageNum) {
                    [$scope.prevPageUrl, $scope.nextPageUrl] = getNavPageUrls(reqPageNum, lastPageNum, reqBookId);
                }
            }

        }
    ]);