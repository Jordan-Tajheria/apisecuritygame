var express = require('express')
    path = require('path');

var app = module.exports = express(),
    moduleName = path.basename(module.id, ".js");

var bodyParser = require('body-parser');
app.use(bodyParser.text());

let maxAmount =  5;

app.post('/trainers/orders', function(req, res){
    let userInput = parseInt(req.body);

   if (userInput > maxAmount )
   {
    res.status(404).send("Order amount is too big. Please select smaller amount of products.")
   } else if (userInput <= maxAmount) 
   {
    res.status(401).send("Your order has been placed. Expect delivery within next 2-3 business days.");
   }
});

app.post('/trainers/orders/amount', function(req, res){
    
    let userInput = parseInt(req.body);
    
    let maxAmount = userInput;

    var nextLevelUri = module.parent.exports.getNextLevel(moduleName).uri;
    var levelIndex = module.parent.exports.namedIndex[moduleName].index;
    var response = 
        module.parent.exports.generateResponse(levelIndex,
            {
                message: "Order for " + maxAmount + "Trainers confirmed. Expect delivery within next 2-3 business days. Congratulations, you have made it to the next level!"
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
});