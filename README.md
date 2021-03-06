PactAPI
=======

> A JS wrapper around Pact's APIs to make it faster and easier to use in client/server JS projects.

Each method returns a [promise](http://www.html5rocks.com/en/tutorials/es6/promises/). The promise will resolve to the raw output of the Pact API, or reject with a (hopefully) helpful error message.


Usage
=====

1. `npm install https://github.com/PactCoffee/pact-api`
1. Use in your project:
  ```js
  import {getOrders} from 'PactAPI';

  getOrders(myUserID).then(doStuffWithOrders, handleFailure);
  ```

**This project currently requires the use of a module build tool like browserify or webpack**. The output `dist` is simply babel transformed code to ES5. In future this will be a completely packaged dist.


Available Methods
=================

TODO


Core API docs
-------------

1. Hit http://petstore.swagger.io
1. Enter `https://core.pactcoffee.com/v1/api_docs` into the input
1. View docs

PactApp API docs
----------------

TODO


Running tests
-------------

TODO


Contributing/Building
=====================

1. Fork
1. Make changes
1. `npm run build`
1. Commit changes
1. Appropriate version bump: `npm version major|minor|patch`
1. Open a PR
