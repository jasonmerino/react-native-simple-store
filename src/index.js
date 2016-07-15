'use strict';

import { AsyncStorage } from 'react-native';

const deviceStorage = {
	get(key) {
		if(!Array.isArray(key)) {
			return AsyncStorage.getItem(key).then(value => {
				return JSON.parse(value);
			});
		} else {
			return AsyncStorage.multiGet(key).then(values => {
				return values.map(value => {
					return JSON.parse(value[1]);
				})
			});
		}
	},

	save(key, value) {
		return AsyncStorage.setItem(key, JSON.stringify(value));
	},

	update(key, value) {
		return deviceStorage.get(key).then(item => {
			value = typeof value === 'string' ? value : Object.assign({}, item, value);
			return AsyncStorage.setItem(key, JSON.stringify(value));
		});
	},

	delete(key) {
		return AsyncStorage.removeItem(key);
	}
};

module.exports = deviceStorage;
