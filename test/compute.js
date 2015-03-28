var expect = require("expect.js");
var compute = require("../compute");

describe("compute.js", function() {
	it("should export method", function() {
		expect(typeof compute).to.eql("function");
	});
	it("should return object", function() {
		conf = {}
		expect(typeof compute(conf)).to.eql("object");
	});
	it("should set active features to true", function() {
		conf = {
			"feature_a": true,
			"feature_b": false
		}
		expected = {
			"feature_a": true,
			"feature_b": false
		}
		expect(compute(conf)).to.eql(expected);
	});
	it("should support dependencies", function() {
		conf = {
			"feature_a": true,
			"feature_b": false,
			"true_dep_a": {
				"active": true,
				"required": ["feature_a"]
			},
			"false_dep_a": {
				"active": false,
				"required": ["feature_a"]
			},
			"true_dep_b": {
				"active": true,
				"required": ["feature_b"]
			},
			"false_dep_b": {
				"active": false,
				"required": ["feature_b"]
			},
			"true_dep_ab": {
				"active": true,
				"required": ["feature_a", "feature_b"]
			},
			"false_dep_ab": {
				"active": false,
				"required": ["feature_a", "feature_b"]
			}
		}
		expected = {
			"feature_a": true,
			"feature_b": false,
			"true_dep_a": true,
			"false_dep_a": false,
			"true_dep_b": false,
			"false_dep_b": false,
			"true_dep_ab": false,
			"false_dep_ab": false
		}
		expect(compute(conf)).to.eql(expected);
	});
	it("should supported nested dependencies", function() {
		conf = {
			"feature_a": true,
			"feature_b": false,
			"true_dep_a": {
				"active": true,
				"required": ["feature_a"]
			},
			"true_dep_b": {
				"active": true,
				"required": ["feature_b"]
			},
			"a_dep_a": {
				"active" : true,
				"required": ["feature_a", "true_dep_a"]
			},
			"a_dep_b": {
				"active" : true,
				"required": ["feature_a", "true_dep_b"]
			}
		}
		expected = {
			"feature_a": true,
			"feature_b": false,
			"true_dep_a": true,
			"true_dep_b": false,
			"a_dep_a": true,
			"a_dep_b": false
		}
		expect(compute(conf)).to.eql(expected);
	});
	it("should not be order dependent", function() {
		conf = {
			"feature_a": true,
			"a_dep_a": {
				"active" : true,
				"required": ["feature_a", "true_dep_a"]
			},
			"true_dep_a": {
				"active": true,
				"required": ["feature_a"]
			},
			"a_dep_b": {
				"active" : true,
				"required": ["feature_a", "true_dep_b"]
			},
			"true_dep_b": {
				"active": true,
				"required": ["feature_b"]
			},
			"feature_b": false
		}
		expected = {
			"feature_a": true,
			"feature_b": false,
			"true_dep_a": true,
			"true_dep_b": false,
			"a_dep_a": true,
			"a_dep_b": false
		}
		expect(compute(conf)).to.eql(expected);
	});
});