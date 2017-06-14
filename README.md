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

### Save and Retrieval

	// Save some data as an object named 'album' to
	// a users device.
	   
    store.save('album', {
	    artist: 'Twenty One Pilots'
	})
	
	// Retrieve the object from the user's device
	store.get('album')
	.then((res) =>
		console.log(res.artist) // 'Twenty One Pilots'
	)





## License

MIT
