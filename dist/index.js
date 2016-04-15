'use strict';

var _reactNative = require('react-native');

var deviceStorage = {
	get: function get(key) {
		return _reactNative.AsyncStorage.getItem(key).then(function (value) {
			return JSON.parse(value);
		});
	},
	save: function save(key, value) {
		return _reactNative.AsyncStorage.setItem(key, JSON.stringify(value));
	},
	update: function update(key, value) {
		return deviceStorage.get(key).then(function (item) {
			value = typeof value === 'string' ? value : Object.assign({}, item, value);
			return _reactNative.AsyncStorage.setItem(key, JSON.stringify(value));
		});
	},
	delete: function _delete(key) {
		return _reactNative.AsyncStorage.removeItem(key);
	}
};

module.exports = deviceStorage;