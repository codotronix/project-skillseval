var expect  = require('chai').expect;

it('Should test the test setup', function(done) {
    //request('http://localhost:8080' , function(error, response, body) {
        expect('Hello World').to.equal('Hello World');
        done();
    //});
});