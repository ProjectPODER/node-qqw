# Examples

* [Search](#search)

## Search

```javascript
client.get('persons', {name: 'Motta', text: true, fields: 'name,score'}, function(error, persons, response) {
  console.log(persons);
});

client.get('organizations', {name: 'accel', text: true, fields: 'name,score'}, function(error, organizations, response) {
  console.log(organizations);
});
```

## Proxy

To make requests behind a proxy, you must pass the proxy location through to the request object.  This is done by adding a `request_options` object to the configuration object.

```javascript
var Qqw = require('../lib/qqw');

var client = new Qqw({
  consumer_key: process.env.QQW_CONSUMER_KEY,
  consumer_secret: process.env.QQW_CONSUMER_SECRET,
  access_token_key: process.env.QQW_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.QQW_ACCESS_TOKEN_SECRET,
  request_options: {
    proxy: 'http://myproxyserver.com:1234'
  }
});
