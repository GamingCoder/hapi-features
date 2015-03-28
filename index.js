exports.register = function (server, options, next) {
	features = require('./compute')(options);
	server.ext('onRequest', function(request, reply) {
		request.plugins.features = features;
		return reply.continue();
	});
    next();
}

exports.register.attributes = {
    pkg: require('./package.json')
}