# React Native Simple Store

A minimalistic wrapper around React Native's AsyncStorage.

## Installation

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