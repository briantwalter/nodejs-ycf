//
// ycf.js
//

// variables
var express = require('express');
var rest = require('node-rest-client').Client;
var soap = require('soap');
var port = '8800';
var catsapi = 'http://catfacts-api.appspot.com/api/facts';
var yodaapi = 'http://www.yodaspeak.co.uk/webservice/yodatalk.php?wsdl';

// main
var app = express();

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(app.router);
app.use(express.logger('dev'))
app.use(express.static(__dirname + '/html'))
app.use(express.errorHandler());

// create and display the page
app.get('/', function(req, res) {
  res.render('index',
  { title: "my title" }
//  { title: "my title" },
//  { catfact: "my cat fact" }
//  { myipaddr: "10.0.1.1" }
  )
})

// start the http server
app.listen(port)

// get the cat fact itself
//var restclient = new rest();
//restclient.registerMethod("jsonMethod", catsapi, "GET");
//restclient.methods.jsonMethod(function (request, response) {
  // check cats api call
//  console.log("DEBUG: made REST call on: " + catsapi);
 // var catfact = JSON.parse(request);
  // check object for a single cat fact
//  console.log("DEBUG: CATS: " + catfact.facts);
  // construct soap payload
//  var args = {inputText: catfact.facts};
//  console.log("DEBUG: made SOAP call on: " + yodaapi);
  // create soap client for yoda translation
//  soap.createClient(yodaapi, function(err, client) {
//    if (err) {
//     console.log("DEBUG: there was a problem with the soap url");
//    };
//    client.yodaTalk(args, function(err, result) {
//      console.log("DEBUG: YODA: " + result.return);
//    });
//  });
//});



// start daemon process
//require('daemon');
//console.log("Daemon started with PID: " + process.pid);
