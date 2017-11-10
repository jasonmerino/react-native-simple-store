
const returnValues = {
	arrayOne: JSON.stringify(['red', 'blue']),
	objectOne: JSON.stringify({
		isATest: true,
		hasNestedData: {
			ohYeah: 'it\'s true',
		}
	}),
	stringOne: JSON.stringify('testing string'),
	testMap: JSON.stringify({1: 'one', 2: 'two'}),
};

function multiGetTestData() {
	return [
		['key1', JSON.stringify({ valor: 1 })],
		['key2', JSON.stringify({ valor: 2 })],
	];
};

function multiSaveTestData() {
	return [
		['key1', { valor: 1 }],
		['key2', { valor: 2 }],
	];
};

const INDEX_PATH = '../src/index';

jest.unmock(INDEX_PATH);
jest.unmock('lodash.merge');

jest.mock('react-native', () => ({
	AsyncStorage: {
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
				if (returnValues[key]) {
					resolve(returnValues[key]);
				} else {
					resolve(null);
				}
			});
		}),
		multiGet: jest.fn(() => {
			return new Promise((resolve) => {
				resolve(multiGetTestData());
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
	}
}));

describe('index.js', () => {

	const { AsyncStorage } = require('react-native');
	const store = require(INDEX_PATH);

	beforeEach(() => {
		AsyncStorage.setItem.mockClear();
		AsyncStorage.multiSet.mockClear();
		AsyncStorage.getItem.mockClear();
		AsyncStorage.multiGet.mockClear();
		AsyncStorage.removeItem.mockClear();
		AsyncStorage.getAllKeys.mockClear();
		AsyncStorage.multiRemove.mockClear();
	});

	describe('save', () => {

		it('should return a promise with no errors', () => {
			return store.save('objectOne', JSON.parse(returnValues.objectOne)).then((error) => {
				expect(error).toEqual(null);
				expect(AsyncStorage.setItem).toBeCalledWith('objectOne', returnValues.objectOne);
			});
		});

		it('should return a promise with no errors', () => {
			const result = [
				['key1', JSON.stringify({ valor: 1 })],
				['key2', JSON.stringify({ valor: 2 })],
			];
			return store.save(multiSaveTestData()).then((error) => {
				expect(error).toEqual(null);
				expect(AsyncStorage.multiSet).toBeCalledWith(result);
			});
		});

		it('should save an ES6 Map as an object', () => {
			let testMap = new Map();
			testMap.set(1, 'one');
			testMap.set(2, 'two');

			return store.save('testMap', testMap).then((error) => {
				expect(error).toEqual(null);
				expect(AsyncStorage.setItem).toBeCalledWith('testMap', returnValues.testMap);
			});
		});

	});

	describe('get', () => {

		it('should return a promise with saved data', () => {
			return store.get('objectOne').then((error) => {
				expect(error).toEqual(JSON.parse(returnValues.objectOne));
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
			const { AsyncStorage } = require('react-native');
			const store = require(INDEX_PATH);
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
