'use strict';
describe('LibraryModel', () => {
    let LibraryModel;

    //Whitebox testing: we know LibraryModel only makes use of the title field
    const FAKE_BOOK_1 = { title: 'first' };
    const FAKE_BOOK_2 = { title: 'second' };

    beforeEach(() => {
        angular.mock.module('writeBooks.library');
        angular.mock.inject(($injector) => {
            LibraryModel = $injector.get('LibraryModel');
        });
    });

    it('is initially empty', () => {
        expect(LibraryModel.getBooks().length).toBe(0);
    });

    it('we can add books and get them back', () => {
        LibraryModel.addBook(FAKE_BOOK_1);
        LibraryModel.addBook(FAKE_BOOK_2);
        expect(LibraryModel.getBooks().length).toBe(2);
        expect(LibraryModel.getBook(0)).toEqual(FAKE_BOOK_1);
        expect(LibraryModel.getBook(1)).toEqual(FAKE_BOOK_2);
    });

    it('can remove a book', () => {
        expect(LibraryModel.getBooks().length).toBe(0);
        LibraryModel.addBook(FAKE_BOOK_1);
        expect(LibraryModel.getBooks().length).toBe(1);
        LibraryModel.removeBook(FAKE_BOOK_1.title);
        expect(LibraryModel.getBooks().length).toBe(0);
    });

});