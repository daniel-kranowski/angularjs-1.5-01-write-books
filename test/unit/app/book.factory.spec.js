'use strict';
describe('BookModel', () => {
    let BookModel;
    const REGULAR_TITLE = "This title is too long for the dashboard";
    const SUPER_LONG_TITLE = "The title is so long, that not only will it not fit on the dashboard, but it won't even fit properly on the reading view";

    beforeEach(() => {
        angular.mock.module('writeBooks.book');
        angular.mock.inject(($injector) => {
            BookModel = $injector.get('BookModel');
        });
    });

    it('does not allow an unlimited supply of chapters', () => {
        expect(() => new BookModel(REGULAR_TITLE, 1000000)).toThrow();
    });

    it('does not allow zero chapters', () => {
        expect(() => new BookModel(REGULAR_TITLE, 0)).toThrow();
    });

    it('makes the number of chapters we requested', () => {
        expect(new BookModel(REGULAR_TITLE, 5).chapters.length).toBe(5);
        expect(new BookModel(REGULAR_TITLE, 2).chapters.length).toBe(2);
    });

    it('truncates long titles', () => {
        const bookRegular = new BookModel(REGULAR_TITLE, 5);
        expect(bookRegular.mediumTitle).toBe(bookRegular.title); //regular title doesn't need this truncation
        expect(bookRegular.shortTitle.length).toBeLessThan(bookRegular.title.length);
        const bookSuperLong = new BookModel(SUPER_LONG_TITLE, 5);
        expect(bookSuperLong.mediumTitle.length).toBeLessThan(bookSuperLong.title.length);
        expect(bookSuperLong.shortTitle.length).toBeLessThan(bookSuperLong.title.length);
    });

    it('chapters all have positive number of unique paragraphs', () => {
        //Ignoring the case of a very long chapter where we're forced to repeat our stock of fake text.
        const book = new BookModel(REGULAR_TITLE, 5);
        const paragraphs = [];
        book.chapters.forEach(chapter => {
            expect(chapter.paragraphs.length).toBeGreaterThan(0);
            chapter.paragraphs.forEach(paragraph => {
                expect(paragraphs.indexOf(paragraph)).toBe(-1); //uniqueness
                paragraphs.push(paragraph);
            });
        });
    });

    it('has at least one page per chapter', () => {
        const book = new BookModel(REGULAR_TITLE, 5);
        expect(book.pages.length).toBeGreaterThanOrEqual(5);
    });
});