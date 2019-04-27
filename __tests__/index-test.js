const mockReturnValues = {
	arrayOne: JSON.stringify(['red', 'blue']),
	objectOne: JSON.stringify({
		isATest: true,
		hasNestedData: {
			ohYeah: 'it\'s true',
		}
	}),
	stringOne: JSON.stringify('testing string'),
};

function mockMultiGetTestData() {
	return [
		['key1', JSON.stringify({ valor: 1 })],
		['key2', JSON.stringify({ valor: 2 })],
	];
}

function mockMultiSaveTestData() {
	return [
		['key1', { valor: 1 }],
		['key2', { valor: 2 }],
	];
}

import AsyncStorage from '@react-native-community/async-storage';
jest.mock('@react-native-community/async-storage', () => ({
	setItem: jest.fn(() => {
		return new Promise((resolve) => {
			resolve(null);
		});
	}),
	multiSet:  jest.fn(() => {
		return new Promise((resolve) => {
			resolve(null);
		});
	}),
	getItem: jest.fn((key) => {
		return new Promise((resolve) => {
			if (mockReturnValues[key]) {
				resolve(mockReturnValues[key]);
			} else {
				resolve(null);
			}
		});
	}),
	multiGet: jest.fn(() => {
		return new Promise((resolve) => {
			resolve(mockMultiGetTestData());
		});
	}),
	removeItem: jest.fn(() => {
		return new Promise((resolve) => {
			resolve(null);
		});
	}),
	getAllKeys: jest.fn(() => {
		return new Promise((resolve) => {
			resolve(['one', 'two', 'three']);
		});
	}),
	multiRemove: jest.fn(() => ({
		then: jest.fn(),
	})),
}));

import store from "../src/index";
jest.unmock("../src/index");
jest.unmock('lodash.merge');

describe('index.js', () => {

	describe('save', () => {

		it('should return a promise with no errors', () => {
			return store.save('objectOne', JSON.parse(mockReturnValues.objectOne)).then((error) => {
				expect(error).toEqual(null);
				expect(AsyncStorage.setItem).toBeCalledWith('objectOne', mockReturnValues.objectOne);
			});
		});

		it('should return a promise with no errors', () => {
			const result = [
				['key1', JSON.stringify({ valor: 1 })],
				['key2', JSON.stringify({ valor: 2 })],
			];
			return store.save(mockMultiSaveTestData()).then((error) => {
				expect(error).toEqual(null);
				expect(AsyncStorage.multiSet).toBeCalledWith(result);
			});
		});

	});

	describe('get', () => {

		it('should return a promise with saved data', () => {
			return store.get('objectOne').then((error) => {
				expect(error).toEqual(JSON.parse(mockReturnValues.objectOne));
				expect(AsyncStorage.getItem).toBeCalledWith('objectOne');
			});
		});

		it('should return a promise with saved data', () => {
			return store.get(['testing', 'testing']).then((error) => {
				expect(error).toEqual([{valor: 1}, {valor: 2}]);
				expect(AsyncStorage.multiGet).toBeCalledWith(['testing', 'testing']);
			});
		});

	});

	describe('update', () => {

		it('should return a promise with no errors', () => {
			return store.update('objectOne', {
				isAGoodTest: false,
				hasNestedData: {
					boom: true,
				},
			}).then((error) => {
				expect(error).toEqual(null);
				expect(AsyncStorage.setItem).toBeCalledWith('objectOne', JSON.stringify({
					isATest: true,
					hasNestedData: {
						ohYeah: 'it\'s true',
						boom: true,
					},
					isAGoodTest: false,
				}));
			});
		});

		it('should handle a string and return a promise with no errors', () => {
			return store.update('stringOne', 'asdf').then((error) => {
				expect(error).toEqual(null);
				expect(AsyncStorage.setItem).toBeCalledWith('stringOne', JSON.stringify('asdf'));
			});
		});

	});

	describe('delete', () => {

		it('should return a promise with no errors', () => {
			return store.delete('testing').then((error) => {
				expect(error).toEqual(null);
				expect(AsyncStorage.removeItem).toBeCalledWith('testing');
			});
		});

		it('should handle an array of keys', () => {
			const keys = ['thingOne', 'thingTwo'];
			return store.delete(keys).then((error) => {
				expect(error).toEqual(null);
				expect(AsyncStorage.multiRemove).toBeCalledWith(keys);
			});
		});

	});

	describe('keys', () => {
		it('should return the keys', () => {
			return store.keys().then((keys) => {
				expect(keys).toEqual(['one', 'two', 'three']);
				expect(AsyncStorage.getAllKeys).toBeCalled();
			});
		});
	});

	describe('push', () => {

		it('should handle a non-initialized key', () => {
			const key = 'arrayNonExistent';
			const value = 'green';
			return store.push(key, value).then((error) => {
				expect(error).toEqual(null);
				expect(AsyncStorage.getItem).toBeCalledWith(key);
				expect(AsyncStorage.setItem).toBeCalledWith(key, JSON.stringify([value]));
			})
		});
		it('should handle an initialized array', () => {
			const key = 'arrayOne';
			const value = 'green';
			return store.push(key, value).then((error) => {
				expect(error).toEqual(null);
				expect(AsyncStorage.getItem).toBeCalledWith(key);
				expect(AsyncStorage.setItem).toBeCalledWith(key, JSON.stringify(['red', 'blue', value]));
			})
		});
		it('should throw an error if saved value for key is neither null nor array', () => {
			const key = 'stringOne';
			const value = 'green';
			return store.push(key, value).catch((error) => {
				expect(error.message).toEqual('Existing value for key "stringOne" must be of type null or Array, received string.');
			});
		});
	});

});
