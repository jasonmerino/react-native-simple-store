# React Native Simple Store

[![Build Status](https://travis-ci.org/jasonmerino/react-native-simple-store.svg?branch=master)](https://travis-ci.org/jasonmerino/react-native-simple-store)

A minimalistic wrapper around React Native's AsyncStorage.

## Installation

```bash
npm install react-native-simple-store
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
var store = require('react-native-simple-store');

// save
store.save('coffee', {
	isAwesome: true
}).then(() => {

	return store.get('coffee').then((coffee) => {
		expect(coffee.isAwesome).toBe(true);
	});

}).then(() => {

	return store.update('coffee', {
		isNotEssential: false
	})

}).then(() => {

	return store.get('coffee');

}).then((coffee) => {

	expect(coffee.isNotEssential).toBe(false);
	expect(coffee.isAwesome).toBe(true);

	return store.delete('coffee')

}).then(() => {

	store.get('coffee').then((coffee) => {

		expect(coffee).toEqual(null);

	});

});
```
