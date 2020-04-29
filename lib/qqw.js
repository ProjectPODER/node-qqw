'use strict';

/**
 * Module dependencies
 */

var url = require('url');
var request = require('request');
var extend = require('deep-extend');

// Package version
var VERSION = require('../package.json').version;

function Qqw(options) {
  if (!(this instanceof Qqw)) { return new Qqw(options) }

  this.VERSION = VERSION;

  // Merge the default options with the client submitted options
  this.options = extend({
    username: null,
    password: null,
    rest_base: 'https://api.quienesquien.wiki/v2',
    request_options: {
      headers: {
        Accept: '*/*',
        Connection: 'close',
        'User-Agent': 'node-qqw/' + VERSION,
        'X-Auth-Token': null,
        'X-User-Id': null
      },
      timeout: 5000
    }
  }, options);

  //
  // if (this.options.username){
  //   var auth_options = {
  //     username: this.options.username,
  //     password: this.options.password
  //   };
  //
  //   var url = this.options.rest_base+ '/login';
  //   var options = this.options;
  //
  //   request.post({ url: url, form: auth_options, json: true }, function(err, httpResponse, body){
  //     options.request_options.headers['X-Auth-Token'] = body.data.authToken;
  //     options.request_options.headers['X-User-Id'] = body.data.userId;
  //   });
  // }

  // Configure default request options
  this.request = request.defaults(
    this.options.request_options
  );

}

Qqw.prototype.__buildEndpoint = function(path, base) {
  var bases = {
    'rest': this.options.rest_base,
  };
  var endpoint = (bases.hasOwnProperty(base)) ? bases[base] : bases.rest;
  if (url.parse(path).protocol) {
    endpoint = path;
  }
  else {
    // If the path begins with media or /media
    endpoint += (path.charAt(0) === '/') ? path : '/' + path;
  }

  // Remove trailing slash
  endpoint = endpoint.replace(/\/$/, '');

  // Add json extension if not provided in call
  //endpoint += (path.split('.').pop() !== 'json') ? '.json' : '';

  return endpoint;
};

Qqw.prototype.__request = function(method, path, params, callback) {
  var base = 'rest';

  // Set the callback if no params are passed
  if (typeof params === 'function') {
    callback = params;
    params = {};
  }

  // Set API base
  if (typeof params.base !== 'undefined') {
    base = params.base;
    delete params.base;
  }

  // Build the options to pass to our custom request object
  var options = {
    method: method.toLowerCase(),  // Request method - get || post
    url: this.__buildEndpoint(path, base) // Generate url
  };

  // Pass url parameters if get
  if (method === 'get') {
    options.qs = params;
  }

  // Pass form data if post
  // if (method === 'post') {
  //   var formKey = 'form';
  //
  //   options[formKey] = params;
  // }

  console.log("node-qqw API request:",options);

  this.request(options, function(error, response, data) {
    // console.log("node-qqw API response:",error,response,data);
    console.log("node-qqw API response:",response.request.uri.href);

    // request error
    if (error) {
      return callback(error, data, response);
    }

    // JSON parse error or empty strings
    try {
      // console.log("node-qqw API response:",response.request.href);
      // An empty string is a valid response
      if (data === '') {
        data = {};
      }
      else {
        data = JSON.parse(data);
        data.api_url = response.request.href;
      }
    }
    catch(parseError) {
      return callback(
        new Error('JSON parseError with HTTP Status: ' + response.statusCode + ' ' + response.statusMessage),
        data,
        response
      );
    }


    // response object errors
    // This should return an error object not an array of errors
    if (data.errors !== undefined) {
      return callback(data.errors, data, response);
    }

    // status code errors
    if(response.statusCode < 200 || response.statusCode > 299) {
      return callback(
        new Error('HTTP Error: ' + response.statusCode + ' ' + response.statusMessage),
        data,
        response
      );
    }
    // no errors
    // console.log("qqw request:",null, data, response)
    callback(null, data, response);
  });

};

/**
 * GET
 */
Qqw.prototype.get = function(url, params, callback) {
  return this.__request('get', url, params, callback);
};

/**
 * GET PROMISE
 */
Qqw.prototype.get_promise = function(url, params) {
  let self = this;
  return new Promise(function(resolve) {
    self.get(url, params, function(error,data,response) { resolve({"error": error, "data": data, "response": response}) });
  });
};

/**
 * POST
 */
// Qqw.prototype.post = function(url, params, callback) {
//   var self = this;
//   var t = setInterval(function(){
//     if (self.options.request_options.headers['X-Auth-Token']) {
//       clearInterval(t);
//       return self.__request('post', url, params, callback);
//     }
//   }, 100)
// };

/**
 * PATCH
 */
// Qqw.prototype.patch = function(url, params, callback) {
//   var self = this;
//   var t = setInterval(function(){
//     if (self.options.request_options.headers['X-Auth-Token']) {
//       clearInterval(t);
//       return self.__request('patch', url, params, callback);
//     }
//   }, 100)
// };


module.exports = Qqw;
