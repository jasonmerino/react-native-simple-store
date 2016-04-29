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

## API Reference

`.save([String key], [Object|String value]) -> Promise(error)`

Save a key and associated value.

`.get([String key]) -> Promise(value)`

Get a value for the given key.

`.update([String key], [Object|String value]) -> Promise(error)`

Update the current value for the given key with the provided value. If an object is supplied as the value it gets merged into the existing object. If a string value is supplied it will replace the previous saved value.

`.delete([String key]) -> Promise(error)`

Delete the value associated with a given key and remove the key.

## Example Usage

```javascript
var store = require('react-native-simple-store');

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
```

## License

MIT
