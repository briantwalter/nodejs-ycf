//
// ycf.js  	Yoda's Cat Facts
// version	0.0.3 
// author	Brian Walter @briantwalter
// description	Display a simple, dynamic webpage with facts about
//		cats translated via API to Yoda speak.
//
// Special thanks to Barry Johnson for the help on callbacks
// http://stackoverflow.com/questions/22898894/simple-flow-control-in-nodejs
//

// variables
var express = require('express');
var rest = require('node-rest-client').Client;
var soap = require('soap');
var port = '8800';
var catsapi = 'http://catfacts-api.appspot.com/api/facts';
var yodaapi = 'http://www.yodaspeak.co.uk/webservice/yodatalk.php?wsdl';
var title = "Yoda's Cat Facts";
var catfact = "BLANK";
var badwords = "masturbate";

// functions
// get catfact less than 140 chars
function getcatfact(callback) {
  var catfact = "";
  var restclient = new rest();
  restclient.registerMethod("jsonMethod", catsapi, "GET");
  restclient.methods.jsonMethod(function(request, response) {
    var catfact = JSON.parse(request);
    var reallength = new String(catfact.facts);
    if ( reallength.length > 140 || reallength.match(/badwords/i) )
      callback("This display was created by @briantwalter. Follow @YodasCatFacts on Twitter for updates.")
    else {
      callback(catfact.facts);
    }
  })
  restclient.on('error', function(err) {
    console.error("DEBUG: error in the REST client", err);
  })
}

// translate passed in text
function yodaspeak(english, callback) {
  var args = {inputText: english};
  soap.createClient(yodaapi, function(err, client) {
    if (err) {
     //console.log("DEBUG: there was a problem with the soap url");
     callback(err);
    };
    client.yodaTalk(args, function(err, result) {
      if (err) {
        callback(err);
      }
      else {
      callback(result.return);
      };
    })
  })
}

// main
var app = express();
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(app.router);
app.use(express.logger('dev'))
app.use(express.static(__dirname + '/public'))
app.use(express.errorHandler());

// redirect to API document if root is requested
app.get('/', function(req, res) {
  res.redirect('apidoc.html');
})

// create and display JSON if api is requested
app.get('/api', function(req, res) {
  getcatfact(function(catfact) {
    yodaspeak(catfact, function(yodacatfact) {
      res.json({ title: title, catfact: yodacatfact })
    });
  });
})

// start the http server on CF or locally
app.listen(process.env.VCAP_APP_PORT || port);
