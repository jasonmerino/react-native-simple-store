
/**
 * @overview A minimalistic wrapper around React Native's AsyncStorage.
 * @license MIT
 */
import { AsyncStorage } from 'react-native';
import merge from 'lodash.merge';

const deviceStorage = {
	/**
	 * Get a one or more value for a key or array of keys from AsyncStorage
	 * @param {String|Array} key A key or array of keys
	 * @param {String|Array} [defaultValue] Returned if the key(s) are null
	 * @return {Promise}
	 */
	get(key, defaultValue) {
		if(!Array.isArray(key)) {
			return AsyncStorage.getItem(key).then(value => {
				return JSON.parse(value) || defaultValue;
			});
		} else {
			return AsyncStorage.multiGet(key).then(values => {
				return values.map((value, index) => {
					var defaultMulti = Array.isArray(defaultValue) ? defaultValue[index] : defaultValue;
					return JSON.parse(value[1]) || defaultMulti;
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
	save(key, value) {
		if(!Array.isArray(key)) {
			return AsyncStorage.setItem(key, JSON.stringify(value));
		} else {
			var pairs = key.map(function(pair) {
				return [pair[0], JSON.stringify(pair[1])];
			});
			return AsyncStorage.multiSet(pairs);
		}
	},

	/**
	 * Updates the value in the store for a given key in AsyncStorage. If the value is a string it will be replaced. If the value is an object it will be deep merged.
	 * @param  {String} key The key
	 * @param  {Value} value The value to update with
	 * @return {Promise}
	 */
	update(key, value) {
		return deviceStorage.get(key).then(item => {
			value = typeof value === 'string' ? value : merge({}, item, value);
			return AsyncStorage.setItem(key, JSON.stringify(value));
		});
	},

	/**
	 * Delete the value for a given key in AsyncStorage.
	 * @param  {String|Array} key The key or an array of keys to be deleted
	 * @return {Promise}
	 */
	delete(key) {
		if (Array.isArray(key)) {
			return AsyncStorage.multiRemove(key);
		} else {
			return AsyncStorage.removeItem(key);
		}
	},

	/**
	 * Get all keys in AsyncStorage.
	 * @return {Promise} A promise which when it resolves gets passed the saved keys in AsyncStorage.
	 */
	keys() {
		return AsyncStorage.getAllKeys();
	}
};

module.exports = deviceStorage;
