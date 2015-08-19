require('regenerator/runtime');
var React = require('react-native');

var {
	AsyncStorage
} = React;

var deviceStorage = {
	async get(key) {
		return JSON.parse(await AsyncStorage.getItem(key));
	},

	async save(key, value) {
		return await AsyncStorage.setItem(key, JSON.stringify(value));
	},

	async update(key, value) {
		return await deviceStorage.get(key).then((item) => {
			return AsyncStorage.setItem(key, JSON.stringify(Object.assign({}, item, value)));
		});
	},

	async delete(key) {
		return await AsyncStorage.removeItem(key);
	}
};

module.exports = deviceStorage;