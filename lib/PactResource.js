'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _pactMethod = require('./pactMethod');

var _pactMethod2 = _interopRequireDefault(_pactMethod);

var _methodTypes = require('./methodTypes');

var _methodTypes2 = _interopRequireDefault(_methodTypes);

var basicMethods = {
  // List records from the API
  list: _pactMethod2['default']({
    method: _methodTypes2['default'].GET
  }),
  // Retrieve a specific record from the API
  retrieve: _pactMethod2['default']({
    method: _methodTypes2['default'].GET,
    urlParams: ['id'],
    path: '{id}'
  }),
  // Create a record
  create: _pactMethod2['default']({
    method: _methodTypes2['default'].POST
  }),
  // Update an existing record
  update: _pactMethod2['default']({
    method: _methodTypes2['default'].PATCH,
    urlParams: ['id'],
    path: '{id}'
  }),
  // Delete a record
  del: _pactMethod2['default']({
    method: _methodTypes2['default'].DELETE,
    urlParams: ['id'],
    path: '{id}'
  })
};

var PactResource = (function () {
  function PactResource(_ref) {
    var _this = this;

    var pactAPI = _ref.pactAPI;
    var path = _ref.path;
    var _ref$includeBasic = _ref.includeBasic;
    var includeBasic = _ref$includeBasic === undefined ? [] : _ref$includeBasic;
    var _ref$methods = _ref.methods;
    var methods = _ref$methods === undefined ? [] : _ref$methods;

    _classCallCheck(this, PactResource);

    if (!pactAPI) {
      throw new Error('PactResource: Expected PactAPI instance, got "' + pactAPI + '"');
    }
    if (!path) {
      throw new Error('PactResource: Expected path, got "' + path + '"');
    }

    this._pactAPI = pactAPI;
    this.path = path;

    _Object$keys(methods).forEach(function (k) {
      _this[k] = methods[k];
    });

    if (includeBasic) {
      includeBasic.forEach(function (method) {
        if (!basicMethods[method]) {
          throw new Error('PactResource: No basic method exists for "' + method + '". Your options are ' + _Object$keys(basicMethods));
        }
        _this[method] = basicMethods[method];
      }, this);
    }
  }

  PactResource.prototype._request = function _request(method, path, payload) {
    var base = this._pactAPI.getAPIField('base');
    var version = this._pactAPI.getAPIField('version');
    var token = this._pactAPI.getAPIField('token');
    var errorHandler = this._pactAPI.getAPIField('errorHandler');
    var url = base + '/' + version + path;

    return new _Promise(function (resolve, reject) {
      var req = _superagent2['default'][method](url);
      if (payload) {
        req.send(payload);
      }
      if (token) {
        req.auth(token, '');
      }
      req.end(function (err, res) {
        if (err) {
          if (errorHandler) {
            errorHandler(err);
          }
          reject(err);
          return;
        }
        resolve(res.body);
      });
    });
  };

  return PactResource;
})();

exports['default'] = PactResource;
module.exports = exports['default'];