import request from 'superagent';

export default class HTTPRequestable {
  constructor(token = null) {
    this.token = token;
  }
  _get(url, callback) {
    const req = request.get(url);
    if (this.token) {
      req.auth(this.token, '');
    }
    req.end(callback);
  }
  _post(url, payload, callback) {
    const req = request.post(url);
    if (this.token) {
      req.auth(this.token, '');
    }
    req
      .send(payload)
      .end(callback);
  }
  _put(url, payload, callback) {
    const req = request.put(url);
    if (this.token) {
      req.auth(this.token, '');
    }
    req.send(payload)
      .end(callback);
  }
  _del(url, callback) {
    const req = request.del(url);
    if (this.token) {
      req.auth(this.token, '');
    }
    req.end(callback);
  }
  setToken(token) {
    this.token = token;
  }
}
