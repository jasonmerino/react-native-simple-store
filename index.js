var React = require('react-native');

var {
	AsyncStorage
} = React;

var deviceStorage = {
	get(key) {
		return AsyncStorage.getItem(key).then(function(value) {
			return JSON.parse(value);
		});
	},

	save(key, value) {
		return AsyncStorage.setItem(key, JSON.stringify(value));
	},

	update(key, value) {
		return deviceStorage.get(key).then((item) => {
			return AsyncStorage.setItem(key, JSON.stringify(Object.assign({}, item, value)));
		});
	},

	delete(key) {
		return AsyncStorage.removeItem(key);
	}
};

module.exports = deviceStorage;