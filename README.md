# React Native Simple Store

A minimalistic wrapper around React Native's AsyncStorage.

## Installation

1. Install `react-native-data-store`

```bash
npm install react-native-data-store
```

## Usage

```javascript
var store = require('react-native-data-store');

// save
store.save('coffee', {
	isAwesome: true
}).then(() => {

	// get
	store.get('coffee').then((coffee) => {
		coffee.isAwesome // true
	});

	// update
	store.update('coffee', {
		isNotEssential: false
	}).then((coffee) => {

		coffee.isNotEssential // false
		coffee.isAwesome // true

		// delete
		store.delete('coffee').then(() => {

			store.get('coffee').then((coffee) => {

				coffee // null

			});

		});

	});

});
```

## API

### `.save(key, value)`

Save a key and associated value. Returns a promise.

### `.get(key)`

Get a value for the given key. Returns a promise with value.

### `.update(key, value)`

Update the current value for the given key with the provided value. Returns a promise.

*`.update` currently only supports objects and merges them together.*

### `.delete(key)`

Delete the value associated with a given key and remove the key.
