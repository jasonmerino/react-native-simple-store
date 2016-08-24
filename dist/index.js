'use strict';
/**
 * @overview A minimalistic wrapper around React Native's AsyncStorage.
 * @license MIT
 */

var _reactNative = require('react-native');

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deviceStorage = {
	/**
  * Get a one or more value for a key or array of keys from AsyncStorage
  * @param {String|Array} key A key or array of keys
  * @return {Promise}
  */
	get: function get(key) {
		if (!Array.isArray(key)) {
			return _reactNative.AsyncStorage.getItem(key).then(function (value) {
				return JSON.parse(value);
			});
		} else {
			return _reactNative.AsyncStorage.multiGet(key).then(function (values) {
				return values.map(function (value) {
					return JSON.parse(value[1]);
				});
			});
		}
	},


	/**
  * Save a key value pair or a series of key value pairs to AsyncStorage.
  * @param  {String|Array} key The key or an array of key/value pairs
  * @param  {Any} value The value to save
  * @return {Promise}
  */
	save: function save(key, value) {
		if (!Array.isArray(key)) {
			return _reactNative.AsyncStorage.setItem(key, JSON.stringify(value));
		} else {
			var pairs = key.map(function (pair) {
				return [pair[0], JSON.stringify(pair[1])];
			});
			return _reactNative.AsyncStorage.multiSet(pairs);
		}
	},


	/**
  * Updates the value in the store for a given key in AsyncStorage. If the value is a string it will be replaced. If the value is an object it will be deep merged.
  * @param  {String} key The key
  * @param  {Value} value The value to update with
  * @return {Promise}
  */
	update: function update(key, value) {
		return deviceStorage.get(key).then(function (item) {
			value = typeof value === 'string' ? value : (0, _lodash2.default)({}, item, value);
			return _reactNative.AsyncStorage.setItem(key, JSON.stringify(value));
		});
	},


	/**
  * Delete the value for a given key in AsyncStorage.
  * @param  {String} key The key
  * @return {Promise}
  */
	delete: function _delete(key) {
		return _reactNative.AsyncStorage.removeItem(key);
	},


	/**
  * Get all keys in AsyncStorage.
  * @return {Promise} A promise which when it resolves gets passed the saved keys in AsyncStorage.
  */
	keys: function keys() {
		return _reactNative.AsyncStorage.getAllKeys();
	}
};

module.exports = deviceStorage;