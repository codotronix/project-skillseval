describe('Knexaa helper service', function() {
    var helper;

    // Before each test load our api.users module
    beforeEach(angular.mock.module('skillseval'));

    // Before each test set our injected Users factory (_Users_) to our local Users variable
    beforeEach(inject(function(_helper_) {
        helper = _helper_;
    }));


    it('should test getRandomAlphas - returns constant string forever', function() {
        expect(helper.getRandomAlphas()).toBe("GBUYEWIZNXADTHVPQFCSLRMOKJ");
    });


    it('should test getAlphaNumString', function() {
        expect(helper.getAlphaNumString(5).length).toBe(5);
        expect(helper.getAlphaNumString(9).length).toBe(9);
        expect(helper.getAlphaNumString(15).length).toBe(15);
        expect(helper.getAlphaNumString(19).length).toBe(19);
    });


    it('should test replaceStringAt', function() {
        expect(helper.replaceStringAt("AZCD", 1, "B")).toBe("ABCD");
        expect(helper.replaceStringAt("WABZ", 1, "XY")).toBe("WXYZ");
    });


    it('should test breakIntoFives', function() {
        var s = "ABCDEFGHIJKLMNO";
        var sep = '-';
        var res = helper.breakIntoFives(s, sep).split(sep);
        expect(res[0]).toBe('ABCDE');
        expect(res[1]).toBe('FGHIJ');
        expect(res[2]).toBe('KLMNO');
    });


    it('should test randomizeArray', function() {
        var arr = ["a", "b", "c", "d", "e", "f"];
        var ranArr = helper.randomizeArray(arr);
        expect(arr.length).toEqual(ranArr.length);
        expect(arr).not.toEqual(ranArr);
    });


    it('should test alphaToNum', function() {
        expect(helper.alphaToNum('A')).toBe(10);
        expect(helper.alphaToNum('D')).toBe(11);
        expect(helper.alphaToNum('H')).toBe(13);
        expect(helper.alphaToNum('M')).toBe(22);
        expect(helper.alphaToNum('S')).toBe(19);
        expect(helper.alphaToNum('X')).toBe(9);
        expect(helper.alphaToNum('Z')).toBe(7);
    });
});