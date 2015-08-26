var Q = require('q');

function getTestData() {
	return {
		isATest: true
	};
}

jest.dontMock('../index');

var reactNativeMock = jest.setMock('react-native', {
	AsyncStorage: {
		setItem: jest.genMockFunction().mockImplementation(function() {
			return Q.promise(function(resolve) {
				resolve(null);
			});
		}),
		getItem: jest.genMockFunction().mockImplementation(function() {
			return Q.promise(function(resolve) {
				resolve(JSON.stringify(getTestData()));
			})
		})
	}
});

console.log(reactNativeMock.mock);

describe('Save', function() {

	pit('should only call setItem once', function() {
		var store = require('../index');
		return store.save('testing', getTestData()).then(function(error) {
			expect(error).toEqual(null);
		});
	});

});

describe('Get', function() {

	pit('should only call setItem once', function() {
		var store = require('../index');
		return store.get('testing').then(function(error) {
			expect(error).toEqual(getTestData());
		});
	});

});