'use strict';
angular.module('writeBooks.app', [
    'writeBooks.dashboard',
    'writeBooks.write',
    'writeBooks.read',
    'ngRoute'
])
    .config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/dashboard', {
                    templateUrl: 'app/dashboard.html',
                    controller: 'DashboardController'
                })
                .when('/write', {
                    templateUrl: 'app/write.html',
                    controller: 'WriteController'
                })
                .when('/read/:bookId/page/:readPageNum', {
                    templateUrl: 'app/read.html',
                    controller: 'ReadController'
                })
                .otherwise({
                    redirectTo: '/dashboard'
                });
        }
    ])
    .run([
        '$rootScope',
        'LibraryModel',
        'BookModel',
        function ($rootScope, LibraryModel, BookModel) {
            /**
             * Since there's no persistent datastore in this demo app, it will forget the library of books each time
             * you reload the page.  Let's seed the library with some books.
             */
            $rootScope.$on('$routeChangeStart', function (event, next, current) {
                if (!current) {
                    if (LibraryModel.getBooks().length === 0) {
                        LibraryModel.addBook(new BookModel('Journey to the Center of the Earth', 3));
                        LibraryModel.addBook(new BookModel('A Short Book', 2));
                        LibraryModel.addBook(new BookModel("Mr. Phileas Fogg lived, in 1872, at No. 7, Saville Row, Burlington Gardens, the house in which Sheridan died in 1814.  He was one of the most noticeable members of the Reform Club, though he seemed always to avoid attracting attention; an enigmatical personage, about whom little was known, except that he was a polished man of the world.  People said that he resembled Byron--at least that his head was Byronic; but he was a bearded, tranquil Byron, who might live on a thousand years without growing old.", 5));
                        LibraryModel.addBook(new BookModel('World Almanac 2017', 1));
                    }
                }
            });
        }
    ]);
