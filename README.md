# hapi-features
[![Build Status](https://travis-ci.org/GamingCoder/hapi-features.svg?branch=master)](https://travis-ci.org/GamingCoder/hapi-features)
Simple feature flags management for hapi.js
## Installation
```shell
$ npm install hapi-features
```
## Usage
To use this plugin just load it into your hapi.js server.
Pass it your feature flags as the options property. It will add the `plugins.features` property to every request object.
```javascript
server.register({
	register: index,
	options: {"feature_a":true, "feature_b":false}
}, function(err) {});
```

## Configuration
### Simple true/false
#### Input:
```json
{
  "feature_a": true,
  "feature_b": false
}
```
#### Output:
```json
{
  "feature_a": true,
  "feature_b": false
}
```
### Simple dependencies
#### Input:
```json
{
  "feature_a": true,
  "feature_b": false,
  "true_dep_a": {
    "active": true,
    "required": [
      "feature_a"
    ]
  },
  "false_dep_a": {
    "active": false,
    "required": [
      "feature_a"
    ]
  },
  "true_dep_b": {
    "active": true,
    "required": [
      "feature_b"
    ]
  },
  "false_dep_b": {
    "active": false,
    "required": [
      "feature_b"
    ]
  },
  "true_dep_ab": {
    "active": true,
    "required": [
      "feature_a",
      "feature_b"
    ]
  },
  "false_dep_ab": {
    "active": false,
    "required": [
      "feature_a",
      "feature_b"
    ]
  }
}
```
#### Output:
```json
{
  "feature_a": true,
  "feature_b": false,
  "true_dep_a": true,
  "false_dep_a": false,
  "true_dep_b": false,
  "false_dep_b": false,
  "true_dep_ab": false,
  "false_dep_ab": false
}
```
### Nested dependencies
#### Input:
```json
{
  "feature_a": true,
  "feature_b": false,
  "true_dep_a": {
    "active": true,
    "required": [
      "feature_a"
    ]
  },
  "true_dep_b": {
    "active": true,
    "required": [
      "feature_b"
    ]
  },
  "a_dep_a": {
    "active": true,
    "required": [
      "feature_a",
      "true_dep_a"
    ]
  },
  "a_dep_b": {
    "active": true,
    "required": [
      "feature_a",
      "true_dep_b"
    ]
  }
}
```
#### Output:
```json
{
  "feature_a": true,
  "feature_b": false,
  "true_dep_a": true,
  "true_dep_b": false,
  "a_dep_a": true,
  "a_dep_b": false
}
```