# React Native Simple Store

[![Code Climate](https://codeclimate.com/github/jasonmerino/react-native-simple-store/badges/gpa.svg)](https://codeclimate.com/github/jasonmerino/react-native-simple-store)
[![Build Status](https://travis-ci.org/jasonmerino/react-native-simple-store.svg?branch=master)](https://travis-ci.org/jasonmerino/react-native-simple-store)
[![npm version](https://badge.fury.io/js/react-native-simple-store.svg)](http://badge.fury.io/js/react-native-simple-store)
[![npm](https://img.shields.io/npm/dm/localeval.svg)](https://www.npmjs.com/package/react-native-simple-store)

A minimalistic wrapper around React Native's AsyncStorage.

## Installation

```bash
npm install react-native-simple-store
```

## Use In Project
```
import store from 'react-native-simple-store;
```

### Example Usage


----------

 - [Basic Object Handling](#objects)
 - [Basic Array Handling](#arrays)
 - [Chaining Methods/Error Handling](#chaining)



### Working With Objects

----------
React-native-simple-store allows you to easily store data by assigning it a unique key. We will show you a few examples of just how easy it is to get started.

#### Save and Retrieval

	// Save an object to a users device. We will assign it a key of 'album' for easy retrieval	   
    store.save('album', {
	   artist: 'Twenty One Pilots'
	})
	
	// Retrieve the object from the user's device
	store.get('album')
	.then((res) =>
	   console.log(res.artist) // 'Twenty One Pilots'
	)
	
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


### Working With Arrays

----------
Arrays are easy to work with using react-native-simple-store's built-in "push" method. You can use the "push" method to create an array, or add data to the array. Behind the scene's react-native-simple-store will check if an array exists under the key you specified, if it does, it will add the new specified data to the existing array. If it does not exist, it will create the array for you.

#### Array Creation
	// Save an array to the users device. We will give it the key 'shoppingList' for easy retrieval
	
	store.push('shoppingList', 'milk') // ['milk'] is created and stored on the users device



## License

MIT
