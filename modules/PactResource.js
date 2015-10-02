import request from 'superagent';

import pactMethod from './pactMethod';
import methodTypes from './methodTypes';

const basicMethods = {
  // List records from the API
  list: pactMethod({
    method: methodTypes.GET,
  }),
  // Retrieve a specific record from the API
  retrieve: pactMethod({
    method: methodTypes.GET,
    urlParams: ['id'],
    path: '{id}',
  }),
  // Create a record
  create: pactMethod({
    method: methodTypes.POST,
  }),
  // Update an existing record
  update: pactMethod({
    method: methodTypes.PATCH,
    urlParams: ['id'],
    path: '{id}',
  }),
  // Delete a record
  del: pactMethod({
    method: methodTypes.DELETE,
    urlParams: ['id'],
    path: '{id}',
  }),
};

export default class PactResource {
  constructor({pactAPI, path, includeBasic = [], methods = []}) {
    if (!pactAPI) {
      throw new Error(
        `PactResource: Expected PactAPI instance, got "${pactAPI}"`
      );
    }
    if (!path) {
      throw new Error(
        `PactResource: Expected path, got "${path}"`
      );
    }

    this._pactAPI = pactAPI;
    this.path = path;

    Object.keys(methods).forEach(k => {
      this[k] = methods[k];
    });

    if (includeBasic) {
      includeBasic.forEach(method => {
        if (!basicMethods[method]) {
          throw new Error(
            `PactResource: No basic method exists for "${method}". Your options are ${Object.keys(basicMethods)}`
          );
        }
        this[method] = basicMethods[method];
      }, this);
    }
  }

  _request(method, path, payload) {
    const base = this._pactAPI.getAPIField('base');
    const version = this._pactAPI.getAPIField('version');
    const token = this._pactAPI.getAPIField('token');
    const errorHandler = this._pactAPI.getAPIField('errorHandler');
    const url = `${base}/${version}${path}`;

    return new Promise((resolve, reject) => {
      const req = request[method](url);
      if (payload) {
        req.send(payload);
      }
      if (token) {
        req.auth(token, '');
      }
      req.end((err, res) => {
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
  }
}
