import Recurrables from './resources/Recurrables';
import OrderItems from './resources/OrderItems';
import Addresses from './resources/Addresses';
import Products from './resources/Products';
import Account from './resources/Account';
import Bundles from './resources/Bundles';
import Orders from './resources/Orders';
import Token from './resources/Token';
import Ping from './resources/Ping';

const resources = {
  Recurrables,
  OrderItems,
  Addresses,
  Products,
  Account,
  Bundles,
  Orders,
  Token,
  Ping,
};

export default class PactAPI {
  constructor(token, version = PactAPI.DEFAULT_VERSION, base = PactAPI.DEFAULT_BASE) {
    this._api = {
      version,
      token,
      base,
    };
    this._prepResources();
  }
  getAPIField(k) {
    return this._api[k];
  }
  setAPIVersion(version) {
    if (version) {
      this._api.version = version;
      this._prepResources();
    }
  }
  setAPIToken(token) {
    this._api.token = token;
    this._prepResources();
  }
  setAPIBase(base) {
    if (base) {
      this._api.base = base;
      this._prepResources();
    }
  }
  setErrorHandler(callback) {
    if (callback && typeof callback === 'function') {
      this._api.errorHandler = callback;
    }
  }
  _prepResources() {
    Object.keys(resources).forEach(name => {
      this[
        name[0].toLowerCase() + name.substring(1)
      ] = new resources[name](this);
    });
  }
}

PactAPI.DEFAULT_HOST = 'https://api.pactcoffee.com';
PactAPI.DEFAULT_VERSION = 'v1';
