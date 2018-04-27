describe('Knexaa keymaker service', function() {
    var keymaker;

    // Before each test load our api.users module
    beforeEach(angular.mock.module('skillseval'));

    // Before each test set our injected Users factory (_Users_) to our local Users variable
    beforeEach(inject(function(_keymaker_) {
        keymaker = _keymaker_;
    }));


    it('should test makeKey and decodeKey', function() {

        //Test for SingleAnsMCQ
        var key = keymaker.makeKey('B');
        var ans = keymaker.decodeKey(key);
        expect(ans).toBe('B');

        //Test for SingleAnsMCQ
        key = keymaker.makeKey('E');
        ans = keymaker.decodeKey(key);
        expect(ans).toBe('E');

        //Test for MultiAnsMCQ
        key = keymaker.makeKey(['A', 'B', 'C', 'F', 'H', 'K']);
        ans = keymaker.decodeKey(key);
        expect(ans).toEqual(['A', 'B', 'C', 'F', 'H', 'K']);
    });



    it('should test makeKeyForSingleAnsMCQ and decodeKeyForSingleAnsMCQ', function() {
        
        var key = keymaker.makeKeyForSingleAnsMCQ('C', 'A1');
        var ans = keymaker.decodeKeyForSingleAnsMCQ(key);
        expect(ans).toBe('C');

        key = keymaker.makeKeyForSingleAnsMCQ('S', 'A9');
        ans = keymaker.decodeKeyForSingleAnsMCQ(key);
        expect(ans).toBe('S');
    });


    it('should test makeKeyForMultiAnsMCQ and decodeKeyForMultiAnsMCQ', function() {
        
        var key = keymaker.makeKeyForMultiAnsMCQ(['C', 'E']);
        var ans = keymaker.decodeKeyForMultiAnsMCQ(key);
        expect(ans).toEqual(['C', 'E']);

        key = keymaker.makeKeyForMultiAnsMCQ(['A', 'C', 'E', 'F']);
        ans = keymaker.decodeKeyForMultiAnsMCQ(key);
        expect(ans).toEqual(['A', 'C', 'E', 'F']);
    });
});