'use strict';

function getTestData() {
	return {
		isATest: true
	};
}

function multiGetTestData() {
	return [
		['key1', JSON.stringify({valor: 1})],
		['key2', JSON.stringify({valor: 2})]
	];
};

const INDEX_PATH = '../src/index';

jest.unmock(INDEX_PATH);

jest.setMock('react-native', {
	AsyncStorage: {
		setItem: jest.fn(() => {
			return new Promise((resolve, reject) => {
				resolve(null);
			});
		}),
		getItem: jest.fn(() => {
			return new Promise((resolve, reject) => {
				resolve(JSON.stringify(getTestData()));
			});
		}),
		multiGet: jest.fn(() => {
			return new Promise((resolve, reject) => {
				resolve(multiGetTestData());
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
		})
	}
});

describe('save', function() {

	it('should return a promise with no errors', function() {
		var store = require(INDEX_PATH);
		return store.save('testing', getTestData()).then(function(error) {
			expect(error).toEqual(null);
		});
	});

});

describe('get', function() {

	it('should return a promise with saved data', function() {
		var store = require(INDEX_PATH);
		return store.get('testing').then(function(error) {
			expect(error).toEqual(getTestData());
		});
	});

	it('should return a promise with saved data', function() {
		var store = require(INDEX_PATH);
		return store.get(['testing', 'testing']).then(function(error) {
			expect(error).toEqual([{valor: 1}, {valor: 2}]);
		});
	});

});

describe('update', function() {

	pit('should return a promise with no errors', function() {
		var store = require(INDEX_PATH);
		return store.update('testing', {
			isAGoodTest: false
		}).then(function(error) {
			expect(error).toEqual(null);
		});
	});

	pit('should handle a string and return a promise with no errors', function() {
		var store = require(INDEX_PATH);
		return store.update('testing', 'asdf').then(function(error) {
			expect(error).toEqual(null);
		});
	});

});

describe('delete', function() {

	pit('should return a promise with no errors', function() {
		var store = require(INDEX_PATH);
		return store.delete('testing').then(function(error) {
			expect(error).toEqual(null);
		});
	});

});

describe('keys', function() {
	it('should return the keys', () => {
		var store = require(INDEX_PATH);
		return store.keys().then((keys) => {
			expect(keys).toEqual(['one', 'two', 'three']);
		});
	});
});
