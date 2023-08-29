var express = require('express')
    path = require('path');

var app = module.exports = express(),
    moduleName = path.basename(module.id, ".js");

var bodyParser = require('body-parser');
app.use(bodyParser.text());

const file = '../apisecuritygame/docs/allowlist.txt';

function isValidUrl(string) {
    const pattern = new RegExp(
        '^([a-zA-Z]+:\\/\\/)?' + // Protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // Domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // Or IP (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string
        '(\\#[-a-z\\d_]*)?$', // Fragment locator
    'i'
   ); 
   return pattern.test(string);
}

function writeTextFile(string) {
    // Use file system module, access file system read write to file.
    const fs = require('fs');

    fs.appendFile(file, ", "+string, err => {
        if(err){
            console.error(err);
            return;
        }
    });
}

function checkIfContainsString(filename, str) {
    const fs = require('fs');

    const contents = fs.readFileSync(filename, 'utf-8');
    const result = contents.includes(str);
    
    return result;
}

app.post('/edit', function(req, res){

    var userInput = req.body;
    writeTextFile(userInput);
    var response = "File successfully updated"
    res.status(202).send(response);
});


app.post('/', function(req, res){
   
   var userInput = req.body;
  
   if (isValidUrl(userInput) == true || checkIfContainsString(file, userInput) == true){
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
                    "An unvalidated url can be used to exploit a system",
                    "Whenever possible use two layers of authentication and make both of them mandatory.",
                "OWASP API Security API8:2023 - Security Misconfiguration",
                    "Attackers will often attempt to find unprotected files and directories to gain unauthroised access",
                    "Avoid exposing private resources through a public API"
            ]);
    res.status(202).send(response);
   } else {
    res.status(401).send("The url is not authenticate and is likely an attack");
   }
});
