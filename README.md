# Qqw for Node.js

An asynchronous client library for the Qqw [REST](https://quienesquien.wiki/api/v1) API.

```javascript
var Qqw = require('qqw');

var params = {name: 'accel', text: true, fields: 'name,score'};
client.get('organizations', params, function(error, organizations, response) {
  console.log(organizations);
});
```

## Installation

`npm install qqw`

## Quick Start

You will need valid Qqw developer credentials in the form of a set of consumer and access tokens/keys.  You can get these [here](https://quienesquien.wiki/).  Do not forgot to adjust your permissions - most POST request require write permissions.

```javascript
var Qqw = require('qqw');
```

## Requests

You now have the ability to make GET requests against the API via the convenience method.

```javascript
client.get(path, params, callback);
```

## REST API

You simply need to pass the endpoint and parameters to one of convenience methods.  Take a look at the [documentation site](https://quienesquien.wiki/api/v1/docs.html) to reference available endpoints.
