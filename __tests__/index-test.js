
function getTestData() {
	return {
		isATest: true,
		hasNestedData: {
			ohYeah: 'it\s true',
		}
	};
}

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
			return new Promise((resolve, reject) => {
				resolve(null);
			});
		}),
		multiSet:  jest.fn(() => {
			return new Promise((resolve, reject) => {
				resolve(null);
			});
		}),
		getItem: jest.fn(testKey => {
			let returnValue = {
				testing: JSON.stringify(getTestData()),
				testingDefault: null
			};

			return new Promise((resolve, reject) => {
				resolve(returnValue[testKey]);
			});
		}),
		multiGet: jest.fn(testKeys => {
			let returnValue = {
				testing: multiGetTestData(),
				testingDefault: [['testingDefault', null], ['testingDefault', null]]
			}
			return new Promise((resolve, reject) => {
				resolve(returnValue[testKeys[1]]);
			});
		}),
		removeItem: jest.fn(() => {
			return new Promise((resolve, reject) => {
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


describe('save', () => {

	it('should return a promise with no errors', () => {
		const { AsyncStorage } = require('react-native');
		const store = require(INDEX_PATH);
		return store.save('testing', getTestData()).then((error) => {
			expect(error).toEqual(null);
			expect(AsyncStorage.setItem).toBeCalledWith('testing', JSON.stringify(getTestData()));
		});
	});

	it('should return a promise with no errors', () => {
		const { AsyncStorage } = require('react-native');
		const store = require(INDEX_PATH);
		const result = [
			['key1', JSON.stringify({ valor: 1 })],
			['key2', JSON.stringify({ valor: 2 })],
		];
		return store.save(multiSaveTestData()).then((error) => {
			expect(error).toEqual(null);
			expect(AsyncStorage.multiSet).toBeCalledWith(result);
		});
	});

});

describe('get', () => {

	const { AsyncStorage } = require('react-native');
	const store = require(INDEX_PATH);

	it('should return a promise with saved data', () => {
		return store.get('testing').then((error) => {
			expect(error).toEqual(getTestData());
			expect(AsyncStorage.getItem).toBeCalledWith('testing');
		});
	});

	it('should return the default value if no saved data', () => {
		return store.get('testingDefault', 'defaultValue').then(result => {
			expect(result).toEqual('defaultValue');
			expect(AsyncStorage.getItem).toBeCalledWith('testingDefault');
		});
	});

	it('should return a promise with saved data', () => {
		return store.get(['testing', 'testing']).then((error) => {
			expect(error).toEqual([{valor: 1}, {valor: 2}]);
			expect(AsyncStorage.multiGet).toBeCalledWith(['testing', 'testing']);
		});
	});

	it('should return the default value for multiple keys if no saved data', () => {
		return store.get(['testingDefault', 'testingDefault'], 'defaultValue').then(result => {
			expect(result).toEqual(['defaultValue', 'defaultValue']);
			expect(AsyncStorage.multiGet).toBeCalledWith(['testingDefault', 'testingDefault']);
		});
	});

	it('should return the default value for multiple keys if no saved data', () => {
		return store.get(['testingDefault', 'testingDefault'], ['defaultValue1', 'defaultValue2']).then(result => {
			expect(result).toEqual(['defaultValue1', 'defaultValue2']);
			expect(AsyncStorage.multiGet).toBeCalledWith(['testingDefault', 'testingDefault']);
		});
	});

});

describe('update', () => {

	it('should return a promise with no errors', () => {
		const { AsyncStorage } = require('react-native');
		const store = require(INDEX_PATH);
		return store.update('testing', {
			isAGoodTest: false,
			hasNestedData: {
				boom: true,
			},
		}).then((error) => {
			expect(error).toEqual(null);
			expect(AsyncStorage.setItem).toBeCalledWith('testing', JSON.stringify({
				isATest: true,
				hasNestedData: {
					ohYeah: 'it\s true',
					boom: true,
				},
				isAGoodTest: false,
			}));
		});
	});

	it('should handle a string and return a promise with no errors', () => {
		const { AsyncStorage } = require('react-native');
		const store = require(INDEX_PATH);
		return store.update('testing', 'asdf').then((error) => {
			expect(error).toEqual(null);
			expect(AsyncStorage.setItem).toBeCalledWith('testing', JSON.stringify('asdf'));
		});
	});

});

describe('delete', () => {

	it('should return a promise with no errors', () => {
		const { AsyncStorage } = require('react-native');
		const store = require(INDEX_PATH);
		return store.delete('testing').then((error) => {
			expect(error).toEqual(null);
			expect(AsyncStorage.removeItem).toBeCalledWith('testing');
		});
	});

  it('should handle an array of keys', () => {
		const { AsyncStorage } = require('react-native');
		const store = require(INDEX_PATH);
		const keys = ['thingOne', 'thingTwo'];
		return store.delete(keys).then((error) => {
			expect(error).toEqual(null);
			expect(AsyncStorage.multiRemove).toBeCalledWith(keys);
		});
	});

});

describe('keys', () => {
	it('should return the keys', () => {
		const { AsyncStorage } = require('react-native');
		const store = require(INDEX_PATH);
		return store.keys().then((keys) => {
			expect(keys).toEqual(['one', 'two', 'three']);
			expect(AsyncStorage.getAllKeys).toBeCalled();
		});
	});
});
