var express = require('express')
    path = require('path');

var app = module.exports = express(),
    moduleName = path.basename(module.id, ".js");

var bodyParser = require('body-parser');
app.use(bodyParser.text());

function isValidUrl(string) {
    const pattern = new RegExp(
        /*'^([a-zA-Z]+:\\/\\/)?' + // Protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // Domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // Or IP (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string
        '(\\#[-a-z\\d_]*)?$', // Fragment locator*/
        //'^(ht|f)tp(s?)\\:\\/\\/[0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*(:(0-9)*)*(\\/?)([a-zA-Z0-9\\-\\.\\?\\, \’\\/\\\\\\+&%\\$#_]*)?$',
        '(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?',
    'i'
   ); 
   return pattern.test(string);
}

app.post('/picture', function(req, res){
   
   var userInput = req.body;
   const allowList = ["www.google.com", "http://localhost:8000", "www.facebook.com"];

   if (isValidUrl(userInput) == true ){//|| allowList.includes(userInput)){
    var nextLevelUri = module.parent.exports.getNextLevel(moduleName).uri;
    var levelIndex = module.parent.exports.namedIndex[moduleName].index;
    var response = 
        module.parent.exports.generateResponse(levelIndex,
            {
                message: "Congratulations, you have made it to the next level!"
            },
            {
                next: nextLevelUri
            },
            [
                "OWASP API Security API7:2023 - Server Side Request Forgery",
                    "Do you include two layers of validation",
                    "if not do that."
            ]);
    res.status(202).send(response);
   } else {
    res.status(401).send("The url is not authenticate and is likely an attack");
   }
});
