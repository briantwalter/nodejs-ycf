//
// ycfcli.js
//

// variables
var rest = require('node-rest-client').Client;
var soap = require('soap');
var catsapi = 'http://catfacts-api.appspot.com/api/facts';
var yodaapi = 'http://www.yodaspeak.co.uk/webservice/yodatalk.php?wsdl';

// main
// get the cat fact itself
var restclient = new rest();
restclient.registerMethod("jsonMethod", catsapi, "GET");
restclient.methods.jsonMethod(function (request, response) {
  var catfact = JSON.parse(request);
  // construct soap payload
  var args = {inputText: catfact.facts};
  // create soap client for yoda translation
  soap.createClient(yodaapi, function(err, client) {
    if (err) {
      //console.log("DEBUG: there was a problem with the soap url");
      console.log("FATAL");
      process.exit(code=11);
    };
    client.yodaTalk(args, function(err, result) {
      if (err) {
        console.log("FATAL");
        process.exit(code=12);
      };
      console.log(result.return);
    });
  });
});
