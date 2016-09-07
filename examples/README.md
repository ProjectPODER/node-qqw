# Examples

* [POST](#POST)
* [Search](#search)
* [PATCH](#PATCH)
* [Auth](#Auth)


## POST

```javascript
client.post('persons', { name: 'Hernan Cortez' }, function(error, person, response) {
  if (error) {
    console.log(error);
  }
  console.log(person);
});
```

## Search

```javascript
client.get('persons', {name: 'Motta', text: true, fields: 'name,score'}, function(error, persons, response) {
  console.log(persons);
});

client.get('organizations', {name: 'accel', text: true, fields: 'name,score'}, function(error, organizations, response) {
  console.log(organizations);
});
```

## PATCH

`npm install fast-json-patch`

```javascript
var jsonpatch = require('fast-json-patch');

client.get('persons', {name: 'Hernan Cortez'}, function(error, original, response) {
  let left = person;
  let right = assign({}, object, { gender: 'Male' });
  let diff = jsonpatch.compare(left, right);

  client.patch('persons', diff, function(error, updated, response) {
    if (!error) {
      console.log(updated);
    }
  });

});
```

## Auth

POST and PATCH require authorization. You can provide your **username** ande **password**
to the constructor.

```javascript
var client = new Qqw({
  username: 'Angry Mob',
  password: '********'
});
```

Now your POST request (described above) should work.
