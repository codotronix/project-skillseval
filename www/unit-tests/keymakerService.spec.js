describe('Knexaa keymaker service', function() {
    var keymaker;

    // Before each test load our api.users module
    beforeEach(angular.mock.module('skillseval'));

    // Before each test set our injected Users factory (_Users_) to our local Users variable
    beforeEach(inject(function(_keymaker_) {
        keymaker = _keymaker_;
    }));


    it('should test makeKeyForSingleAnsMCQ and decodeKeyForSingleAnsMCQ', function() {
        
        var k1 = keymaker.makeKeyForSingleAnsMCQ('C', 'A1');
        var ans = keymaker.decodeKeyForSingleAnsMCQ(k1);
        expect(ans).toBe('C');

        var k1 = keymaker.makeKeyForSingleAnsMCQ('S', 'A9');
        var ans = keymaker.decodeKeyForSingleAnsMCQ(k1);
        expect(ans).toBe('S');
    });
});