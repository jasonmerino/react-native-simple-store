'use strict';
/**
 * @overview A minimalistic wrapper around React Native's AsyncStorage.
 * @license MIT
 */
import { AsyncStorage } from 'react-native';

const deviceStorage = {
	/**
	 * Get a one or more value for a key or array of keys from AsyncStorage
	 * @param {String|Array} key A key or array of keys
	 * @return {Promise}
	 */
	get(key) {
		if(!Array.isArray(key)) {
			return AsyncStorage.getItem(key).then(value => {
				return JSON.parse(value);
			});
		} else {
			return AsyncStorage.multiGet(key).then(values => {
				return values.map(value => {
					return JSON.parse(value[1]);
				});
			});
		}
	},

	/**
	 * Save a key value pair to AsyncStorage.
	 * @param  {String|Array} key The key or an array of key/value pairs
	 * @param  {Any} value The value to save
	 * @return {Promise}
	 */
	save(key, value) {
        if(!Array.isArray(key)) {
            return AsyncStorage.setItem(key, JSON.stringify(value));
        } else {
            var kvPairs = key.map(function(kvPair) {
                return [kvPair[0], JSON.stringify(kvPair[1])];
            });
            return AsyncStorage.multiSet(kvPairs);
        }
	},

	/**
	 * Updates the value in the store for a given key in AsyncStorage. If the value is a string it will be replaced. If the value is an object it will be extended.
	 * @param  {String} key The key
	 * @param  {Value} value The value to update with
	 * @return {Promise}
	 */
	update(key, value) {
		return deviceStorage.get(key).then(item => {
			value = typeof value === 'string' ? value : Object.assign({}, item, value);
			return AsyncStorage.setItem(key, JSON.stringify(value));
		});
	},

	/**
	 * Delete the value for a given key in AsyncStorage.
	 * @param  {String} key The key
	 * @return {Promise}
	 */
	delete(key) {
		return AsyncStorage.removeItem(key);
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
