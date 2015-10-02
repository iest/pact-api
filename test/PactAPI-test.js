import PactAPI from '../modules/PactAPI';
import superagent from 'superagent';

describe('PactAPI', () => {
  let instance;
  const fakeBase = 'Where did you get those clothes? At the toilet store?';
  const fakeToken = 'Dorothy Mantooth is a saint';
  const fakeVersion = 'Baxter';
  const fakeHandler = () => 'Go back to your home on whore island';

  beforeEach(() => {
    instance = new PactAPI();
  });

  describe('Constructor', () => {
    it('Can be used without any args', () => {
      assert.ok(new PactAPI()._api.version);
    });
    it('Can be passed an auth token', () => {
      assert.equal(new PactAPI(fakeToken)._api.token, fakeToken);
    });
    it('Can be passed a version', () => {
      instance = new PactAPI(null, fakeVersion);
      assert.equal(instance._api.version, fakeVersion);
    });
    it('Can be passed a base URL', () => {
      instance = new PactAPI(null, null, fakeBase);
      assert.equal(instance._api.base, fakeBase);
    });
  });

  describe('setAPIToken', () => {
    it('Sets the token on the instance', () => {
      instance.setAPIToken(fakeToken);
      assert.equal(instance._api.token, fakeToken);
    });
    it('Allows a falsy value', () => {
      instance.setAPIToken(false);
      assert.equal(instance._api.token, false);
      instance.setAPIToken(undefined);
      assert.equal(instance._api.token, undefined);
    })
  });

  describe('setAPIBase', () => {
    it('Sets the base URL on the instance', () => {
      instance.setAPIBase(fakeBase);
      assert.equal(instance._api.base, fakeBase);
    });
  });

  describe('setAPIVersion', () => {
    it('Sets the version on the instance', () => {
      instance.setAPIVersion(fakeVersion);
      assert.equal(instance._api.version, fakeVersion);
    });
  });

  describe('setErrorHandler', () => {
    it('Sets the given callback as an error handler on the instance', () => {
      instance.setErrorHandler(fakeHandler);
      assert.equal(instance._api.errorHandler, fakeHandler);
    });
  });

  describe('getAPIField', () => {
    it('Returns the given field from the instance', () => {
      instance.setAPIBase(fakeBase);
      instance.setAPIToken(fakeToken);
      instance.setAPIVersion(fakeVersion);
      instance.setErrorHandler(fakeHandler);
      assert.equal(instance.getAPIField('base'), fakeBase);
      assert.equal(instance.getAPIField('token'), fakeToken);
      assert.equal(instance.getAPIField('version'), fakeVersion);
      assert.equal(instance.getAPIField('errorHandler'), fakeHandler);
    });
  });

  describe('Resources', () => {
    it('Exist on the instance', () => {
      [
        'recurrables',
        'addresses',
        'products',
        'account',
        'bundles',
        'orders',
        'token',
        'ping',
      ].forEach(resource => {
        assert.isObject(instance[resource]);
      });
    });

    it('Have methods that can be called', () => {
      const mockResp = {body: 'mock response'};

      if (superagent.post.restore) {
        superagent.post.restore();
      }
      sinon.stub(superagent, 'post', (url, params, callback) => {
        callback(null, mockResp);
      });


      const prom = instance.recurrables.create();

      assert.isFulfilled(prom);
      assert.eventually.equal(prom, mockResp.body);
    });
  });
});
