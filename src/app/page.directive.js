/**
 * A PageDirective renders a single page of the book.
 */
'use strict';
angular.module('writeBooks.page', [])
    .directive('pageDirective', [
        function() {
            function setPage(scope, pageNum) {
                if (scope.book !== undefined) {
                    const pages = scope.book.pages;
                    scope.pageNum = pageNum;
                    if (0 < pageNum <= pages.length) {
                        scope.page = pages[pageNum - 1];
                    }
                    else {
                        scope.page = undefined;
                    }
                }
            }
            return {
                templateUrl: 'app/page.html',
                scope: true,
                link: function(scope, element, attributes) {
                    setPage(scope, attributes.pageNum);
                },
            };
        }
    ]);