exports.register = function (server, options, next) {
	server.plugins.features = require('./compute')(options);
	
	server.ext('onRequest', function(request, reply) {
		request.plugins.features = server.plugins.features;
		return reply.continue();
	});

	server.method('updateFeatures', function(conf) {
		server.plugins.features = require('./compute')(conf);	
	});
    
    next();
}

exports.register.attributes = {
    pkg: require('./package.json')
}