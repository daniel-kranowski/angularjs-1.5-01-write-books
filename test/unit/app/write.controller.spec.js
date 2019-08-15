'use strict';
describe('WriteController', () => {
    let $controller, $scope, WriteController, LibraryModel;

    const GOOD_TITLE = "First book";

    beforeEach(() => {
        angular.mock.module('writeBooks.write');
        angular.mock.inject(($injector) => {
            $controller = $injector.get('$controller');
            $scope = {};
            WriteController = $controller('WriteController', { $scope: $scope });
            LibraryModel = $injector.get('LibraryModel');
        });
    });

    it('generate button is initially disabled', () => {
        expect($scope.generateButtonIsEnabled()).toBeFalsy();
    });

    it('adds net one new book if title is new', () => {
        expect(LibraryModel.getBooks().length).toBe(0);
        $scope.writeForm.title = GOOD_TITLE;
        $scope.writeForm.numChapters = 3;
        $scope.generateBook();
        expect(LibraryModel.getBooks().length).toBe(1);
        expect(LibraryModel.getBooks()[0].title).toBe(GOOD_TITLE);
        expect(LibraryModel.getBooks()[0].chapters.length).toBe(3);
    });

    it('overwrites an existing title with the same name', () => {
        $scope.writeForm.title = GOOD_TITLE;
        $scope.writeForm.numChapters = 3;
        $scope.generateBook();
        expect(LibraryModel.getBooks().length).toBe(1);
        $scope.writeForm.numChapters = 5;
        $scope.generateBook();
        expect(LibraryModel.getBooks().length).toBe(1); //i.e. remove + add == overwrite
        expect(LibraryModel.getBooks()[0].chapters.length).toBe(5);
    });

    it('sanitizes a title with attempted script injection', () => {
        const BAD_TITLE = 'A Nice Harmless <script>dleet ur things</script> Book';
        const SANITIZED_TITLE = 'A Nice Harmless  Book';
        $scope.writeForm.title = BAD_TITLE;
        $scope.writeForm.numChapters = 3;
        $scope.generateBook();
        expect(LibraryModel.getBooks().length).toBe(1);
        expect(LibraryModel.getBooks()[0].title).toBe(SANITIZED_TITLE);
    });
});