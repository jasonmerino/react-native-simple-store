'use strict';

import { AsyncStorage } from 'react-native';

const deviceStorage = {
	get(key) {
		return AsyncStorage.getItem(key).then(value => {
			return JSON.parse(value);
		});
	},

	multiGet(keys) {
		return AsyncStorage.multiGet(keys).then(values => {
			return values.map(val => {
				return JSON.parse(val[1]);
			})
		})
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

export default deviceStorage;
