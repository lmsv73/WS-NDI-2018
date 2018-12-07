var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'night_2018';

// Use connect method to connect to the server
// MongoClient.connect(url, function(err, client) {
//   console.log("Connected successfully to server");
//   var db = client.db(dbName);
//     insertDocuments(db, function() {
//         client.close();
//     });
// });

var date = Date.now();
// INSERER UN DOCUMENT DANS LA BDD (TEST)
var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('logbook');
    // Insert some documents
    collection.insert({
        title:'Insertion',
        description: 'Une insertion',
        user: 'Antoine',
        date: date,
    });
};

router.get('/store', insertDoc);
router.get('/:nb', getAll);
router.get('/', getAll);


function getAll(req, res, next) {
    MongoClient.connect(url, function(err, client) {
        console.log("Connected successfully to server");
        var db = client.db(dbName);
        var collection = db.collection('logbook');
        collection.find({}).sort({date: -1}).limit(req.params.nb ? parseInt(req.params.nb, 10) : 1).toArray(function(err, doc) {
            client.close();
            res.json(doc);
        });
        
    });
}

function insertDoc(req, res, next) {
    MongoClient.connect(url, function(err, client) {
        console.log("Connected successfully to server");
        var db = client.db(dbName);
        insertDocuments(db, function() {
            client.close();
        });
    });
    res.send("hello world");
}

module.exports = router;