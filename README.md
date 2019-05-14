# Qqw for Node.js

An asynchronous client library for the Qqw [REST](https://api.quienesquien.wiki/api/v1/) API.

```javascript
var Qqw = require('qqw');

var client = new Qqw();

var params = {name: 'accel', fields: 'name,score'};
client.get('organizations', params, function(error, organizations, response) {
  console.log(organizations);
});
```

## Installation

`npm install https://github.com/ProjectPODER/node-qqw.git`

## Quick Start

```javascript
var Qqw = require('qqw');
```

## Requests

You now have the ability to make GET requests against the API via the convenience method.

```javascript
client.get(path, params, callback);
```

## REST API

You simply need to pass the endpoint and parameters to one of convenience methods. Take a look at the [documentation site](https://api.quienesquien.wiki/api/v1/) to reference available endpoints.

## Build for the browser

```javascript
npm install -g browserify
npm run build
```
## Authentication (DEPRECATED)

Write operations (PUT, POST, PATCH, DELETE) require credentials in the form of a valid user and formal approval from QuienEsQuien.Wiki administration. You can get these [here](https://www.quienesquien.wiki). Read operations (GET) is openly available to third parties.
