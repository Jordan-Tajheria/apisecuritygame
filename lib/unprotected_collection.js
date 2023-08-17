var express = require('express')
    path    = require('path');

var app        = module.exports = express(),
    moduleName = path.basename(module.id, ".js");
 
 
app.get('/students/:studentId', function( req, res ) {
    var studentId = req.params.studentId;    

    if( studentId === '778820' ) {
        var response = 
            module.parent.exports.generateResponse(null,
            {            
                student_record: {
                    id: 778820,
                    name: "Wally Walliston",
                    date_of_birth: "1976-11-30",
                    notes: "Wally is a great student."            
                }                
            });    
        res.send(response);
    } else {
        res.status(403).send('You are not authorized to retrieve this resource.');
    }
});

app.get('/students', function( req, res ) {
    
    var nextLevelUri = module.parent.exports.getNextLevel(moduleName).uri;
    var levelIndex = module.parent.exports.namedIndex[moduleName].index;
    
    var response = 
        module.parent.exports.generateResponse(levelIndex,
        {        
            student_records: [{
                id: 778820,
                name: "Wally Walliston",
                date_of_birth: "11-30-1976",
                notes: "Wally is a great student."            
            },
            {
                id: 778201,
                name: "Ben Cleaver",
                date_of_birth: "02-15-2001",
                notes: ""            
            },
            {
                id: 778441,
                name: "Jay Grimes",
                date_of_birth: "12-22-1979",
                notes: "Congratulations!  Go to " + nextLevelUri + " for the next API"            
            }]                
        },
        [], //links
        [
            "OWASP API Security API8:2023 - Security Misconfiguration",
            "OWASP API Security API5:2023 - Broken Function Level Authorisation",
                "Attackers will often attempt to find common endpoints",
                "Access control systems must be applied universally",
                "RESTFul style APIs encourage hunting for new entry points",
                "Unfiltered collections are a common path to missing a required security.",
            "OWASP API Security API3:2023 - Broken Object Property Level Authorisation",
                "Does your API endpoint expse properties of an object considered sensitive?",
                "Keep data returned data structures to the bare minimum." 
        ]
        );
    res.send(response);
});