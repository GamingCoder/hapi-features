module.exports = function(conf) {

	function containsObjects (c) {
		var contains = false;
		for (e in c){
			if (typeof c[e] === 'object') contains = true;
		}
		return contains;
	}

	while(containsObjects(conf)) {
		for(name in conf) {
			var val = conf[name];
			if (typeof val === 'object') {
				if (val.active === false) {
					conf[name] = false
				} else {
					depsActive = true;
					depsResolved = true;
					for (dep in val.required){
						if (conf[val.required[dep]] !== true) depsActive = false;
						if (typeof conf[val.required[dep]] === 'object') depsResolved = false;
					}
					if (depsResolved) conf[name] = depsActive;
				}
			}
		}
	}

	return conf;
}