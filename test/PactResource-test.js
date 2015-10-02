import PactResource from '../modules/PactResource';
import superagent from 'superagent';

// Stub superagent
let instance;
const mockPath = 'I love scotch. Scotchy scotch scotch. Here it goes down, down into my belly.';
const mockAPI = {
  getAPIField: (key) => key,
};

describe('PactResource', () => {
  const reqMethods = {};

  const sendSpy = sinon.stub().returns(reqMethods);
  const authSpy = sinon.stub().returns(reqMethods);
  const onSpy = sinon.stub().returns(reqMethods);
  const endSpy = sinon.stub().returns(reqMethods);

  reqMethods.send = sendSpy;
  reqMethods.auth = authSpy;
  reqMethods.on = onSpy;
  reqMethods.end = endSpy;

  describe('Constructor', () => {
    it('Accepts an options object with "pactAPI", "path", "includeBasic", and "methods" keys', () => {
      assert.doesNotThrow(() => new PactResource({
        pactAPI: mockAPI,
        path: mockPath,
        includeBasic: ['create'],
        methods: {
          noop: () => ({}),
        },
      }));
    });

    it('Must be called with a PactAPI instance so the resource can get API fields', () => {
      assert.throws(() => new PactResource());
    });

    it('Must be called with a "path" argument to set the root of the resource', () => {
      assert.throws(() => new PactResource({pactAPI: mockAPI}));
    });

    describe('"includeBasic" array argument', () => {
      it('Adds a basic method for each method given', () => {
        const basics = ['list', 'retrieve', 'create', 'update', 'del'];
        instance = new PactResource({
          pactAPI: mockAPI,
          path: mockPath,
          includeBasic: basics,
        });
        basics.forEach(basic => {
          assert.isFunction(instance[basic]);
        });
      });

      it('Throws if the method specified doesn\'t exist', () => {
        assert.throws(() => {
          instance = new PactResource({
            pactAPI: mockAPI,
            path: mockPath,
            includeBasic: ['throw trident', 'have hand grenade'],
          });
        });
      });
    });

    describe('"methods" array argument', () => {
      it('Adds the given method onto the PactResource instance', () => {
        instance = new PactResource({
          pactAPI: mockAPI,
          path: mockPath,
          methods: {
            throwTrident: () => ({}),
            haveHandGrenade: () => ({}),
          },
        });
        assert.isFunction(instance.throwTrident);
        assert.isFunction(instance.haveHandGrenade);
      });
    });
  });

  describe('When requesting...', () => {
    beforeEach(() => {
      ['get', 'put', 'post', 'del'].forEach((method) => {
        if (superagent[method].restore) {
          superagent[method].restore();
        }
        sinon.stub(superagent, method).returns(reqMethods);
      });
      sendSpy.reset();
      authSpy.reset();
      endSpy.reset();
      instance = new PactResource({
        pactAPI: mockAPI,
        path: mockPath,
      });
    });
    afterEach(() => {
      ['get', 'put', 'post', 'del'].forEach((method) => {
        if (superagent[method].restore) {
          superagent[method].restore();
        }
      });
    });

    it('Calls the correct method on superagent', () => {
      ['get', 'put', 'post', 'del'].forEach(method => {
        if (superagent[method].restore) {
          superagent[method].restore();
        }
        const spy = sinon.spy();
        sinon.stub(superagent, method, spy);

        instance._request(method, '/testPath');
        assert.ok(spy.calledWith('base/version/testPath'));
      });
    });

    it('Returns a promise', () => {
      assert.instanceOf(instance._request('get', '/testpath'), Promise);
    });


    it('Sends the payload if there is one', () => {
      const payload = {foo: 'bar'};
      instance._request('get', '/testpath', payload);
      assert.ok(sendSpy.calledWith(payload));
    });

    it('Authenticates with the token if there is one', () => {
      instance = new PactResource({
        pactAPI: {
          getAPIField: () => null,
        },
        path: mockPath,
      });
      instance._request('post', '/testPath');
      assert.notOk(authSpy.called);

      const fakes = {
        token: 'fakeToken',
      };
      instance = new PactResource({
        pactAPI: {
          getAPIField: (key) => fakes[key],
        },
        path: mockPath,
      });
      instance._request('post', '/testPath');
      assert.ok(authSpy.called);
    });

    it('Calls the error handler if there is one');
    // In future we can implement nock instead of stubbing superagent
  });
});
