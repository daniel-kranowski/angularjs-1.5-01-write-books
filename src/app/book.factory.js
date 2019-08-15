/**
 * A BookModel has a title and chapters, whose paragraphs are mapped out to specific pages.
 * We can do that because page layout is fixed size.
 *
 * A ChapterModel has a number (1-based) and string paragraphs.
 */
'use strict';
angular.module('writeBooks.book', [
    'writeBooks.paragraph'
])
    .factory('BookModel', [
        'ParagraphFactory',
        function(ParagraphFactory) {

            const NUM_PARAGRAPHS_PER_CHAPTER = 4;
            const MAX_NUM_CHAPTERS = 10;
            const MAX_LEN_SHORT_TITLE = 25; //For dashboard view
            const MAX_LEN_MEDIUM_TITLE = 100; //For read view

            function ChapterModel(num, paragraphs) {
                this.num = num;
                this.paragraphs = paragraphs;
                if (num < 1) {
                    throw new Error('Chapter number must be >= 1, not ' + num);
                }
                if (!_.isArray(paragraphs) || paragraphs.length === 0) {
                    throw new Error('Need non-empty array of paragraphs, not ' + paragraphs);
                }
            }

            function truncateWithEllipses(str, maxLen) {
                return str.length <= maxLen ? str : (str.substr(0, maxLen - 3) + '...');
            }

            function mapChaptersToPages(chapters) {
                const pages = [];
                for (let i = 0; i < chapters.length; ++i) {
                    const chapter = chapters[i];
                    for (let j = 0; j < chapter.paragraphs.length; j += 2) {
                        /*
                         To simplify matters, we'll put at most 2 paragraphs on a single page, to avoid overflow.
                         */
                        pages.push({
                            pageNum: pages.length + 1, //pages[0] maps the displayed page 1
                            isChapterStart: j === 0,
                            chapter: chapter,
                            paragraphs: chapter.paragraphs.slice(j, j + 2)
                        });
                    }
                }
                return pages;
            }

            /**
             * Constructs a new book with the given title and number of chapters, where each chapter consists
             * of a fixed number of paragraphs from the ParagraphFactory, and chapters/paragraphs are mapped to
             * specific pages.
             */
            function BookModel(title, numChapters) {
                this.title = title;
                this.shortTitle = truncateWithEllipses(title, MAX_LEN_SHORT_TITLE);
                this.mediumTitle = truncateWithEllipses(title, MAX_LEN_MEDIUM_TITLE);
                this.chapters = [];
                if (numChapters < 1 || numChapters > MAX_NUM_CHAPTERS) {
                    throw new Error('out of range: ' + numChapters);
                }
                for (let i = 1; i <= numChapters; ++i) {
                    this.chapters.push(new ChapterModel(i, ParagraphFactory.nextParagraphs(NUM_PARAGRAPHS_PER_CHAPTER)));
                }
                this.pages = mapChaptersToPages(this.chapters);
            }

            return BookModel;
        }
    ]);