var expect = require('expect.js');
var index = require('../index');

describe('index.js', function() {
	it('should export register method', function() {
		expect(typeof index.register).to.eql('function');
	});
});