## Yoda's Cat Facts written in NodeJs

### Description

Simple application that reads cat facts from a public API over http using REST and JSON that then passes a captured fact to a public API over http and SOAP that translate the test into something that Yoda from Star Wars would say.

### Usage

Run me as `nodejs ycf.js`

### Verified versions

Node version v0.10.15 on Ubuntu 13.10 x86_64
Node version v0.10.24 on Rasbian Wheezy arm Raspberry Pi

### Data Sources

Cat facts: http://catfacts-api.appspot.com/api/facts
Yoda translation: http://www.yodaspeak.co.uk/webservice/yodatalk.php?wsdl

### Utilities

`soaptest.js` through testing I saw that the SOAP client module performed abnormally with different Node versions, OS versions, etc. so running this utility will help narrow down any problems if there are problems.
