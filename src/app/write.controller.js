'use strict';
angular.module('writeBooks.write', [
    'writeBooks.library',
    'ngSanitize'
])
    .controller('WriteController', [
        '$scope',
        '$location',
        '$sanitize',
        'LibraryModel',
        'BookModel',
        function($scope, $location, $sanitize, LibraryModel, BookModel) {

            $scope.writeForm = {
                title: null,
                numChapters: null
            };

            $scope.generateButtonIsEnabled = function() {
                return $scope.writeForm.title && $scope.writeForm.title.trim() && $scope.writeForm.numChapters > 0;
            };

            /**
             * Generates a new book with the given title and number of chapters, and adds it to the library.
             * If a book with this title exists already, then we'll simply generate a new book and overwrite it.
             * Sanitizes the title, e.g. to remove any malicious injected scripts.
             * If a new book was successfully added, we'll navigate to the /read page and display the new book.
             */
            $scope.generateBook = function() {
                const {title, numChapters} = $scope.writeForm;
                if (title && numChapters > 0) {
                    const sanitizedTitle = $sanitize(title).trim();
                    if (sanitizedTitle) {
                        LibraryModel.removeBook(sanitizedTitle);
                        const newId = LibraryModel.addBook(new BookModel(sanitizedTitle, numChapters));
                        $location.path('/read/' + newId + '/page/1');
                    }
                }
            };
        }
    ]);