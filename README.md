# React Native Simple Store

A minimalistic wrapper around React Native's AsyncStorage.

## Installation

1. Install `react-native-data-store`

```bash
npm install react-native-data-store
```

## API Reference

`.save([String key], [Object|String value]) -> Promise`

Save a key and associated value.

`.get([String key]) -> Promise`

Get a value for the given key.

`.update([String key], [Object value]) -> Promise`

Update the current value for the given key with the provided value.

**Note:** *Update currently only supports objects and merges them together.*

`.delete([String key]) -> Promise`

Delete the value associated with a given key and remove the key.

## Example Usage

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
