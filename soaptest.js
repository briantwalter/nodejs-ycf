//
// soaptest.js
//

// variables
var soap = require('soap');
var url = 'http://www.yodaspeak.co.uk/webservice/yodatalk.php?wsdl';
var args = {inputText: 'Cats have 9 lives.'};

// main
soap.createClient(url, function(err, client) {
  if (err) {
   console.log("DEBUG: there was a problem with the url");
  };
  client.yodaTalk(args, function(err, result) {
    console.log("DEBUG: " + result.return);
  });
});
