//
// ycf.js
//

// variables
var Rest = require('node-rest-client').Client;
var Soap = require('soap');
var express = require('express');
var catsapi = 'http://catfacts-api.appspot.com/api/facts';
var yodaapi = 'http://www.yodaspeak.co.uk/webservice/yodatalk.php?wsdl';

// main
var app = express();
// get the cat fact itself
var restclient = new Rest();
restclient.registerMethod("jsonMethod", catsapi, "GET");
restclient.methods.jsonMethod(function (request, response) {
  // check api call
  console.log("DEBUG: made REST call on: " + catsapi);
  var catfact = JSON.parse(request);
  // check object for a single cat fact
  console.log("DEBUG: " + catfact.facts);
});
// translate the fact to yoda speak
var args = {inputText: "Cats have 9 lives."};
console.log("DEBUG: args are " + args);
Soap.createClient(yodaapi, function (error, client) {
  client.yodaTalkRequest(args, function (err, result) {
    console.log("DEBUG: " + result);
  });
});



// start daemon process
//require('daemon');
//console.log("Daemon started with PID: " + process.pid);
