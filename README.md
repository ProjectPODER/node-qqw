# Qqw for Node.js

An asynchronous client library for the Qqw [REST](https://quienesquien.wiki/api/v1) API.

```javascript
var Qqw = require('qqw');

var client = new Qqw();

var params = {name: 'accel', text: true, fields: 'name,score'};
client.get('organizations', params, function(error, organizations, response) {
  console.log(organizations);
});
```

## Installation

`npm install git+ssh://git@gitlab.rindecuentas.org:2203/equipo-qqw/node-qqw.git`

## Quick Start

You will need valid Qqw credentials in the form of a valid user.  You can get these [here](https://quienesquien.wiki/).  Do not forgot to adjust your permissions - POST request require write permissions.

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

## Build for the browser

```javascript
npm install -g browserify
npm run build
```
