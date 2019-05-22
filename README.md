# React Native Simple Store

[![Code Climate](https://codeclimate.com/github/jasonmerino/react-native-simple-store/badges/gpa.svg)](https://codeclimate.com/github/jasonmerino/react-native-simple-store)
[![Build Status](https://travis-ci.org/jasonmerino/react-native-simple-store.svg?branch=master)](https://travis-ci.org/jasonmerino/react-native-simple-store)
[![npm version](https://badge.fury.io/js/react-native-simple-store.svg)](http://badge.fury.io/js/react-native-simple-store)
[![npm](https://img.shields.io/npm/dm/localeval.svg)](https://www.npmjs.com/package/react-native-simple-store)

A minimalistic wrapper around React Native's AsyncStorage.

_The `react-native-simple-store` is a good match for apps that are **not using redux**. If you have already found that your app needs to use redux and you need to persist data to the device it is recommended that you make use of [redux-persist](https://github.com/rt2zz/redux-persist) which provides a clean interface for storing data in your reducers to device._ 

## Installation
```bash
npm install react-native-simple-store
```

Since this wrapper uses [react-native-async-storage](https://github.com/react-native-community/react-native-async-storage), it needs to be linked to work properly:

```
react-native link @react-native-community/async-storage
```

## Use In Project
```
import store from 'react-native-simple-store';
```


## [API Reference](docs/index.md)
<br />

## Example Usage


----------

 - [Basic Object Handling](#working-with-objects)
 - [Basic Array Handling](#working-with-arrays)
 - [Chaining Methods/Error Handling](#chaining)
 - [Deleting](#deleting-data)


### Working With Objects

----------
React-native-simple-store allows you to easily store data by assigning it a unique key. We will show you a few examples of just how easy it is to get started.


#### Saving and Retrieval



#### Updating
	// Update the object stored under the key 'album'. We will add a new property of 'albumName' to this object.
	store.update('album', {
		albumName: 'Blurry Face'
	})

	// Get updated object
	store.get('album')
	.then((res) =>
		console.log(res.albumName) // 'Blurry Face'
	)

	// Our object stored under the key 'album' now looks like this
	{
	artist: 'Twenty One Pilots',
		albumName: 'Blurry Face'
	}


<a name="arrays"></a>
### Working With Arrays

----------
Arrays are easy to work with using react-native-simple-store's built-in "push" method. You can use the "push" method to create an array, or add data to the array. Behind the scene's react-native-simple-store will check if an array exists under the key you specified, if it does, it will add the new specified data to the existing array. If it does not exist, it will create the array for you.


#### Array Creation
	// Save an array to the users device. We will give it the key 'shoppingList' for easy retrieval
	store.push('shoppingList', 'milk')

	// ['milk'] is created and stored on the users device


#### Retrieval and Updating
	// Get the array from the users device
	store.get('shoppingList')
	.then((res) =>
		console.log(res) // ['milk']
	)

	// Add data to 'shoppingList'
	store.push('shoppingList', 'coffee')

	// Retrieve new array
	store.get('shoppingList')
	.then((res) =>
		console.log(res) // ['milk', 'coffee']
	)


#### More "Advanced" Example
Instead of storing strings in an array like the above example, let's store objects. We will create a new array to store on the user's device named 'artists'.

	const femaleArtist = {
		name: 'Lady Gaga',
		age: 31,
		gender: 'female'
	}

	const maleArtist = {
		name: 'The Weeknd',
		age: 27,
		gender: 'male'
	}

	store.push('artists', femaleArtist) // Creates a new array, and inserts this object into it.
	store.push('artists', maleArtist) // Adds this new object to the end of the array.

	// Our new array will look like this when we retrieve it
	[
		{
			name: 'Lady Gaga',
			age: 31,
			gender: 'female'
		},
		{
			name: 'The Weeknd',
			age: 27,
			gender: 'male'
		}
	]



### Chaining

----------
You can chain these methods as much as you'd like, as well as catch errors. Here is a lengthy example for you to reference.

	store
		.save('coffee', {
			isAwesome: true
		})
		.then(() => store.get('coffee'))
		.then(coffee => {
			console.assert(coffee.isAwesome === true);
		})
		.then(() => store.update('coffee', {
			isNotEssential: false
		}))
		.then(() => store.get('coffee'))
		.then(coffee => {
			console.assert(coffee.isNotEssential === false);
			console.assert(coffee.isAwesome === true);
			return store.delete('coffee');
		})
		.then(() => store.get('coffee'))
		.then(coffee => {
			console.assert(coffee === null);
		})
		.catch(error => {
			console.error(error.message);
		});

	// using the .push method for storing arrays
	store
		.save('coffeeTraits', ['rich'])
		.then(store.push('coffeeTraits', 'smooth'))
		.then(store.get('coffeeTraits'))
		.then(console.log) // ['rich', 'smooth']



### Deleting Data

----------
Deleting the data on the user's device is just as easy. Just insert the key of the data you want to remove as the argument to the "delete" method, and you are done!

	store.delete('album') // Bye bye


## License

MIT
