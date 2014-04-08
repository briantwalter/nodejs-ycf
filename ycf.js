//
// ycf.js  	Yoda's Cat Facts
// version	0.0.1 
// author	Brian Walter @briantwalter
// description	Display a simple, dynamic webpage with facts about
//		cats translated via API to Yoda speak.
//
// Special thanks to Barry Johnson for the help on callbacks
// http://stackoverflow.com/questions/22898894/simple-flow-control-in-nodejs
//

// variables
var os = require("os");
var express = require('express');
var rest = require('node-rest-client').Client;
var soap = require('soap');
var port = '8800';
var catsapi = 'http://catfacts-api.appspot.com/api/facts';
var yodaapi = 'http://www.yodaspeak.co.uk/webservice/yodatalk.php?wsdl';
var title = "Yoda's Cat Facts";
var catfact = "BLANK";
var myipaddr = "BLANK";

// start daemon process
require('daemon');
console.log("Daemon started with PID: " + process.pid);

// functions
// get catfact less than 140 chars
function getcatfact(callback) {
  var catfact = "";
  var restclient = new rest();
  restclient.registerMethod("jsonMethod", catsapi, "GET");
  restclient.methods.jsonMethod(function (request, response) {
    var catfact = JSON.parse(request);
    var reallength = new String(catfact.facts);
    if ( reallength.length > 140 )
      callback("This display was created by @briantwalter. Follow @YodasCatFacts on Twitter for updates.")
    else {
      callback(catfact.facts);
    }
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

// get local machine's IPv4 addresses
function getipaddr() {
  var interfaces = os.networkInterfaces();
  var addresses = [];
  for (i in interfaces) {
      for (i2 in interfaces[i]) {
          var address = interfaces[i][i2];
          if (address.family == 'IPv4' && !address.internal) {
              addresses.push(address.address)
          }
      }
  }
  //console.log("DEBUG: IPv4 addrs are " + addresses);
  return addresses;
}

// main
var app = express();
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(app.router);
app.use(express.logger('dev'))
app.use(express.static(__dirname + '/html'))
app.use(express.errorHandler());

// create and display the page if requested
app.get('/', function(req, res) {
  var myipaddr = getipaddr();
  getcatfact(function(catfact) {
    yodaspeak(catfact, function(yodacatfact) {
      res.render('index',
        { title: title, catfact: yodacatfact, myipaddr: myipaddr }
      )
    });
  });
})

// start the http server
app.listen(port)
