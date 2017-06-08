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

## Example Usage

### Save New Data
We'll use two different ways to create new persistent storage under the key 'albums'. First example creates an object, the second creates an array.

```
store.save('albums', {
	
})
```


## License

MIT
