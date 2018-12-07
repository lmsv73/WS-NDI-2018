var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017';

router.get('/temp', temp);
router.post('/temp/webhook', tempwebhook);
router.get('/temp/:nb', temp);

router.get('/wind', wind);
router.get('/wind/:nb', wind);

router.get('/pressure', pressure);
router.get('/pressure/:nb', pressure);

router.get('/humidity', humidity);
router.get('/humidity/:nb', humidity);

router.get('/luminosity', luminosity);
router.get('/luminosity/:nb', luminosity);

router.get('/altitude', altitude);
router.get('/altitude/:nb', altitude);

function temp(req, res, next){
    MongoClient.connect(url, (err, client) => {
        let db = client.db('night_2018');
        db.collection('temp').find({}).sort({date: -1}).limit(req.params.nb ? parseInt(req.params.nb, 10) : 1).toArray((err, result) => {
            client.close();
            res.json(result);
        });
    })
}

function tempwebhook(req, res, next){
    MongoClient.connect(url, (err, client) => {
        let db = client.db('night_2018');
        db.collection('temp').find({}).sort({date: -1}).limit(1).toArray((err, result) => {
            client.close();
            res.json({
                "fulfillmentText": ""+(result[0].temp-273.15)
            });
        });
    })
}

function wind(req, res, next){
    MongoClient.connect(url, (err, client) => {
        let db = client.db('night_2018');
        db.collection('wind').find({}).sort({date: -1}).limit(req.params.nb ? parseInt(req.params.nb, 10) : 1).toArray((err, result) => {
            client.close();
            res.json(result);
        });
    })
}

function pressure(req, res, next){
    MongoClient.connect(url, (err, client) => {
        let db = client.db('night_2018');
        db.collection('pressure').find({}).sort({date: -1}).limit(req.params.nb ? parseInt(req.params.nb, 10) : 1).toArray((err, result) => {
            client.close();
            res.json(result);
        });
    })
}

function humidity(req, res, next){
    MongoClient.connect(url, (err, client) => {
        let db = client.db('night_2018');
        db.collection('humidity').find({}).sort({date: -1}).limit(req.params.nb ? parseInt(req.params.nb, 10) : 1).toArray((err, result) => {
            client.close();
            res.json(result);
        });
    })
}

function luminosity(req, res, next){
    MongoClient.connect(url, (err, client) => {
        let db = client.db('night_2018');
        db.collection('luminosity').find({}).sort({date: -1}).limit(req.params.nb ? parseInt(req.params.nb, 10) : 1).toArray((err, result) => {
            client.close();
            res.json(result);
        });
    })
}

function altitude(req, res, next){
    MongoClient.connect(url, (err, client) => {
        let db = client.db('night_2018');
        db.collection('altitude').find({}).sort({date: -1}).limit(req.params.nb ? parseInt(req.params.nb, 10) : 1).toArray((err, result) => {
            client.close();
            res.json(result);
        });
    })
}

module.exports = router;
