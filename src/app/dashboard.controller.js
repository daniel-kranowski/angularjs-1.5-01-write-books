/**
 * Dashboard scope has a library of books to read, and a link to the page where you write a book.
 */
'use strict';
angular.module('writeBooks.dashboard', [
    'writeBooks.library'
])
    .controller('DashboardController', [
        '$scope',
        '$location',
        'LibraryModel',
        'BookModel',
        function($scope, $location, LibraryModel, BookModel) {

            $scope.library = LibraryModel;

            $scope.readBook = function (bookId) {
                $location.path('/read/' + bookId + '/page/1');
            };

        }
    ]);