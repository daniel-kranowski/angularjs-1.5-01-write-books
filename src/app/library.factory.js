/**
 * A LibraryModel is a singleton collection of BookModel.
 */
'use strict';
angular.module('writeBooks.library', [
    'writeBooks.book'
])
    .factory('LibraryModel', [
        function() {
            let books = [];
            function LibraryModel() {
            }
            LibraryModel.removeBook = function(title) {
                books = books.filter(book => book.title !== title);
            };
            LibraryModel.addBook = function(book) {
                books.push(book);
                return books.length - 1;
            };
            LibraryModel.getBook = function(bookId) {
                if (0 <= bookId && bookId < books.length) {
                    return books[bookId];
                }
            };
            LibraryModel.getBooks = function() {
                return Array.from(books);
            };
            return LibraryModel;
        }
    ]);