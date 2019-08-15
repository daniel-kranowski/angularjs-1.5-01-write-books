'use strict';
describe('ParagraphFactory', () => {
    let ParagraphFactory;

    beforeEach(() => {
        angular.mock.module('writeBooks.paragraph');
        angular.mock.inject(($injector) => {
            ParagraphFactory = $injector.get('ParagraphFactory')
        });
    });

    it('does not allow an unlimited supply of paragraphs', () => {
        expect(() => ParagraphFactory.nextParagraphs(1000000)).toThrow();
    });

    it('can return 10 unique non-blank paragraphs', () => {
        const paragraphs = [];
        for (let paragraph of ParagraphFactory.nextParagraphs(10)) {
            expect(paragraphs.indexOf(paragraph)).toBe(-1); //uniqueness
            paragraphs.push(paragraph);
            expect(typeof(paragraph)).toBe('string');
            expect(paragraph.length).toBeGreaterThan(0);
        }
        expect(paragraphs.length).toBe(10);
    });
});