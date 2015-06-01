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


Available Methods
=================

- `getOrders(:userId)`


Core APIs
---------

1. Hit http://petstore.swagger.io
1. Enter `https://pact-core.herokuapp.com/v1/api_docs` into the input
1. View docs

PactApp APIs
------------

Umm...


Running tests
-------------
