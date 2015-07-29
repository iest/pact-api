/*eslint key-spacing: 0 camelcase: 0*/

'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _invariant = require('invariant');

/*
 * Example usage:
 *
 * ```js
 *  var api = new PactAPI('my api basepath');
 *  api.login(email, password).then(function(response){
 *    // Login was succesful!
 *  });
 * ```
 */

var _invariant2 = _interopRequireDefault(_invariant);

var PactAPI = (function () {
  function PactAPI(_ref) {
    var base = _ref.base;

    _classCallCheck(this, PactAPI);

    this.base = base;
    this.accessToken = null;
    this._getEndpoints = this._getEndpoints.bind(this);
  }

  _createClass(PactAPI, [{
    key: '_getEndpoints',
    value: function _getEndpoints() {
      return {
        USERS: this.base + '/users',
        PRODUCTS: this.base + '/products',
        LOGIN: this.base + '/auth/login',
        LOGOUT: this.base + '/auth/logout'
      };
    }

    // Private API
  }, {
    key: '_get',
    value: function _get(url, callback) {
      var req = _superagent2['default'].get(url);
      if (this.accessToken) {
        req.set('Authorization', this.accessToken);
      }
      req.end(callback);
    }
  }, {
    key: '_post',
    value: function _post(url, payload, callback) {
      var req = _superagent2['default'].post(url);
      if (this.accessToken) {
        req.set('Authorization', this.accessToken);
      }
      req.type('form').send(payload).end(callback);
    }
  }, {
    key: '_put',
    value: function _put(url, payload, callback) {
      var req = _superagent2['default'].put(url);
      if (this.accessToken) {
        req.set('Authorization', this.accessToken);
      }
      req.send(payload).end(callback);
    }
  }, {
    key: '_del',
    value: function _del(url, callback) {
      var req = _superagent2['default'].del(url);
      if (this.accessToken) {
        req.set('Authorization', this.accessToken);
      }
      req.end(callback);
    }

    /*
     * Set the `access_token` to be used on all requests.
     *
     * An `access_token` will be in the response to a successful `login`. If you
     * wish to perform auth-requiring requests, you need to manually set the
     * access token with this method.
     */
  }, {
    key: 'setAccessToken',
    value: function setAccessToken(token) {
      (0, _invariant2['default'])(token, 'PactAPI.setAccessToken(...): You must supply a valid token');
      this.accessToken = token;
    }

    /*
     * Set the base URL to be used by the instance.
     */
  }, {
    key: 'setBase',
    value: function setBase(base) {
      (0, _invariant2['default'])(base, 'PactAPI.setBase(...): You must supply a base');
      this.base = base;
    }

    /* Log a user in */
  }, {
    key: 'login',
    value: function login(_login, password) {
      (0, _invariant2['default'])(_login && password, 'PactAPI.login(...): You must supply a valid login and password.\n      You passed "' + _login + '" and "' + password + '".');

      var _getEndpoints = this._getEndpoints;

      var _post = this._post.bind(this);
      return new _Promise(function (resolve, reject) {
        _post(_getEndpoints().LOGIN, {
          login: _login,
          password: password
        }, function (err, res) {
          if (err) {
            reject(err);
            return;
          }
          resolve(_extends({}, res.body, {
            user_id: '' + res.body.user_id // kinda hacky but we need a string
          }));
        });
      });
    }

    /* Log a user out */
  }, {
    key: 'logout',
    value: function logout(access_code) {
      (0, _invariant2['default'])(access_code, 'PactAPI.logout(...): You must supply a valid access code.\n      You passed "' + access_code + '".');

      var _getEndpoints = this._getEndpoints;

      var _post = this._post.bind(this);
      return new _Promise(function (resolve, reject) {
        _post(_getEndpoints().LOGOUT, { access_code: access_code }, function (err, res) {
          if (err) {
            reject(err);
            return;
          }
          resolve(res.body);
        });
      });
    }

    /* Get all the orders for a user */
  }, {
    key: 'getOrders',
    value: function getOrders(userId) {
      (0, _invariant2['default'])(userId, 'PactAPI.getOrders(...): You must supply a valid user ID.\n      You passed "' + userId + '".');

      var _getEndpoints = this._getEndpoints;

      var _get = this._get.bind(this);
      return new _Promise(function (resolve, reject) {
        _get(_getEndpoints().USERS + '/' + userId + '/orders', function (err, res) {
          if (err) {
            reject(err);
            return;
          }
          resolve(res.body);
        });
      });
    }

    /*
     * Update the dispatch date for an order.
     * `yearMonthDayString` is in the format of `YYYY-MM-DD`.
     */
  }, {
    key: 'updateOrderDispatchDate',
    value: function updateOrderDispatchDate(_ref2) {
      var userId = _ref2.userId;
      var orderId = _ref2.orderId;
      var yearMonthDayString = _ref2.yearMonthDayString;

      (0, _invariant2['default'])(userId && orderId && yearMonthDayString, 'PactAPI.getOrders(...): You must supply valid arguments.\n      You passed "' + userId + '", "' + orderId + '", and "' + yearMonthDayString + '".');
      (0, _invariant2['default'])(yearMonthDayString.split('-').length === 3, 'PactAPI.updateOrderDispatchDate(...): You must supply a valid yearMonthDayString with the signature YYYY-MM-DD.');

      var _getEndpoints = this._getEndpoints;

      var _put = this._put.bind(this);
      return new _Promise(function (resolve, reject) {
        _put(_getEndpoints().USERS + '/' + userId + '/orders/' + orderId, {
          'order[dispatch_date]': yearMonthDayString
        }, function (err, res) {
          if (err) {
            reject(err);
            return;
          }
          resolve(res.body);
        });
      });
    }
  }, {
    key: 'updateOrderCoffee',
    value: function updateOrderCoffee(_ref3) {
      var userId = _ref3.userId;
      var orderId = _ref3.orderId;
      var itemId = _ref3.itemId;
      var productId = _ref3.productId;
      var coffeeId = _ref3.coffeeId;
      var preparation = _ref3.preparation;
      var _getEndpoints = this._getEndpoints;

      var _getEndpoints2 = _getEndpoints();

      var USERS = _getEndpoints2.USERS;

      var _put = this._put.bind(this);
      return new _Promise(function (resolve, reject) {
        _put(USERS + '/' + userId + '/orders/' + orderId + '/items/' + itemId, {
          'item[product_attributes][id]': productId,
          'item[product_attributes][options][preparation]': preparation,
          'item[product_attributes][options][coffee_type_id]': coffeeId
        }, function (err, res) {
          if (err) {
            reject(err);
            return;
          }
          resolve(res.body);
        });
      });
    }

    /* Fetch all the products */
  }, {
    key: 'getProducts',
    value: function getProducts() {
      var _getEndpoints = this._getEndpoints;

      var _get = this._get.bind(this);
      return new _Promise(function (resolve, reject) {
        _get(_getEndpoints().PRODUCTS, function (err, res) {
          if (err) {
            reject(err);
            return;
          }
          resolve(res.body);
        });
      });
    }
  }]);

  return PactAPI;
})();

exports['default'] = PactAPI;
module.exports = exports['default'];