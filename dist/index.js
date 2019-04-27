"use strict";

var _lodash = _interopRequireDefault(require("lodash.merge"));

var _asyncStorage = _interopRequireDefault(require("@react-native-community/async-storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var deviceStorage = {
  /**
   * Get a one or more value for a key or array of keys from AsyncStorage
   * @param {String|Array} key A key or array of keys
   * @return {Promise}
   */
  get: function get(key) {
    if (!Array.isArray(key)) {
      return _asyncStorage["default"].getItem(key).then(function (value) {
        return JSON.parse(value);
      });
    } else {
      return _asyncStorage["default"].multiGet(key).then(function (values) {
        return values.map(function (value) {
          return JSON.parse(value[1]);
        });
      });
    }
  },

  /**
   * Save a key value pair or a series of key value pairs to AsyncStorage.
   * @param  {String|Array} key The key or an array of key/value pairs
   * @param  {Any} value The value to save
   * @return {Promise}
   */
  save: function save(key, value) {
    if (!Array.isArray(key)) {
      return _asyncStorage["default"].setItem(key, JSON.stringify(value));
    } else {
      var pairs = key.map(function (pair) {
        return [pair[0], JSON.stringify(pair[1])];
      });
      return _asyncStorage["default"].multiSet(pairs);
    }
  },

  /**
   * Updates the value in the store for a given key in AsyncStorage. If the value is a string it will be replaced. If the value is an object it will be deep merged.
   * @param  {String} key The key
   * @param  {Value} value The value to update with
   * @return {Promise}
   */
  update: function update(key, value) {
    return deviceStorage.get(key).then(function (item) {
      value = typeof value === 'string' ? value : (0, _lodash["default"])({}, item, value);
      return _asyncStorage["default"].setItem(key, JSON.stringify(value));
    });
  },

  /**
   * Delete the value for a given key in AsyncStorage.
   * @param  {String|Array} key The key or an array of keys to be deleted
   * @return {Promise}
   */
  "delete": function _delete(key) {
    if (Array.isArray(key)) {
      return _asyncStorage["default"].multiRemove(key);
    } else {
      return _asyncStorage["default"].removeItem(key);
    }
  },

  /**
   * Get all keys in AsyncStorage.
   * @return {Promise} A promise which when it resolves gets passed the saved keys in AsyncStorage.
   */
  keys: function keys() {
    return _asyncStorage["default"].getAllKeys();
  },

  /**
   * Push a value onto an array stored in AsyncStorage by key or create a new array in AsyncStorage for a key if it's not yet defined.
   * @param {String} key They key
   * @param {Any} value The value to push onto the array
   * @return {Promise}
   */
  push: function push(key, value) {
    return deviceStorage.get(key).then(function (currentValue) {
      if (currentValue === null) {
        // if there is no current value populate it with the new value
        return deviceStorage.save(key, [value]);
      }

      if (Array.isArray(currentValue)) {
        return deviceStorage.save(key, [].concat(_toConsumableArray(currentValue), [value]));
      }

      throw new Error("Existing value for key \"".concat(key, "\" must be of type null or Array, received ").concat(_typeof(currentValue), "."));
    });
  }
};
module.exports = deviceStorage;