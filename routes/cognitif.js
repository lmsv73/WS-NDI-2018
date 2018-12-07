var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017';

router.post('/', function(req, res, next){
    let note=(req.body.nbTouch-req.body.nbEchec)*5/req.body.duration;
    console.log(req.body);
    note=Math.min(20,note);
    note=Math.max(0,note);
    let insert = {
        date: req.body.timestamp,
        nbTouch: req.body.nbTouch,
        nbEchec: req.body.nbEchec,
        duration: req.body.duration,
        note: note
    }
    MongoClient.connect(url, (err, client) => {
        let db = client.db('night_2018');
        db.collection('cognitif').insertOne(insert).then(() => {
            res.send(note.toFixed(2));
        })
    });

})

module.exports = router;
