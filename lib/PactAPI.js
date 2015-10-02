'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _resourcesRecurrables = require('./resources/Recurrables');

var _resourcesRecurrables2 = _interopRequireDefault(_resourcesRecurrables);

var _resourcesOrderItems = require('./resources/OrderItems');

var _resourcesOrderItems2 = _interopRequireDefault(_resourcesOrderItems);

var _resourcesAddresses = require('./resources/Addresses');

var _resourcesAddresses2 = _interopRequireDefault(_resourcesAddresses);

var _resourcesProducts = require('./resources/Products');

var _resourcesProducts2 = _interopRequireDefault(_resourcesProducts);

var _resourcesAccount = require('./resources/Account');

var _resourcesAccount2 = _interopRequireDefault(_resourcesAccount);

var _resourcesBundles = require('./resources/Bundles');

var _resourcesBundles2 = _interopRequireDefault(_resourcesBundles);

var _resourcesOrders = require('./resources/Orders');

var _resourcesOrders2 = _interopRequireDefault(_resourcesOrders);

var _resourcesToken = require('./resources/Token');

var _resourcesToken2 = _interopRequireDefault(_resourcesToken);

var _resourcesPing = require('./resources/Ping');

var _resourcesPing2 = _interopRequireDefault(_resourcesPing);

var resources = {
  Recurrables: _resourcesRecurrables2['default'],
  OrderItems: _resourcesOrderItems2['default'],
  Addresses: _resourcesAddresses2['default'],
  Products: _resourcesProducts2['default'],
  Account: _resourcesAccount2['default'],
  Bundles: _resourcesBundles2['default'],
  Orders: _resourcesOrders2['default'],
  Token: _resourcesToken2['default'],
  Ping: _resourcesPing2['default']
};

var PactAPI = (function () {
  function PactAPI(token) {
    var version = arguments.length <= 1 || arguments[1] === undefined ? PactAPI.DEFAULT_VERSION : arguments[1];
    var base = arguments.length <= 2 || arguments[2] === undefined ? PactAPI.DEFAULT_BASE : arguments[2];

    _classCallCheck(this, PactAPI);

    this._api = {
      version: version,
      token: token,
      base: base
    };
    this._prepResources();
  }

  PactAPI.prototype.getAPIField = function getAPIField(k) {
    return this._api[k];
  };

  PactAPI.prototype.setAPIVersion = function setAPIVersion(version) {
    if (version) {
      this._api.version = version;
      this._prepResources();
    }
  };

  PactAPI.prototype.setAPIToken = function setAPIToken(token) {
    this._api.token = token;
    this._prepResources();
  };

  PactAPI.prototype.setAPIBase = function setAPIBase(base) {
    if (base) {
      this._api.base = base;
      this._prepResources();
    }
  };

  PactAPI.prototype.setErrorHandler = function setErrorHandler(callback) {
    if (callback && typeof callback === 'function') {
      this._api.errorHandler = callback;
    }
  };

  PactAPI.prototype._prepResources = function _prepResources() {
    var _this = this;

    _Object$keys(resources).forEach(function (name) {
      _this[name[0].toLowerCase() + name.substring(1)] = new resources[name](_this);
    });
  };

  return PactAPI;
})();

exports['default'] = PactAPI;

PactAPI.DEFAULT_HOST = 'https://api.pactcoffee.com';
PactAPI.DEFAULT_VERSION = 'v1';
module.exports = exports['default'];