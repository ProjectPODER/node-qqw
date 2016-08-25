'use strict';

var Qqw = require('./lib/qqw.js');

var client = new Qqw();

//client.get('persons', {name: 'Motta', text: true, fields: 'name,score'}, function(error, persons, response) {
//  console.log(persons);
//});

client.get('organizations', {name: 'accel', text: true, fields: 'name,score'}, function(error, organizations, response) {
  console.log(organizations);
});
