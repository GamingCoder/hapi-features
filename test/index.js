var expect = require('expect.js');
var Hapi = require('hapi');

var index = require('../index');
var conf = {"feature_a":true,"a_dep_a":{"active":true,"required":["feature_a","true_dep_a"]},"true_dep_a":{"active":true,"required":["feature_a"]},"a_dep_b":{"active":true,"required":["feature_a","true_dep_b"]},"true_dep_b":{"active":true,"required":["feature_b"]},"feature_b":false}
var expected = {"feature_a":true,"feature_b":false,"true_dep_a":true,"true_dep_b":false,"a_dep_a":true,"a_dep_b":false};
var server;

describe('index.js', function() {
	it('should export register method', function() {
		expect(typeof index.register).to.eql('function');
	});
});

describe('plugin', function() {
	beforeEach(function() {
		server = new Hapi.Server();
		server.connection({ labels: ['api'] });
		server.register({
			register: index,
			options: conf
		}, function(err) {
			expect(err).to.be.a('undefined');
			server.route({
				method: 'GET',
				path: '/test',
				handler: function(request, reply) {
					reply(request.plugins.features);
				}
			});
		});
	});
	it('should set server.plugins.features property', function() {
		expect(server.plugins.features).to.eql(expected);
	});
	it('should set features property on every request', function(done) {
		request = {method: 'GET', url: '/test'};
		server.inject(request, function(res) {
			expect(res.result).to.eql(expected);
			done();
		});
	});
});