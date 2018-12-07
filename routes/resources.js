var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'night_2018';

router.get('/', allResources);
router.post('/modify', modify);

var date = Date.now();
// INSERER UN DOCUMENT DANS LA BDD (TEST)
function modify(req, res, next) {
    MongoClient.connect(url, function(err, client) {
        console.log("Connected successfully to server");
        var db = client.db(dbName);
        var collection = db.collection('resources');
        // Insert some documents
        collection.updateOne(
            {name: req.body.name},
            {$set: {number: req.body.number}},
            function(err, doc) {
                client.close();
            });
    });
    res.send("Done");
}

function allResources(req, res, next) {
    MongoClient.connect(url, function(err, client) {
        console.log("Connected successfully to server");
        var db = client.db(dbName);
        var collection = db.collection('resources');
        collection.find({}).toArray(function(err, doc) {
            client.close();
            res.json(doc);
        });
        
    });
}


module.exports = router;